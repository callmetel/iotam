<?php 

/*
	Template Name: Job Listings

*/

get_header(); ?>

	<?php 

	if ( have_posts() ):
		
		/* Start the Loop */
		while ( have_posts() ) : the_post(); ?>
			
			<?php include 'partials/job-descriptions.php'; ?>
			
		<?php endwhile;
	endif;
	?>


<?php get_footer(); ?>
