<?php
// Register custom post type
function svp_register_shoppable_video_cpt()
{
    $labels = array(
        'name' => 'Shoppable Videos',
        'singular_name' => 'Shoppable Video',
        'menu_name' => 'Shoppable Videos',
        'name_admin_bar' => 'Shoppable Video',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Shoppable Video',
        'new_item' => 'New Shoppable Video',
        'edit_item' => 'Edit Shoppable Video',
        'view_item' => 'View Shoppable Video',
        'all_items' => 'All Shoppable Videos',
        'search_items' => 'Search Shoppable Videos',
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => false,
        'query_var' => true,
        'rewrite' => array('slug' => 'shoppable-video'),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'supports' => array('title', 'thumbnail', 'custom-fields'),
    );

    register_post_type('shoppable_video', $args);
}

add_action('init', 'svp_register_shoppable_video_cpt');