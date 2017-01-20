<?php

/*Submit*/

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

?>