<?php

function svp_add_meta_boxes()
{
    add_meta_box('svp_video_details', 'Video Section', 'svp_video_details_callback', 'shoppable_video', 'normal', 'high');
    add_meta_box('svp_cta_details', 'CTA Section', 'svp_cta_details_callback', 'shoppable_video', 'normal', 'high');
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
    $ctas = get_post_meta($post->ID, '_svp_ctas', true);

    echo '<div class="svp-meta-box-container">'; // Start of custom class wrapper
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

function svp_cta_details_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'svp_cta_nonce');
    $ctas = get_post_meta($post->ID, '_svp_ctas', true);

    echo '<div class="svp-meta-box-container">';
    echo '<ul id="svp_cta_list">';
    if (!empty($ctas)) {
        foreach ($ctas as $index => $cta) {
            echo '<li>';
            echo '<select name="svp_ctas[' . $index . '][icon]" class="cta-icon-select">';
            echo '<option value="">Select Icon</option>';
            echo '<option value="fa-heart" ' . selected($cta['icon'], 'fa-heart', false) . '>Like</option>';
            echo '<option value="fa-whatsapp" ' . selected($cta['icon'], 'fa-whatsapp', false) . '>Whatsapp</option>';
            echo '<option value="fa-facebook" ' . selected($cta['icon'], 'fa-facebook', false) . '>Facebook</option>';
            echo '<option value="fa-twitter" ' . selected($cta['icon'], 'fa-twitter', false) . '>Twitter</option>';
            echo '<option value="fa-instagram" ' . selected($cta['icon'], 'fa-instagram', false) . '>Instagram</option>';
            echo '<option value="fa-link" ' . selected($cta['icon'], 'fa-link', false) . '>Link</option>';
            echo '</select>';
            echo '<select name="svp_ctas[' . $index . '][position]" class="cta-icon-select">';
            echo '<option value="">Select Position</option>';
            echo '<option value="cta--left" ' . selected($cta['position'], 'cta--left', false) . '>Left</option>';
            echo '<option value="cta--right" ' . selected($cta['position'], 'cta--right', false) . '>Right</option>';
            echo '<option value="cta--bottom" ' . selected($cta['position'], 'cta--bottom', false) . '>Bottom</option>';
            echo '</select>';
            echo '<input type="url" name="svp_ctas[' . $index . '][url]" placeholder="URL" value="' . esc_url($cta['url']) . '" />';
            echo '<p><label><input type="checkbox" name="svp_ctas[' . $index . '][new_tab]" ' . checked($cta['new_tab'], 'on', false) . ' /> Open in New Tab</label></p>';
            echo '<button class="remove-cta button">Remove</button>';
            echo '</li>';
        }
    }
    echo '</ul>';
    echo '<button type="button" id="add_cta_button" class="button">Add CTA</button>';
    echo '</div>';
}


function svp_save_meta_boxes($post_id)
{
    // Verify nonce
    if (!isset($_POST['svp_nonce']) || !wp_verify_nonce($_POST['svp_nonce'], basename(__FILE__))) {
        return;
    }
    // Verify nonce for CTA details
    if (!isset($_POST['svp_cta_nonce']) || !wp_verify_nonce($_POST['svp_cta_nonce'], basename(__FILE__))) {
        return;
    }
    // Check for autosave and permissions
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    // Save the CTAs
    if (isset($_POST['svp_ctas'])) {
        $ctas = array_map(function ($cta) {
            return [
                'icon' => sanitize_text_field($cta['icon']),
                'url' => esc_url_raw($cta['url']),
                'position' => sanitize_text_field($cta['position']),
                'new_tab' => isset($cta['new_tab']) ? 'on' : 'off',
            ];
        }, $_POST['svp_ctas']);
        update_post_meta($post_id, '_svp_ctas', $ctas);
    } else {
        delete_post_meta($post_id, '_svp_ctas');
    }

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
        .svp-meta-box-container ul li input {
            margin-right: 10px;
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
        .svp-meta-box-container input[type="checkbox"] {
    margin-right: 5px;
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
            var ctaIconOptions = [
                {class: 'fa-heart', label: 'Like'},
                {class: 'fa-whatsapp', label: 'Whatsapp'},
                {class: 'fa-facebook', label: 'Facebook'},
                {class: 'fa-twitter', label: 'Twitter'},
                {class: 'fa-instagram', label: 'Instagram'},
                {class: 'fa-link', label: 'Link'},
            ];
            var ctaPositionOptions = [
                {class: 'cta--left', label: 'Left'},
                {class: 'cta--right', label: 'Right'},
                {class: 'cta--bottom', label: 'Bottom'},
            ];

            function updateIconPreview(selectElement) {
                var selectedClass = $(selectElement).val();
                var iconPreview = $(selectElement).siblings('.cta-icon-preview');

                if (selectedClass) {
                    iconPreview.attr('class', 'cta-icon-preview fa ' + selectedClass);
                } else {
                    iconPreview.attr('class', 'cta-icon-preview');
                }
            }

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

            // Add CTA logic
            $('#add_cta_button').on('click', function () {
                var ctaCount = $('#svp_cta_list li').length;
                var newCtaHtml = '<li>' +
                    '<select name="svp_ctas[' + ctaCount + '][icon]" class="cta-icon-select">' +
                    '<option value="">Select Icon</option>';

                ctaIconOptions.forEach(function (option) {
                    newCtaHtml += '<option value="' + option.class + '">' + option.label + '</option>';
                });

                newCtaHtml += '</select>' +
                    '<span class="cta-icon-preview"></span>';
                newCtaHtml += '<select name="svp_ctas[' + ctaCount + '][position]" class="cta-icon-select">' +
                    '<option value="">Select Position</option>';

                ctaPositionOptions.forEach(function (option) {
                    newCtaHtml += '<option value="' + option.class + '">' + option.label + '</option>';
                });

                newCtaHtml += '</select>' +
                    '<input type="url" name="svp_ctas[' + ctaCount + '][url]" placeholder="URL" />'+
                    '<p><label><input type="checkbox" name="svp_ctas[' + ctaCount + '][new_tab]" /> Open in New Tab</label></p>' +
                    '<button class="remove-cta button">Remove</button>' +
                    '</li>';

                $('#svp_cta_list').append(newCtaHtml);
            });
            // Remove CTA
            $('#svp_cta_list').on('click', '.remove-cta', function (e) {
                e.preventDefault();
                $(this).closest('li').remove();
            });

            // Update icon preview on change
            $('#svp_cta_list').on('change', '.cta-icon-select', function () {
                updateIconPreview(this);
            });

            // Initial update for existing icons
            $('.cta-icon-select').each(function () {
                updateIconPreview(this);
            });


        });
    </script>
    <?php
}

add_action('admin_footer', 'svp_admin_scripts');
