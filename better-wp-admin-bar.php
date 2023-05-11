<?php
/*
Plugin Name:  Better WP Admin Bar
Description:  A tiny plugin to make the WordPress admin bar less annoying when working with a fixed header theme.
Version:      1.2
Author:       Dalton Walsh
Author URI:   https://www.daltonwalsh.com
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  better-wp-admin-bar
Domain Path:  /languages
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

add_action('wp_enqueue_scripts','betterWpAdminBar');

if ( !function_exists( 'betterWpAdminBar' ) ) {
  function betterWpAdminBar() {
    wp_enqueue_script( 'better-wp-admin-bar-js', plugins_url( '/assets/js/main.bundle.js', __FILE__ ));
    wp_register_style( 'better-wp-admin-bar-css', plugins_url( '/assets/css/main.bundle.css', __FILE__ ) );
    wp_enqueue_style( 'better-wp-admin-bar-css' );
  }
}