<?php 

		// check for rows (parent repeater)
	if( have_rows('creative_job_description') ): ?>
		<?php 

		remove_filter ('acf_the_content', 'wpautop');
			// loop through rows (parent repeater)
		while( have_rows('creative_job_description') ): the_row(); 

			//declare subfield variables
		$title = get_sub_field('job_title');
		$caption = get_sub_field('title_caption');
		$description = get_sub_field('description');
		$rList = get_sub_field('responsibilities_list');
		$mList = get_sub_field('musts_list');
		$miList = get_sub_field('mights_list');


		?>
		
		<li class="individual-job">

			<h2 class="job-title"><?php echo $title ?></h2>
			<p class="title-caption"><?php echo $caption ?></p>
			<p class="description"><?php echo $description ?></p>
			<h4>Responsibilities:</h4>
			<ul class="responsibilities-list">

				<?php 

					// check for rows (sub repeater)
					if( have_rows('responsibilities_list') ): ?>
						<?php 

							// loop through rows (sub repeater)
							while( have_rows('responsibilities_list') ): the_row();
							$responsibility = get_sub_field('responsibilty');
							?>
					<li class="responsibility"><?php echo $responsibility ?></li>
				<?php endwhile; ?>
			<?php endif; ?>
			</ul>	
			<h4>Musts:</h4>
			<ul class="musts-list">

			</ul>
			<?php
				if( have_rows('mights_list') )
				{
					$field_key = "field_58123c631bbd1";
					$field = get_field_object($field_key);

					foreach($field['value'] as $value)
					{
					if(!empty($value['might']))
						{
						$not_empty = true;
						break;
						}
					}

					if($not_empty == true)
					{
					echo '<h2>Mights:</h2>';
					}

					echo '<ul>';
					while ( have_rows('mights_list') )
					{		 					
					the_row();
					$subfield = get_sub_field('might');
								
						if( !empty($subfield) )
						{
						echo '<li>' . $subfield . '</li>';
						}
					}
					echo '</ul>';
				}
			?>	
			<p class="resume-cta">Come blow our minds.<br>Send your resume & chops today.</p>
			<a href="mailto:CAREERS@MODWORLDWIDE.COM?subject=<?php echo $title ?>" class="apply-btn btn">APPLY NOW</a>
	
		</li>
		<?php endwhile; // while has_sub_field('single_job_description') ): ?>
<?php endif; // if( get_field('single_job_description') ): ?>