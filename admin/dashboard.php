<?php
// Helper function to get sum of meta values for all shoppable videos
function get_all_video_meta_sum($meta_key) {
    global $wpdb;
    $result = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT SUM(meta_value) FROM $wpdb->postmeta WHERE meta_key = %s",
            $meta_key
        )
    );
    return $result ? $result : 0;
}
function svp_render_dashboard_page() {
    // Check user capabilities
    if (!current_user_can('manage_options')) {
        return;
    }

    echo '<div class="wrap">';
    echo '<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Shoppable Video Pro Dashboard</h1>';

    // Add inline CSS for styling the dashboard
    echo '<style>
        .svp-dashboard-stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .svp-stat-box {
            background: #f1f1f1;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
            width: 23%;
        }
        .svp-stat-box h2 {
            font-size: 30px;
            margin: 0 0 10px;
        }
        .svp-stat-box p {
            margin: 0;
            font-size: 16px;
        }
    </style>';

    // Dashboard statistics
    $videos = wp_count_posts('shoppable_video');
    $total_views = get_all_video_meta_sum('_svp_views');
    $total_clicks = get_all_video_meta_sum('_svp_clicks');
    $total_purchases = get_all_video_meta_sum('_svp_purchases');

    echo '<div class="svp-dashboard-stats">';
    echo '<div class="svp-stat-box">';
    echo '<h2>' . esc_html($videos->publish) . '</h2>';
    echo '<p>Total Videos</p>';
    echo '</div>';

    echo '<div class="svp-stat-box">';
    echo '<h2>' . esc_html($total_views) . '</h2>';
    echo '<p>Total Views</p>';
    echo '</div>';

    echo '<div class="svp-stat-box">';
    echo '<h2>' . esc_html($total_clicks) . '</h2>';
    echo '<p>Total Clicks</p>';
    echo '</div>';

    echo '<div class="svp-stat-box">';
    echo '<h2>' . esc_html($total_purchases) . '</h2>';
    echo '<p>Total Purchases</p>';
    echo '</div>';
    echo '</div>';

    echo '</div>';
}