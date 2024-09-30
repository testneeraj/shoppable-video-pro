<?php
/*
Plugin Name: Shoppable Video Pro
Description: A plugin to create shoppable videos with statistics tracking.
Version: 1.0
Author: Neeraj Khatediya
*/

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
if ( ! defined( 'WPINC' ) ) {
    exit;
}

if ( ! defined( 'SVP_PLUGIN_URL' ) ) {
    define( 'SVP_PLUGIN_URL', plugin_dir_url( __FILE__) );
}

if ( ! defined( 'SVP_PLUGIN_PATH' ) ) {
    define( 'SVP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'SVP_PLUGIN_BASENAME' ) ) {
    define( 'SVP_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
}

if ( ! defined( 'SVP_PLUGIN_VERSION' ) ) {
    define( 'SVP_PLUGIN_VERSION', '1.0' );
}

require SVP_PLUGIN_PATH . 'admin/cpt.php';

require SVP_PLUGIN_PATH . 'admin/menus.php';

require SVP_PLUGIN_PATH . 'admin/custom-fields.php';

require SVP_PLUGIN_PATH . 'admin/dashboard.php';

require SVP_PLUGIN_PATH . 'public/pop-up.php';



