<?php

//Making jQuery Google API
function modify_jquery() {
  if (!is_admin()) {
    // comment out the next two lines to load the local copy of jQuery
    wp_deregister_script('jquery');
    wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', false, '3.1.1');
    wp_enqueue_script('jquery');
  }
}
add_action('init', 'modify_jquery');

function IOTAM_script_enqueue() {
  wp_enqueue_style( 'customstyle', get_template_directory_uri() . '/app/css/app.css' , array(), '1.0.0', 'all' );
  wp_enqueue_script( 'youtubeAPI',('https://www.youtube.com/iframe_api') , array('jquery'), null, true );
  wp_enqueue_script( 'customjs', get_template_directory_uri() . '/app/js/lib/function.js' , array(), null, true );
}

add_action( 'wp_enqueue_scripts' , 'IOTAM_script_enqueue');

// Let's hook in our function with the javascript files with the wp_enqueue_scripts hook 

// Register some javascript files, because we love javascript files. Enqueue a couple as well 
function IOTAM_load_javascript_files() {
  // wp_register_script( 'submit', get_template_directory_uri() . '/app/js/lib/submit.js', array(), '1.0.0', true );
  wp_register_script( 'gsap',('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js'), array('jquery'), '1.0.0', true );
  wp_register_script( 'mousewheel', ('https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js'), array('jquery'), '1.0.0', true );
  // wp_enqueue_script( 'submit' );
  wp_enqueue_script( 'gsap' );
  wp_enqueue_script( 'vimeoplayer' );
  wp_enqueue_script( 'mousewheel' );


}
add_action( 'wp_enqueue_scripts', 'IOTAM_load_javascript_files' );

function IOTAM_theme_setup(){

  // add_theme_support('menus');

  // register_nav_menus(array(
  //   'primary' => __('Fixed Nav', 'jgp'),
  //   'secondary' => __('Subpage Nav', 'jgp'),
  //   'store-menu' => __('Here2CoolStuff Menu', 'jgp'),
  //   'productions-menu' => __('John Graves Productions Menu', 'jgp'),
  //   'studio-menu' => __('JGP Studio Menu', 'jgp')
  //   ));
 
}

add_action( 'init', 'IOTAM_theme_setup' );

add_filter( 'body_class', function( $classes ) {
    return array_merge( $classes, array( 'initial-hide' ) );
} );

/**
 * Remove Original Wysiwyg Editor from Backend pages
 */

add_action('init', 'my_remove_editor_from_post_type');
function my_remove_editor_from_post_type() {
    remove_post_type_support( 'page', 'editor' );
}

/**
 * Remove Wyiswg Editor Toolbar
 */

add_filter( 'acf/fields/wysiwyg/toolbars' , 'my_toolbars'  );
function my_toolbars( $toolbars )
{
  // Uncomment to view format of $toolbars
  /*
  echo '< pre >';
    print_r($toolbars);
  echo '< /pre >';
  die;
  */

  // Add a new toolbar called "Very Simple"
  // - this toolbar has only 1 row of buttons
  $toolbars['Very Simple' ] = array();
  $toolbars['Very Simple' ][1] = array('bold' , 'italic' , 'underline' );

  // Edit the "Full" toolbar and remove 'code'
  // - delet from array code from http://stackoverflow.com/questions/7225070/php-array-delete-by-value-not-key
  if( ($key = array_search('code' , $toolbars['Full' ][2])) !== false )
  {
      unset( $toolbars['Full' ][2][$key] );
  }

  // remove the 'Basic' toolbar completely
  unset( $toolbars['Basic' ] );

  // return $toolbars - IMPORTANT!
  return $toolbars;
}

/**
 * Allow SVG files to be uploaded
 */

add_filter('upload_mimes', 'custom_upload_mimes');

function custom_upload_mimes ( $existing_mimes=array() ) {

  // add the file extension to the array

  $existing_mimes['svg'] = 'mime/type';

        // call the modified list of extensions

  return $existing_mimes;

}

/*SHORTCODE FOR GETTING THE FORM on FRONTEND*/
function post_form_shortcode($atts, $content = null) {

ob_start();

echo '<form method="post" action="" class="share-form">
<div class="left">
    <input type="text" name="firstName" class="name-field field" placeholder="First name:" role="textbox">
    <input type="text" name="city" class="city-field field field" placeholder="City:" role="textbox">
    <input type="text" name="state" class="state-field field" placeholder="State:" role="textbox">
    <input type="hidden" name="category" value="" class="category" role="textbox">
    <select name="topic" class="topic hidden-field hide">
        <option value=""></option>
    </select>
    <ul class="select-dropdown">
        <li class="select-option is-selected" role="button" tabindex="0"><span>Topic</span></li>
        <li class="select-option" cat="2" role="button" tabindex="0"><span>Happiness</span></li>
        <li class="select-option" cat="3" role="button" tabindex="0"><span>Connection</span></li>
        <li class="select-option" cat="4" role="button" tabindex="0"><span>Peace of Mind</span></li>
        <li class="select-option" cat="5" role="button" tabindex="0"><span>Confidence</span></li>
        <li class="select-option" cat="6" role="button" tabindex="0"><span>Freedom</span></li>
    </ul>
</div>
<div class="right">
    <textarea name="story" class="story-input" placeholder="Story:"></textarea>
    <div class="checkbox-field">
        <!--<p class="dark-link">Terms and conditions</p>-->
        <input type="checkbox" name="termsandconditions" value="none" id="checkbox1" aria-hidden="true" tabindex="-1">
        <label for="checkbox1" role="button" tabindex="0" class="checkbox-label">I accept the terms and conditions.</label>
    </div>
    <div class="submit">
        <input type="submit" id="happiness-submit" class="submit-btn" value="Share" name="add_post" role="button" tabindex="0">
        <!--<p class="disclaimer">*Your story will be shared on this public site for others to read</p>-->
    </div>
</div>
<div class="form-footer">
      <a href="https://www.aetna.com/legal-notices/privacy.html" target="_blank" class="privacy-center">Privacy Center</a><span>|</span><a href="https://www.aetna.com/legal-notices/disclaimer.html" target="_blank" class="terms-of-use">Terms of Use</a><span>|</span><a href="https://www.aetna.com/legal-notices.html" target="_blank" class="legal-notices">Legal Notices</a><span>|</span><a href="https://www.aetna.com/legal-notices/nondiscrimination-notice.html" target="_blank" class="nondiscrimination-notice">Nondiscrimination Notice</a>
    </div>
</form>';


// Reset query to prevent conflicts
return ob_get_clean();
}
add_shortcode("post-form", "post_form_shortcode");


if($_POST['add_post']){
  $new_post = wp_insert_post(array(
    'post_type' => 'post',
    'post_title' => $_POST['topic'],
    'post_content' => $_POST['story'],
    'post_author' => 'user',
    'post_status' => 'draft',
    'post_category' => array($_POST['category']),
  ));
  $id = $new_post;
  update_post_meta($id,'first_name', $_POST['firstName']);
  update_post_meta($id,'city', $_POST['city']);
  update_post_meta($id,'state', $_POST['state']);
}

/**
 * Advanced Custom Fields
 * [add field groups to the site]
 */







// <?php

// add_action( 'wp_enqueue_scripts', 'register_jquery' );
// function register_jquery() {
//     wp_deregister_script( 'jquery' );
//     wp_register_script( 'jquery', ( 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js' ), false, null, true );
//     wp_enqueue_script( 'jquery' );
// }

// function IOTAM_script_enqueue() {
//   wp_enqueue_style( 'fonts', '//fast.fonts.net/cssapi/f5903750-8000-42f7-a667-c62502d80e78.css' , array(), '1.0.0', 'all' );
// 	wp_enqueue_style( 'customstyle', get_template_directory_uri() . '/app/css/app.min.css' , array(), '1.0.0', 'all' );
//   wp_enqueue_script( 'customjs', get_template_directory_uri() . '/app/js/lib/script.js' , array(), '1.0.0', true );
// }

// add_action( 'wp_enqueue_scripts' , 'IOTAM_script_enqueue');

// // Let's hook in our function with the javascript files with the wp_enqueue_scripts hook 

// // Register some javascript files, because we love javascript files. Enqueue a couple as well 
// function IOTAM_load_javascript_files() {
//   wp_register_script( 'global_script', get_template_directory_uri() . '/app/js/lib/function.min.js', array('jquery'), '1.0.0', true );
//   wp_register_script( 'gsap', get_template_directory_uri() . 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js', array('jquery'), '1.0.0', true );
//   wp_register_script( 'mousewheel', get_template_directory_uri() . 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js', array('jquery'), '1.0.0', true );

// }
// add_action( 'wp_enqueue_scripts', 'IOTAM_load_javascript_files' );


// add_action( 'init', 'IOTAM_theme_setup' );

// /**
//  * Remove Original Wysiwyg Editor from Backend pages
//  */

// add_action('init', 'my_remove_editor_from_post_type');
// function my_remove_editor_from_post_type() {
//     remove_post_type_support( 'page', 'editor' );
// }

// /**
//  * Remove Wyiswg Editor Toolbar
//  */

// add_filter( 'acf/fields/wysiwyg/toolbars' , 'my_toolbars'  );
// function my_toolbars( $toolbars )
// {
//   // Uncomment to view format of $toolbars
//   /*
//   echo '< pre >';
//     print_r($toolbars);
//   echo '< /pre >';
//   die;
//   */

//   // Add a new toolbar called "Very Simple"
//   // - this toolbar has only 1 row of buttons
//   $toolbars['Very Simple' ] = array();
//   $toolbars['Very Simple' ][1] = array('bold' , 'italic' , 'underline' );

//   // Edit the "Full" toolbar and remove 'code'
//   // - delet from array code from http://stackoverflow.com/questions/7225070/php-array-delete-by-value-not-key
//   if( ($key = array_search('code' , $toolbars['Full' ][2])) !== false )
//   {
//       unset( $toolbars['Full' ][2][$key] );
//   }

//   // remove the 'Basic' toolbar completely
//   unset( $toolbars['Basic' ] );

//   // return $toolbars - IMPORTANT!
//   return $toolbars;
// }

// /**
//  * Allow SVG files to be uploaded
//  */

// add_filter('upload_mimes', 'custom_upload_mimes');

// function custom_upload_mimes ( $existing_mimes=array() ) {

//   // add the file extension to the array

//   $existing_mimes['svg'] = 'mime/type';

//         // call the modified list of extensions

//   return $existing_mimes;

// }

// /**
//  * Advanced Custom Fields
//  * [add field groups to the site]
//  */

