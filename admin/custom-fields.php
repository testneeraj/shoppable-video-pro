<?php

function svp_enqueue_color_picker($hook_suffix)
{
    wp_enqueue_style('wp-color-picker');
    wp_enqueue_script('svp-color-picker-script', plugin_dir_url(__FILE__) . 'svp-color-picker-script.js', array('wp-color-picker'), false, true);
}

add_action('admin_enqueue_scripts', 'svp_enqueue_color_picker');
function svp_add_meta_boxes()
{
    add_meta_box('svp_video_details', 'Video Section', 'svp_video_details_callback', 'shoppable_video', 'normal', 'high');
    add_meta_box('svp_cta_details', 'CTA', 'svp_cta_details_callback', 'shoppable_video', 'normal', 'high');
    add_meta_box('svp_statistics_details', 'Statistics', 'svp_statistics_details_callback', 'shoppable_video', 'normal', 'high');
    add_meta_box('svp_general_settings', 'General Settings', 'svp_general_settings_callback', 'shoppable_video', 'normal', 'high');
}

add_action('add_meta_boxes', 'svp_add_meta_boxes');

function svp_video_details_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'svp_nonce');
    $videos = get_post_meta($post->ID, '_svp_uploaded_videos', true);

    echo '<div class="svp-meta-box-container">';
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
    echo '</div>';
}


function svp_general_settings_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'svp_nonce');

    // Fetch existing meta values
    $mute = get_post_meta($post->ID, '_svp_mute', true);
    $share = get_post_meta($post->ID, '_svp_share', true);
    $navigation = get_post_meta($post->ID, '_svp_navigation', true);
    $play_pause = get_post_meta($post->ID, '_svp_play_pause', true);
    $color = get_post_meta($post->ID, '_svp_color', true);
    $background_color = get_post_meta($post->ID, '_svp_background_color', true);
    $hover_color = get_post_meta($post->ID, '_svp_hover_color', true);

    echo '<div class="svp-meta-box-container">';

    // Mute button switch
    echo '<p class="svp-field"><label for="svp_mute">Mute Button:</label>';
    echo '<label class="switch"><input type="checkbox" id="svp_mute" name="svp_mute" value="' . $mute . '" ' . checked($mute, "on", false) . '>';
    echo '<span class="slider round"></span></label></p>';

    // Share button switch
    echo '<p class="svp-field"><label for="svp_share">Share Button:</label>';
    echo '<label class="switch"><input type="checkbox" id="svp_share" name="svp_share" value="' . $share . '" ' . checked($share, "on", false) . '>';
    echo '<span class="slider round"></span></label></p>';

    // Navigation button switch
    echo '<p class="svp-field"><label for="svp_navigation">Navigation Button:</label>';
    echo '<label class="switch"><input type="checkbox" id="svp_navigation" name="svp_navigation" value="' . $navigation . '" ' . checked($navigation, "on", false) . '>';
    echo '<span class="slider round"></span></label></p>';

    // Play/Pause button switch
    echo '<p class="svp-field"><label for="svp_play_pause">Play/Pause Button:</label>';
    echo '<label class="switch"><input type="checkbox" id="svp_play_pause" name="svp_play_pause" value="' . $play_pause . '" ' . checked($play_pause, "on", false) . '>';
    echo '<span class="slider round"></span></label></p>';

    // Color Picker for color
    echo '<p class="svp-field"><label for="svp_color">Player Color:</label>';
    echo '<input type="text" id="svp_color" name="svp_color" value="' . esc_attr($color) . '" class="svp-color-field" /></p>';

    // Color Picker for background color
    echo '<p class="svp-field"><label for="svp_background_color">Background Color:</label>';
    echo '<input type="text" id="svp_background_color" name="svp_background_color" value="' . esc_attr($background_color) . '" class="svp-color-field" /></p>';

    // Color Picker for hover color
    echo '<p class="svp-field"><label for="svp_hover_color">Hover Color:</label>';
    echo '<input type="text" id="svp_hover_color" name="svp_hover_color" value="' . esc_attr($hover_color) . '" class="svp-color-field" /></p>';


    echo '</div>';
}

function svp_cta_details_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'svp_cta_nonce');
    $ctas = get_post_meta($post->ID, '_svp_ctas', true);
    $pop_ups = get_post_meta($post->ID, '_svp_pop_ups', true);
    echo '<div class="svp-meta-box-container">';
    echo '<ul id="svp_cta_list">';
    if (!empty($ctas)) {
        foreach ($ctas as $index => $cta) {
            echo '<li>';
            echo '<div class="cta-icon-upload">';
            $icon_url = !empty($cta['icon']) ? esc_url($cta['icon']) : '';
            $button_label = $icon_url ? 'Change Icon' : 'Upload Icon';
            echo '<img src="' . $icon_url . '" class="cta-icon-preview" style="max-width: 100px; display: ' . ($icon_url ? 'block' : 'none') . ';" />';
            echo '<input type="hidden" name="svp_ctas[' . $index . '][icon]" value="' . $icon_url . '" class="cta-icon-url" />';
            echo '<button type="button" class="upload-cta-icon button">' . $button_label . '</button>';
            echo '</div>';
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

    echo '<div class="svp-meta-box-container">';
    echo '<ul id="svp_popup_list">';
    if (!empty($pop_ups)) {
        foreach ($pop_ups as $index => $popup) {
            echo '<li>';
            // Image Upload
            $popup_image_url = !empty($popup['image']) ? esc_url($popup['image']) : '';
            echo '<div class="popup-image-upload">';
            echo '<img src="' . $popup_image_url . '" class="popup-image-preview" style="max-width: 100px; display: ' . ($popup_image_url ? 'block' : 'none') . ';" />';
            echo '<input type="hidden" name="svp_pop_ups[' . $index . '][image]" value="' . $popup_image_url . '" class="popup-image-url" />';
            echo '<button type="button" class="upload-popup-image button">' . ($popup_image_url ? 'Change Image' : 'Upload Image') . '</button>';
            echo '</div>';

            // Title Input
            echo '<input type="text" name="svp_pop_ups[' . $index . '][title]" placeholder="Title" value="' . esc_attr($popup['title']) . '" />';

            // Content WYSIWYG Editor
            wp_editor($popup['content'], 'svp_popup_content_' . $index, array('textarea_name' => 'svp_pop_ups[' . $index . '][content]'));

            // Position Selection
            echo '<select name="svp_pop_ups[' . $index . '][position]" class="popup-position-select">';
            echo '<option value="">Select Position</option>';
            echo '<option value="popup--left" ' . selected($popup['position'], 'popup--left', false) . '>Left</option>';
            echo '<option value="popup--right" ' . selected($popup['position'], 'popup--right', false) . '>Right</option>';
            echo '<option value="popup--bottom" ' . selected($popup['position'], 'popup--bottom', false) . '>Bottom</option>';
            echo '</select>';

            // Size Option
            echo '<select name="svp_pop_ups[' . $index . '][size]" class="popup-size-select">';
            echo '<option value="autosize" ' . selected($popup['size'], 'autosize', false) . '>Auto Size</option>';
            echo '<option value="fullsize" ' . selected($popup['size'], 'fullsize', false) . '>Full Size</option>';
            echo '</select>';

            // Display as Button Checkbox
            echo '<p><label><input type="checkbox" name="svp_pop_ups[' . $index . '][display_as_button]" ' . checked($popup['display_as_button'], 'on', false) . ' /> Display as Button</label></p>';

            // Remove Button
            echo '<button class="remove-popup button">Remove</button>';
            echo '</li>';
        }
    }
    echo '</ul>';
    echo '<button type="button" id="add_popup_button" class="button">Add Info Popup</button>';
    echo '</div>';
}

function svp_statistics_details_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'svp_nonce');

    // Fetch existing meta values
    $views = get_post_meta($post->ID, '_svp_views', true);
    $clicks = get_post_meta($post->ID, '_svp_clicks', true);
    echo '<div class="svp-meta-box-container">';
    echo '<p class="svp-field"><label for="svp_views">Views:</label>';
    echo '<input type="number" id="svp_views" name="svp_views" value="' . esc_attr($views) . '" size="10" readonly/></p>';
    echo '<p class="svp-field"><label for="svp_clicks">Clicks:</label>';
    echo '<input type="number" id="svp_clicks" name="svp_clicks" value="' . esc_attr($clicks) . '" size="10" readonly /></p>';

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

    // Save the Popups
    if (isset($_POST['svp_pop_ups'])) {
        $popups = array_map(function ($popup) {
            return [
                'image' => sanitize_text_field($popup['image']),
                'title' => sanitize_text_field($popup['title']),
                'content' => wp_kses_post($popup['content']), // Allows safe HTML for content
                'position' => sanitize_text_field($popup['position']),
                'size' => sanitize_text_field($popup['size']),
                'display_as_button' => isset($popup['display_as_button']) ? 'on' : 'off',
            ];
        }, $_POST['svp_pop_ups']);
        update_post_meta($post_id, '_svp_pop_ups', $popups);
    } else {
        delete_post_meta($post_id, '_svp_pop_ups');
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

    // Save color fields (color, background_color, hover_color)
    if (isset($_POST['svp_color'])) {
        update_post_meta($post_id, '_svp_color', sanitize_hex_color($_POST['svp_color']));
    }
    if (isset($_POST['svp_background_color'])) {
        update_post_meta($post_id, '_svp_background_color', sanitize_hex_color($_POST['svp_background_color']));
    }
    if (isset($_POST['svp_hover_color'])) {
        update_post_meta($post_id, '_svp_hover_color', sanitize_hex_color($_POST['svp_hover_color']));
    } else {
        delete_post_meta($post_id, '_svp_color');
        delete_post_meta($post_id, '_svp_background_color');
        delete_post_meta($post_id, '_svp_hover_color');
    }

    // Save switch buttons (mute, share, navigation, play_pause)
    $mute = isset($_POST['svp_mute']) ? 'on' : 'off';
    update_post_meta($post_id, '_svp_mute', $mute);

    $share = isset($_POST['svp_share']) ? 'on' : 'off';
    update_post_meta($post_id, '_svp_share', $share);

    $navigation = isset($_POST['svp_navigation']) ? 'on' : 'off';
    update_post_meta($post_id, '_svp_navigation', $navigation);

    $play_pause = isset($_POST['svp_play_pause']) ? 'on' : 'off';
    update_post_meta($post_id, '_svp_play_pause', $play_pause);
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
        margin-bottom: 20px;
    }
    .svp-meta-box-container p {
        margin-bottom: 15px;
    }
    .svp-meta-box-container label {
        font-weight: bold;
        display: inline-block;
        width: 150px;
        margin-right: 10px;
    }
    .wp-picker-container .wp-color-result.button {
        margin: 0;
    }
    .svp-meta-box-container label.switch {
        width: 34px;
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
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .svp-meta-box-container ul li input {
        margin-right: 10px;
    }
    .svp-meta-box-container .remove-video,
    .svp-meta-box-container .remove-cta-icon,
    .svp-meta-box-container .remove-cta {
        background-color: #ff5c5c;
        border-color: #ff5c5c;
        color: #fff;
        margin-left: 15px;
        display: inline-block;
    }
    .svp-meta-box-container .remove-video:hover,
    .svp-meta-box-container .remove-cta-icon:hover,
    .svp-meta-box-container .remove-cta:hover {
        background-color: #cc4a4a;
    }
    .cta-icon-upload img.cta-icon-preview {
        max-width: 100px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        display: block;
    }
    .cta-icon-upload button {
        display: block;
        margin-top: 10px;
    }
    .cta-icon-upload .remove-cta-icon {
        display: inline-block;
        background-color: #ff5c5c;
        border-color: #ff5c5c;
        color: #fff;
        margin-left: 10px;
    }
    .cta-icon-upload .remove-cta-icon:hover {
        background-color: #cc4a4a;
    }
    .svp-meta-box-container select.cta-icon-select {
        margin-right: 10px;
        width: auto;
    }
    .cta-icon-upload .button.upload-cta-icon {
        background-color: #0073aa;
        color: #fff;
    }
    /* Toggle switch styling */
.switch {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 20px;
}

.switch input {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:checked + .slider:before {
    transform: translateX(14px);
}
#svp_popup_list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

#svp_popup_list li div, 
#svp_popup_list li input, 
#svp_popup_list li select, 
#svp_popup_list li textarea {
    margin-right: 10px;
}

.popup-image-upload, .popup-position-select, .popup-size-select, 
input[type="text"], textarea {
    flex: 1;
}

textarea {
    min-height: 100px;
    resize: vertical;
}

button {
    margin-left: 5px;
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
            $('.svp-color-field').wpColorPicker();
            var ctaPositionOptions = [
                {class: 'cta--left', label: 'Left'},
                {class: 'cta--right', label: 'Right'},
                {class: 'cta--bottom', label: 'Bottom'},
            ];

            var popupPositionOptions = [
                {class: 'popup--left', label: 'Left'},
                {class: 'popup--right', label: 'Right'},
                {class: 'popup--bottom', label: 'Bottom'},
            ];
            var popupSizeOptions = [
                {value: 'autosize', label: 'Auto Size'},
                {value: 'fullsize', label: 'Full Size'},
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

            function openMediaUploader(button, imgPreview, hiddenField) {
                var mediaUploader;

                if (mediaUploader) {
                    mediaUploader.open();
                    return;
                }

                mediaUploader = wp.media({
                    title: 'Choose Icon',
                    button: {
                        text: 'Use this icon'
                    },
                    multiple: false,
                    library: {type: 'image'}
                });

                mediaUploader.on('select', function () {
                    var attachment = mediaUploader.state().get('selection').first().toJSON();
                    var iconUrl = attachment.url;

                    // Update preview and hidden field
                    imgPreview.attr('src', iconUrl).show();
                    hiddenField.val(iconUrl);
                    button.text('Change Icon');
                    button.siblings('.remove-cta-icon').show();
                });
                mediaUploader.open();
            }

            // Upload CTA icon button click
            $('#svp_cta_list').on('click', '.upload-cta-icon', function (e) {
                e.preventDefault();
                var button = $(this);
                var imgPreview = button.siblings('.cta-icon-preview');
                var hiddenField = button.siblings('.cta-icon-url');
                openMediaUploader(button, imgPreview, hiddenField);
            });

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
                    '<div class="cta-icon-upload">' +
                    '<img src="" class="cta-icon-preview" style="max-width: 100px; display: none;" />' +
                    '<input type="hidden" name="svp_ctas[' + ctaCount + '][icon]" class="cta-icon-url" />' +
                    '<button type="button" class="upload-cta-icon button">Upload Icon</button>' +
                    '</div>' +
                    '<select name="svp_ctas[' + ctaCount + '][position]" class="cta-icon-select">' +
                    '<option value="">Select Position</option>';

                ctaPositionOptions.forEach(function (option) {
                    newCtaHtml += '<option value="' + option.class + '">' + option.label + '</option>';
                });

                newCtaHtml += '</select>' +
                    '<input type="url" name="svp_ctas[' + ctaCount + '][url]" placeholder="URL" />' +
                    '<p><label><input type="checkbox" name="svp_ctas[' + ctaCount + '][new_tab]" /> Open in New Tab</label></p>' +
                    '<button class="remove-cta button">Remove</button>' +
                    '</li>';

                $('#svp_cta_list').append(newCtaHtml);
            });
            $('#svp_cta_list').on('click', '.remove-cta', function (e) {
                e.preventDefault();
                $(this).closest('li').remove();
            });
            $('#svp_cta_list').on('change', '.cta-icon-select', function () {
                updateIconPreview(this);
            });
            $('.cta-icon-select').each(function () {
                updateIconPreview(this);
            });

            // Add Popup Logic
            $('#add_popup_button').on('click', function () {
                var popupCount = $('#svp_popup_list li').length;
                var newPopupHtml = '<li>' +
                    '<div class="popup-image-upload">' +
                    '<img src="" class="popup-image-preview" style="max-width: 100px; display: none;" />' +
                    '<input type="hidden" name="svp_pop_ups[' + popupCount + '][image]" class="popup-image-url" />' +
                    '<button type="button" class="upload-popup-image button">Upload Image</button>' +
                    '</div>' +
                    '<input type="text" name="svp_pop_ups[' + popupCount + '][title]" placeholder="Title" />' +
                    '<div>' +
                    '<textarea name="svp_pop_ups[' + popupCount + '][content]" class="popup-content" id = "textarea_'+popupCount+'" placeholder="Content"></textarea>' +
                    '</div>' +
                    '<select name="svp_pop_ups[' + popupCount + '][position]" class="popup-position-select">' +
                    '<option value="">Select Position</option>';

                popupPositionOptions.forEach(function (option) {
                    newPopupHtml += '<option value="' + option.class + '">' + option.label + '</option>';
                });

                newPopupHtml += '</select>' +
                    '<select name="svp_pop_ups[' + popupCount + '][size]" class="popup-size-select">' +
                    '<option value="">Select Size</option>';

                popupSizeOptions.forEach(function (option) {
                    newPopupHtml += '<option value="' + option.value + '">' + option.label + '</option>';
                });

                newPopupHtml += '</select>' +
                    '<p><label><input type="checkbox" name="svp_pop_ups[' + popupCount + '][display_as_button]" /> Display as Button</label></p>' +
                    '<button class="remove-popup button">Remove</button>' +
                    '</li>';

                $('#svp_popup_list').append(newPopupHtml);
                wp.editor.initialize(textarea_2, {
                    tinymce: {
                        wpautop: true,
                        plugins: 'lists,paste,media,wordpress',
                        toolbar1: 'bold,italic,underline,bullist,numlist,link,unlink,wp_adv',
                        toolbar2: 'formatselect,alignleft,aligncenter,alignright,alignjustify',
                        toolbar3: 'media',
                    },
                    quicktags: true,
                    mediaButtons: true
                })
            });

            $('#svp_popup_list').on('click', '.remove-popup', function (e) {
                e.preventDefault();
                $(this).closest('li').remove();
            });

            // Open media uploader for popup image
            $('#svp_popup_list').on('click', '.upload-popup-image', function (e) {
                e.preventDefault();
                var button = $(this);
                var imgPreview = button.siblings('.popup-image-preview');
                var hiddenField = button.siblings('.popup-image-url');
                openMediaUploader(button, imgPreview, hiddenField);
            });

            // WYSIWYG Editor Initialization
            $('#svp_popup_list').on('focus', '.popup-content', function () {
                var textareaId = $(this).attr('id');
                if (!textareaId) {
                    var randomId = 'popup_content_' + Math.random().toString(36).substr(2, 9);
                    $(this).attr('id', randomId);
                    wp.editor.initialize(randomId, {
                        tinymce: {
                            toolbar1: 'bold,italic,underline,|,bullist,numlist,|,link,unlink',
                            toolbar2: '',
                            toolbar3: '',
                            menubar: false,
                            statusbar: false,
                        },
                        quicktags: true,
                    });
                }
            });

        });
    </script>
    <?php
}

add_action('admin_footer', 'svp_admin_scripts');
