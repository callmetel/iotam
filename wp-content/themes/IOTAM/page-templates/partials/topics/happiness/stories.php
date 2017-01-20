<div id="happiness-stories" class="stories-grid">
    <ul class="stories-container">
        <li class="mobile-top-square">
            <div class="relative-container">
                <div class="top-square-container">
                    <h2>Happiness</h2>
                    <div class="underline"></div>
                    <p>Finding people to talk to and connect with to overcome&nbsp;depression</p>
                </div>
            </div>
        </li>
        
        <?php query_posts('cat=2'); while (have_posts()) : the_post(); ?>
            <?php
                //get variables 
                $name = get_post_meta(get_the_ID(), 'first_name', true);
                $city = get_post_meta(get_the_ID(), 'city', true);
                $state = get_post_meta(get_the_ID(), 'state', true);
                $separator = ', ';
            ?>
            <li class="story">
                <div class="individual-story-container">
                    <h3 class="name"><?php echo $name; ?><span class="location"><?php echo $city,$separator,$state ?></span></h3>
                    <p><?php the_excerpt(); ?></p>
                    <p class="reveal hide"><?php the_content(); ?></p>
                    <button class="read-more-btn">Read more <span></span></button> 
                </div>
            </li>

        <?php endwhile; ?>
        
        <?php wp_reset_query(); ?>

        <li class="story last-story">
            <div class="individual-story-container"><button class="back-to-top-btn">Back to top <span></span></button><button class="more-stories-btn">View more<br>stories <span></span></button>
                <p class="story-counter"><span class="count"><?php $term = get_term( 2, 'category' ); $count = $term->count; echo $count; ?></span> Stories</p>
            </div>
        </li>
    </ul>
    <div class="story-lightbox"><button class="close-story">Close Story</button></div>
    <div class="lightbox-dimmer"></div>
</div>
