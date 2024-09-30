<?php
// Add custom menu and submenu for dashboard and Shoppable Videos
function svp_add_dashboard_menu() {

    add_menu_page(
        'Shoppable Video Pro', // Page title
        'Shoppable Video Pro', // Menu title
        'manage_options',      // Capability
        'svp_dashboard',       // Menu slug
        'svp_render_dashboard_page', // Function to display dashboard page content
        'dashicons-video-alt3', // Icon URL (WordPress dashicon)
        6                      // Position
    );

    // Add a submenu for the dashboard
    add_submenu_page(
        'svp_dashboard',       // Parent slug (Shoppable Video Pro)
        'Dashboard',           // Page title
        'Dashboard',           // Submenu title
        'manage_options',      // Capability
        'svp_dashboard',       // Menu slug
        'svp_render_dashboard_page'  // Function to display dashboard page content
    );

    // Add a submenu for Shoppable Videos (custom post type)
    add_submenu_page(
        'svp_dashboard',        // Parent slug (Shoppable Video Pro)
        'Shoppable Videos',     // Page title
        'Shoppable Videos',     // Submenu title
        'edit_posts',           // Capability to manage custom post type
        'edit.php?post_type=shoppable_video' // Directly link to Shoppable Videos post type page
    );
}
add_action('admin_menu', 'svp_add_dashboard_menu');