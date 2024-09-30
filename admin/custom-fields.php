<?php

function svp_add_meta_boxes()
{
    add_meta_box('svp_video_details', 'Video Details', 'svp_video_details_callback', 'shoppable_video', 'normal', 'high');
}

add_action('add_meta_boxes', 'svp_add_meta_boxes');

function svp_video_details_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'svp_nonce');

    // Fetch existing meta values
    $views = get_post_meta($post->ID, '_svp_views', true);
    $clicks = get_post_meta($post->ID, '_svp_clicks', true);
    $purchases = get_post_meta($post->ID, '_svp_purchases', true);
    $videos = get_post_meta($post->ID, '_svp_uploaded_videos', true);
    $cta_type = get_post_meta($post->ID, '_svp_cta_type', true);
    $button_text = get_post_meta($post->ID, '_svp_button_text', true);
    $button_link = get_post_meta($post->ID, '_svp_button_link', true);
    $selected_product = get_post_meta($post->ID, '_svp_woocommerce_product', true);

    echo '<div class="svp-meta-box-container">'; // Start of custom class wrapper

    // CTA Type field
    echo '<p class="svp-field"><label for="svp_cta_type">CTA Type:</label>';
    echo '<input type="checkbox" id="svp_cta_type" name="svp_cta_type" value="yes" ' . checked($cta_type, 'yes', false) . ' />';
    echo ' Use WooCommerce Product</p>';

    // Button Text and Button Link fields (shown if CTA Type is "no")
    echo '<div id="cta-button-fields" class="svp-field" ' . ($cta_type === 'yes' ? 'style="display:none;"' : '') . '>';
    echo '<p><label for="svp_button_text">Button Text:</label>';
    echo '<input type="text" id="svp_button_text" name="svp_button_text" value="' . esc_attr($button_text) . '" size="25" /></p>';

    echo '<p><label for="svp_button_link">Button Link:</label>';
    echo '<input type="url" id="svp_button_link" name="svp_button_link" value="' . esc_attr($button_link) . '" size="25" /></p>';
    echo '</div>';

    // WooCommerce Product dropdown (shown if CTA Type is "yes")
    if (class_exists('WooCommerce')) {
        $products = wc_get_products(array('limit' => -1));
        echo '<div id="cta-product-field" class="svp-field" ' . ($cta_type !== 'yes' ? 'style="display:none;"' : '') . '>';
        echo '<p><label for="svp_woocommerce_product">Select Product:</label>';
        echo '<select id="svp_woocommerce_product" name="svp_woocommerce_product">';
        foreach ($products as $product) {
            $product_url = get_permalink($product->get_id());
            echo '<option value="' . esc_url($product_url) . '" ' . selected($selected_product, esc_url($product_url), false) . '>' . esc_html($product->get_name()) . '</option>';
        }
        echo '</select></p>';
        echo '</div>';
    }

    // Video upload field
    echo '<p class="svp-field"><label for="svp_uploaded_videos">Upload Videos:</label>';
    echo '<input type="button" class="button" id="svp_upload_button" value="Upload Video" />';
    echo '<ul id="svp_uploaded_videos">';
    if (!empty($videos)) {
        foreach ((array)$videos as $video) {
            echo '<li><input type="hidden" name="svp_uploaded_videos[]" value="' . esc_url($video) . '">';
            echo '<video src="' . esc_url($video) . '" width="200" controls></video>';
            echo '<button class="remove-video button">Remove</button></li>';
        }
    }
    echo '</ul>';
    echo '</p>';

    // Display views, clicks, purchases fields
    echo '<p class="svp-field"><label for="svp_views">Views:</label>';
    echo '<input type="number" id="svp_views" name="svp_views" value="' . esc_attr($views) . '" size="10" readonly/></p>';

    echo '<p class="svp-field"><label for="svp_clicks">Clicks:</label>';
    echo '<input type="number" id="svp_clicks" name="svp_clicks" value="' . esc_attr($clicks) . '" size="10" readonly /></p>';

    echo '<p class="svp-field"><label for="svp_purchases">Purchases:</label>';
    echo '<input type="number" id="svp_purchases" name="svp_purchases" value="' . esc_attr($purchases) . '" size="10" readonly /></p>';

    echo '</div>'; // End of custom class wrapper
}

function svp_save_meta_boxes($post_id)
{
    // Verify nonce
    if (!isset($_POST['svp_nonce']) || !wp_verify_nonce($_POST['svp_nonce'], basename(__FILE__))) {
        return;
    }

    // Check for autosave and permissions
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    // Save views, clicks, purchases
    if (isset($_POST['svp_views'])) {
        update_post_meta($post_id, '_svp_views', sanitize_text_field($_POST['svp_views']));
    }

    if (isset($_POST['svp_clicks'])) {
        update_post_meta($post_id, '_svp_clicks', sanitize_text_field($_POST['svp_clicks']));
    }

    if (isset($_POST['svp_purchases'])) {
        update_post_meta($post_id, '_svp_purchases', sanitize_text_field($_POST['svp_purchases']));
    }

    // Save CTA Type
    $cta_type = isset($_POST['svp_cta_type']) ? 'yes' : 'no';
    update_post_meta($post_id, '_svp_cta_type', $cta_type);

    // Save Button Text and Button Link if CTA Type is "no"
    if ($cta_type === 'no') {
        update_post_meta($post_id, '_svp_button_text', sanitize_text_field($_POST['svp_button_text']));
        update_post_meta($post_id, '_svp_button_link', esc_url_raw($_POST['svp_button_link']));
        delete_post_meta($post_id, '_svp_woocommerce_product'); // Remove product if button is used
    } else {
        // Save WooCommerce product URL if CTA Type is "yes"
        if (isset($_POST['svp_woocommerce_product'])) {
            update_post_meta($post_id, '_svp_woocommerce_product', esc_url_raw($_POST['svp_woocommerce_product']));
            delete_post_meta($post_id, '_svp_button_text');
            delete_post_meta($post_id, '_svp_button_link');
        }
    }

    // Save the uploaded videos
    if (isset($_POST['svp_uploaded_videos'])) {
        $videos = array_map('esc_url_raw', $_POST['svp_uploaded_videos']);
        update_post_meta($post_id, '_svp_uploaded_videos', $videos);
    } else {
        delete_post_meta($post_id, '_svp_uploaded_videos');
    }
}

add_action('save_post', 'svp_save_meta_boxes');

// Add CSS for custom fields
function svp_admin_styles()
{
    echo '
    <style>
        .svp-meta-box-container {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #ddd;
        }
        .svp-meta-box-container p {
            margin-bottom: 15px;
        }
        .svp-meta-box-container label {
            font-weight: bold;
            display: inline-block;
            width: 150px;
        }
        .svp-meta-box-container input[type="text"],
        .svp-meta-box-container input[type="url"],
        .svp-meta-box-container input[type="number"],
        .svp-meta-box-container select {
            width: 250px;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .svp-meta-box-container input[type="checkbox"] {
            margin-right: 10px;
        }
        .svp-meta-box-container video {
            margin-top: 10px;
            border: 2px solid #ddd;
            border-radius: 4px;
        }
        .svp-meta-box-container .button {
            background-color: #0073aa;
            color: #fff;
            border-color: #0073aa;
            box-shadow: none;
            text-decoration: none;
        }
        .svp-meta-box-container .button:hover {
            background-color: #005177;
        }
        .svp-meta-box-container ul {
            list-style: none;
            padding-left: 0;
        }
        .svp-meta-box-container ul li {
            margin-bottom: 10px;
        }
        .svp-meta-box-container .remove-video {
            background-color: #ff5c5c;
            border-color: #ff5c5c;
            color: #fff;
            margin-top: 10px;
            display: inline-block;
        }
        .svp-meta-box-container .remove-video:hover {
            background-color: #cc4a4a;
        }
    </style>
    ';
}

add_action('admin_head', 'svp_admin_styles');

function svp_admin_scripts()
{
    ?>
    <script type="text/javascript">
        jQuery(document).ready(function ($) {
            var mediaUploader;

            $('#svp_upload_button').click(function (e) {
                e.preventDefault();
                if (mediaUploader) {
                    mediaUploader.open();
                    return;
                }

                mediaUploader = wp.media({
                    title: 'Choose Video',
                    button: {
                        text: 'Upload Video'
                    },
                    multiple: true,
                    library: {type: 'video'}
                });

                mediaUploader.on('select', function () {
                    var attachments = mediaUploader.state().get('selection').toJSON();
                    attachments.forEach(function (attachment) {
                        $('#svp_uploaded_videos').append(
                            '<li><input type="hidden" name="svp_uploaded_videos[]" value="' + attachment.url + '">' +
                            '<video src="' + attachment.url + '" width="200" controls></video>' +
                            '<button class="remove-video button">Remove</button></li>'
                        );
                    });
                });
                mediaUploader.open();
            });
            $('#svp_uploaded_videos').on('click', '.remove-video', function (e) {
                e.preventDefault();
                $(this).closest('li').remove();
            });

            $('#svp_cta_type').on('change', function () {
                if ($(this).is(':checked')) {
                    $('#cta-button-fields').hide();
                    $('#cta-product-field').show();
                } else {
                    $('#cta-button-fields').show();
                    $('#cta-product-field').hide();
                }
            }).trigger('change');
        });
    </script>
    <?php
}

add_action('admin_footer', 'svp_admin_scripts');
