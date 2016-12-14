<div class="container">
	<header> 
		<nav id="global-nav">
			<a href="#" class="toggle-menu">
				<span id="menu-toggle"></span>
				<span id="trigger"></span>
				<span id="burger"></span>
				<span class="nav-logo"></span>
			</a>
		</nav>
	</header>

	<ul id="career-list" class="career-categories-list">
		<li id="category-heading" class="career-category">What Do<br>You Do?</li>
		<a href="#client-services"><li class="career-category">Client Services</li></a>
		<a href="#creative"><li class="career-category">Creative</li></a>
		<a href="#film"><li class="career-category">Film</li></a>
		<a href="#strategy"><li class="career-category">Strategy</li></a>
		<a href="#web"><li class="career-category">Web</li></a>
		<a href="#operations"><li class="career-category">Operations</li></a>
		<a href="#internships"><li class="career-category">Internships</li></a>
	</ul>
	<img src="http://localhost/careers/wp-content/themes/MOD-Careers/assets/images/arrow.svg" alt="down arrow" id="arrow">
</div>
<section id="jobs">
	<ul id="jobs-list" role="main">

		<div id="client-services">
			<div class="container">
				<h1>Client<br>Services</h1>
				<?php include 'clientservices.php'; ?>
			</div>	
		</div>
	
			
				<?php include 'creative.php'; ?>
		

		<div id="film">
			<div class="container">
				<h1>Film</h1>
				<?php include 'film.php'; ?>
			</div>
		</div>
		<div id="strategy">
			<div class="container">
				<h1>Strategy</h1>
				<?php include 'strategy.php'; ?>
			</div>
		</div>
		<div id="web">
			<div class="container">
				<h1>Web</h1>
				<?php include 'web.php'; ?>
			</div>
		</div>
		<div id="operations">
			<div class="container">
				<h1>Operations</h1>
				<?php include 'operations.php'; ?>
			</div>
		</div>
		<div id="internships">
			<div class="container">
				<h1>Internships</h1>
				<?php include 'internship.php'; ?>
			</div>
		</div>

	</ul><!-- jobs list -->
</section>