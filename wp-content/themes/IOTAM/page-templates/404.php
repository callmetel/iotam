<?php 

/*
	Template Name: 404

*/

get_header(); ?>

	<?php 

	if ( have_posts() ):
		
		/* Start the Loop */
		while ( have_posts() ) : the_post(); ?>
			
			<h1>404</h1>
			<h2>SORRY AN ERROR OCCURED.</h2>
			<p>Either The Page Doesn't Exist or An Error Occured But Don't Worry You can Go to our <u><a href="/index.php/home">Homepage</a></u> or to the <u><a href="">Previous Page</a></u>.</p><?php include 'partials/home/intro.php'; ?>

		<?php endwhile;
	endif;
	?>


<?php get_footer(); ?>

