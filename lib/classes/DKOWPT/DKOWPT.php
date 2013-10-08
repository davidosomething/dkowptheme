<?php
class DKOWPT
{
  static public $assets_version = null;
  static public $assets_directory = '/build/assets/';
  static public $assets_directory_uri;

  /**
   * __construct
   *
   * @return void
   */
  private function __construct() {
    defined('SERVER_ENVIRONMENT') or define('SERVER_ENVIRONMENT', 'DEV');

    // use release build of assets in these environments
    if (static::inEnvironment(array('PROD', 'STAGE', 'QA'))) {
      static::$assets_directory = '/release/assets/';
    }
    else {
      static::$assets_version = (string)mt_rand(100000, 999999);
    }
    static::$assets_directory_uri = get_stylesheet_directory_uri() . static::$assets_directory;

    add_action('widgets_init', array($this, 'unregisterDefaultWidgets'));
  }

  /**
   * getInstance
   * Singleton factory
   *
   * @return void
   */
  static public function getInstance() {
    static $instance = null;
    if ($instance === null) {
      $instance = new DKOWPT();
    }
    return $instance;
  }

////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////
  /**
   * assetUrl
   *
   * @param string $filepath relative path to asset you want
   * @param array $options not implemented
   * @return string Path to asset in /assets/ directory
   */
  static public function assetUrl($filepath, $options = array()) {
    /*
    $defaults = array();
    $options = wp_parse_args($options, $defaults);
    */
    return static::$assets_directory_uri . $filepath;
  }

  /**
   * enqueueCSS
   * Facade
   *
   * @param mixed $url
   */
  public function enqueueCSS($url, $options = array()) {
    $defaults = array(
      'dependencies' => array(),
      'name'         => md5($url),
    );
    $options = wp_parse_args($options, $defaults);
    wp_enqueue_style(
      $options['name'],
      $url,
      $options['dependencies'],
      $this->assets_version
    );
  }

  /**
   * enqueueJS
   * Facade
   *
   * @param mixed $url
   */
  public function enqueueJS($url, $options = array()) {
    $defaults = array(
      'dependencies' => array('jquery'),
      'in_footer'    => true,
      'name'         => md5($url),
    );
    $options = wp_parse_args($options, $defaults);
    wp_enqueue_script(
      $options['name'],
      $url,
      $options['dependencies'],
      $this->assets_version,
      $options['in_footer']
    );
  }

  /**
   * nq
   * Facade facade
   *
   * @param string $url relative path in assets folder (e.g. css/style.css)
   */
  static public function nq($url) {
    $parts = pathinfo($url);
    if ($parts['extension'] === 'css') {
      static::getInstance()->enqueueCSS(static::assetUrl($url));
    }
    elseif ($parts['extension'] === 'js') {
      static::getInstance()->enqueueJS(static::assetUrl($url));
    }
  }

  /**
   * inEnvironment
   *
   * @param mixed $rules
   * @return bool whether or not the server is in the environment(s) given
   */
  static public function inEnvironment($rules) {
    if (is_bool($rules)) {
      return $rules;
    }
    if (is_string($rules)) {
      return SERVER_ENVIRONMENT === $rules;
    }
    if (is_array($rules)) {
      return in_array(SERVER_ENVIRONMENT, $rules);
    }
    return false;
  }

  /**
   * render
   * Output a template
   *
   * @param string $filepath
   */
  static public function render($filepath, $data = array()) {
    global $dkowpt;
    extract($data);
    include trailingslashit(get_stylesheet_directory()) . $filepath;
  }

////////////////////////////////////////////////////////////////////////////////
// Actions and Filters
////////////////////////////////////////////////////////////////////////////////
  public function unregisterDefaultwidgets() {
    unregister_widget( 'WP_Widget_Pages' );
    unregister_widget( 'WP_Widget_Calendar' );
    unregister_widget( 'WP_Widget_Archives' );
    unregister_widget( 'WP_Widget_Links' );
    unregister_widget( 'WP_Widget_Categories' );
    unregister_widget( 'WP_Widget_Recent_Posts' );
    unregister_widget( 'WP_Widget_Search' );
    unregister_widget( 'WP_Widget_Tag_Cloud' );
  }
}
