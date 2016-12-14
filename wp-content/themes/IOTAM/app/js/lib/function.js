jQuery(document).ready(function($) {
	

	//Declaring Global Variables
	
		var slide = $('.slide'),
			mSlide = $('#M-slide'),
			oSlide = $('#O-slide'),
			dSlide = $('#D-slide'),
			contactSlide = $('#Contact-slide'),
			mPageBtn = $('#M-slide .slide-btn'),
			oPageBtn = $('#O-slide .slide-btn'),
			dPageBtn = $('#D-slide .slide-btn'),
			mod = $('#MOD-mask'),
			singleSlide = $('.single-slide-bg'),
			info = $('#M-slide .slide-info'),
			info2 = $('#O-slide .slide-info'),
			info3 = $('#D-slide .slide-info'),
			info4 = $('#Contact-slide .slide-info'),
			pagesContainer = $('#pages-container'),
			modPages = $('.page'),
			mPage = $('#M-page'),
			oPage = $('#O-page'),
			dPage = $('#D-page'),
			mSections = $('#M-page section'),
			oSections = $('#O-page section'),
			dSections = $('#D-page section'),
			mS1 = $('#M-page .sec-01'),
			mS2 = $('#M-page .sec-02'),
			oS1 = $('#O-page .sec-01'),
			oS2 = $('#O-page .sec-02'),
			oS3 = $('#O-page .sec-03'),
			oS4 = $('#O-page .sec-04'),
			dS1 = $('#D-page .sec-01'),
			dS2 = $('#D-page .sec-02'),
			dS3 = $('#D-page .sec-03'),
			pages = $('#pages-container'),
			videoBG = $('#video_background'),
			playBtn = $('#M-page .play-btn'),
			navBtn = $('#m-menu-btn'),
			tw = TweenLite,
			tm = TweenMax;
var status = 1;

	//Intro Animation

		// (function myLoop (i) {          
		//    setTimeout(function () {
		//       $('#gradient').attr('y2', i);
		//       console.log(i);          //  your code here                
		//       if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
		//    }, 25)
		// })(700); 

		function intro(){
			TweenMax.set('.initial-hide',{zIndex:1, display:'inherit', alpha:0});
			TweenMax.to('.initial-hide',1, {alpha:1, ease:Power1.easeInOut, delay:.5});
			tm.set(mod, {className:'+=slide-letters-in'});
			tm.set('#preloader', {className:'+=blur-out', delay:.5});
			tm.set(info, {className:'+=fade-info-in', delay:2});
			tm.set('header', {className:'slide-in', delay:2.2});

			setTimeout(function(){
				$('#preloader').detach();
				status=0;
			}, 2000);
		}
		
		var regIntro;
		function regIntroEnd() {
			regIntro = setTimeout(function(){ intro(); }, 16000);
		}

		regIntroEnd();


		$('#skip-intro').on('click', function(){
			clearTimeout(regIntro);
			intro();
		});


		

	// Additional Functions
	
		function pauseVideo(){
			$('#lorem-video').removeClass('is-in-color');
			var mediaElement = $('#lorem-video')[0]; 
			mediaElement.pause(); 
			mediaElement.currentTime = 0;
			tw.to(playBtn, 1, {alpha:1});
		}

		var memberScrollPos = 0;

		// $('.team').scroll(function() {
		//     var pos = $('.team').scrollTop();
		//     if (pos == 0) {
		//         memberScrollPos = 0;
		//     }
		// });
		// 
		
		var team = $('.team');

		team.on("scroll", function(e) {

			console.log($('.team')[0].scrollHeight);
			console.log(team.scrollTop() + " pixels");
			console.log(team.scrollTop() + $(window).outerHeight());
		    
		  if (team.scrollTop() + $(window).outerHeight() >= $('.team')[0].scrollHeight) {
		    memberScrollPos = 1;
		        console.log('Member Scroll Position:' + memberScrollPos);
		  } else if (team.scrollTop() - $(window).outerHeight() < 1){
		    memberScrollPos = 0;
		    console.log('Member Scroll Position:' + memberScrollPos);
		  }
		  
		});
		
	//Click Events
	
		mS2.click(function(){

			$('#M-page .video-section')[0].play();
			tw.to('#M-page .play-btn', 1.5, {alpha:0});

			var video = $(this).find('video');

			$('#lorem-video').addClass('is-in-color');

			video.on('ended',function(){
				pauseVideo();
				tm.set(mod, {className:'omask'});
				tm.set(mS2, {className:'sec-02 section is-previous-section', delay:.65});
				tm.set(oSlide, {className:'slide is-active-slide', delay:1});

				setTimeout(function(){
					tm.set(mSlide, {className:'slide make-previous is-inactive-slide'});
					tm.set(mPage, {className:'page make-previous is-previous'});
					info2.removeClass('fade-info-out').addClass('fade-info-in');
				}, 1500);
			});
		});

		$('#careers-link').on('click', function(){
			tw.to('#Contact-slide .slide-info', 1, {x: '-200%', y:.007, alpha:0, ease:Power1.easeInOut});
			tw.to('#Contact-slide .social-icons', 1, {x: '-200%', y:.007, alpha:0, ease:Power1.easeInOut});

			setTimeout(function(){
				location.href = 'careers/listings';
			}, 1000);
		});


	// Load video src and image source 
	
		$(window).load(function(){
			if (window.matchMedia("(max-width: 1024px)").matches){
				$('#video_background').detach();
				$('#img_background').css('backgroundImage', 'url(\'app/images/mod-backgroundhome.jpg\')');
			}
			else if (window.matchMedia("(min-width: 1025px)").matches){
				$('#img_background').detach();
			}
		});

	// Nav Toggle Animation 
		
		var clickedAgain = 0;

		function closeNav(){
			$('#menu').removeClass('open-nav').addClass('close-nav');
			$('#menu li:eq(0)').removeClass('show-nav-item-1').addClass('hide-nav-item-1');
			$('#menu li:eq(1)').removeClass('show-nav-item-2').addClass('hide-nav-item-2');
			$('#menu li:eq(2)').removeClass('show-nav-item-3').addClass('hide-nav-item-3');
			$('#menu li:eq(3)').removeClass('show-nav-item-4').addClass('hide-nav-item-4');

			setTimeout(function(){
				clickedAgain=0;
				$('#close-menu-btn').addClass('is-hidden');

				setTimeout(function(){
					status = 0;
				},2500);
			}, 1000);
		}

		$('#invisible-menu-btn, #menu-btn-rect, #m-menu-btn, #close-menu-btn').click(function(){

			if(clickedAgain == 0){
				status = 1;
				console.log(clickedAgain);
				$('#menu').removeClass('close-nav nav-is-inactive').addClass('open-nav');
				$('#menu li:eq(0)').removeClass('hide-nav-item-1').addClass('show-nav-item-1');
				$('#menu li:eq(1)').removeClass('hide-nav-item-2').addClass('show-nav-item-2');
				$('#menu li:eq(2)').removeClass('hide-nav-item-3').addClass('show-nav-item-3');
				$('#menu li:eq(3)').removeClass('hide-nav-item-4').addClass('show-nav-item-4');
				tm.set(navBtn, {className:"-=black-logo", delay:1});

				setTimeout(function(){
					clickedAgain=1;
					$('#close-menu-btn').removeClass('is-hidden');

				}, 1500);
				

			} else if(clickedAgain == 1){
				closeNav();
				setTimeout(function(){
					if(oS2.hasClass('is-current-section') || oS4.hasClass('is-current-section') || dS2.hasClass('is-current-section')) {
						tm.set(navBtn, {className:"+=black-logo", delay:1});
					}
				},3500);
				
			} 

		});


	//Ease the scrolling on all page links
		
		$(window).resize(function(){
			if ($(window).width() >= 768){
				  $(function() {
				    $('a[href*=#]:not([href=#])').on('click', (function() { //get the 'a' anchor with a # but not ones with only a #
				        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) { //is the location of the pathname & hostname = to this pathname & hostname?
				          var target = $(this.hash); //get the link; section id
				          target = target.length ? target : $('[name=' + this.hash.slice(1) +']'); //is the target length = to target? if not slice the target length down to 1
				          if (target.length) {
				            $('html,body').animate({
				              scrollTop: target.offset().top
				            }, 1000);
				            return false;
				          }
				        }
				    }));
				});
			}
		});

	
	//Set Slides to proper positions
	
//		$(window).on('load', function(){

				       
			// Check Slide Down Function
			
				function checkSlideDown(){

		      		//if a user slides down while on the M slide do this
		      		
					if(mSlide.hasClass('is-active-slide') && pagesContainer.hasClass('is-not-in-use')) {

						tm.set('.m-arrow',{className:'+=is-hidden'});
						tm.set(pagesContainer, {className:"is-in-use"});
						tm.set(mPage, {className:'+=is-current'});
						mod.removeClass('slide-letters-in').addClass('is-centered');
						tm.set(mS1, {className:'+=clear-transform fade-up', delay:.3});
						tm.set(mS1, {className:'section sec-01 fade-up', delay:.75});

						setTimeout(function(){
							tm.set(info, {className:'slide-info blur-info-left'});
							mod.removeClass('is-centered').addClass('move-to-M');
						},500);

						tm.set(mS2, {className:'+=is-current-section', delay:3.5});
						tm.set(mS1, {className:'sec-01 section is-previous-section', delay:5});
					}

					else if(mSlide.hasClass('is-active-slide') && mS2.hasClass('is-current-section')) {

						pauseVideo();
						tm.set(mod, {className:'omask'});
						tm.set(mS2, {className:'sec-02 section is-previous-section', delay:.65});
						tm.set(oSlide, {className:'slide is-active-slide', delay:1});

						setTimeout(function(){
							tm.set(mSlide, {className:'slide make-previous is-inactive-slide'});
							tm.set(mPage, {className:'page make-previous is-previous'});
							info2.removeClass('fade-info-out').addClass('fade-info-in');
						}, 1500);

					}

					else if(oSlide.hasClass('is-active-slide') && oS1.hasClass('is-next-section')) {

						tm.set(pagesContainer, {className:"is-in-use"});
						tm.set(oPage, {className:'page is-current'});
						tm.set(oS1, {className:'+=clear-transform fade-up', delay:.3});
						tm.set(oS1, {className:'section sec-01 fade-up', delay:.75});

						setTimeout(function(){
							tm.set(info2, {className:'slide-info blur-info-left'});
							mod.addClass('move-to-O');
						},500);

						tm.set(oS2, {className:'sec-02 section is-current-section', delay:3.5});
						tm.set(oS1, {className:'sec-01 section is-previous-section', delay:5});
						tm.set(navBtn, {className:"+=black-logo", delay:3.5});

					}

					else if(oSlide.hasClass('is-active-slide') && oS2.hasClass('is-current-section')) {

						tm.set(mod, {className:'+=is-hidden'});
						tm.set(oS2, {className:'sec-02 section is-previous-section', delay:.5});
						tm.set(oS3, {className:'sec-03 section is-current-section move-behind'});
						tm.set(navBtn, {className:"-=black-logo", delay:1});

					}

					else if(oSlide.hasClass('is-active-slide') && oS3.hasClass('is-current-section')) {
						
						tm.set(oS3, {className:'-=is-current-section', delay:1.5});
						tm.set(oS4, {className:'sec-04 section is-current-section', delay:.3});
						tm.set(navBtn, {className:"+=black-logo", delay:1});
						tm.set(mod, {className:'-=is-hidden', delay:2});

					}


					else if(oSlide.hasClass('is-active-slide') && oS4.hasClass('is-current-section')) {

				       	tm.set(mod, {className:'dmask'});
						tm.set(oS4, {className:'sec-04 section is-previous-section', delay:.65});
						tm.set(dSlide, {className:'slide is-active-slide', delay:1});
						tm.set(navBtn, {className:"-=black-logo", delay:1});

						setTimeout(function(){
							tm.set(oSlide, {className:'slide make-previous is-inactive-slide'});
							tm.set(oPage, {className:'page make-previous is-previous'});
							info3.removeClass('fade-info-out').addClass('fade-info-in');
						}, 1500);

					}

					else if(dSlide.hasClass('is-active-slide') && dS1.hasClass('is-next-section')) {

						tm.set(pagesContainer, {className:"is-in-use"});
						tm.set(dPage, {className:'page is-current'});
						tm.set(dS1, {className:'+=clear-transform fade-up', delay:.3});
						tm.set(dS1, {className:'section sec-01 fade-up', delay:.75});

						setTimeout(function(){
							tm.set(info3, {className:'slide-info blur-info-left'});
							mod.addClass('move-to-D');
						},500);

						tm.set(dS2, {className:'sec-02 section is-current-section', delay:3.5});
						tm.set(dS1, {className:'sec-01 section is-previous-section', delay:5});
						tm.set(navBtn, {className:"+=black-logo", delay:3.5});

					}

					else if(dSlide.hasClass('is-active-slide') && dS2.hasClass('is-current-section')) {

						tm.set(mod, {className:'+=is-hidden'});
						tm.set(dS2, {className:'sec-02 section is-previous-section', delay:.5});
						tm.set(dS3, {className:'sec-03 section is-current-section move-behind'});
						tm.set(navBtn, {className:"-=black-logo", delay:1});

					}

					else if(dSlide.hasClass('is-active-slide') && dS3.hasClass('is-current-section') && memberScrollPos == 1) {
						
						tm.set(mod, {className:'is-hidden'});
						tm.set('mod', {className:'is-hidden'});
						tm.set('.bg', {className:'+=is-hidden'});
						tm.set('.social-icons', {className:'-=is-hidden', delay:2});
						tm.set(oS3, {className:'sec-03 section move-behind is-previous-section'});
						tm.set(dS3, {className:'sec-03 section is-previous-section', delay:.65});
						tm.set(contactSlide, {className:'slide is-active-slide', delay:1});

						setTimeout(function(){
							tm.set(dSlide, {className:'slide make-previous is-inactive-slide'});
							tm.set(dPage, {className:'page make-previous is-previous'});
							info4.removeClass('fade-info-out').addClass('fade-info-in');
						}, 1500);

					}

			       	else {
			       		// do nothing
			       	}
		    	} 

			// Check Slide Up Function
				
				function checkSlideUp(){

			       	if(mSlide.hasClass('is-active-slide') && mS2.hasClass('is-current-section')){
						
						pauseVideo();
						tm.set(mS1, {className:'sec-01 section make-current is-current-section'});
						tm.set(mS2, {className:'sec-02 section is-next-section', delay:.3});

						tm.to(mS1, .75, {alpha:0, marginTop:'30px', ease:Power1.easeInOut, delay:1});
						tm.set(mS1, {className:'-=make-current is-current-section', alpha:0, delay:1.5});
						tm.set(mS1, {alpha:1, marginTop:'0px', delay:2.5});

						mod.removeClass('move-to-M').addClass('is-centered');

						setTimeout(function(){
							info.removeClass('blur-info-left').addClass('fade-info-in');
						},1500);

						setTimeout(function(){
							tm.set(pagesContainer, {className:"is-not-in-use"});
							tm.set(mPage, {className:'page'});
							tm.set(mS2, {className:'-=is-next-section'});
							tm.set('.m-arrow',{className:'-=is-hidden'});

						},2000);

			       	}


			       	if(oSlide.hasClass('is-active-slide') && oS1.hasClass('is-next-section')){

						info2.removeClass('fade-info-in').addClass('fade-info-out');
						tm.set(mPage, {className:'page is-current', delay:.5});
						tm.set(mS2, {className:'sec-02 section is-current-section', delay:.5});
	
						setTimeout(function(){
							tm.set(mSlide, {className:'slide is-active-slide'});
							tm.set(oSlide, {className:'slide is-inactive-slide'});
							tm.set(oPage, {className:'page is-next'});
							tm.set(mod, {className:'mmask'});
						}, 2000);

			       	}

			       	if(oSlide.hasClass('is-active-slide') && oS2.hasClass('is-current-section')) {

						tm.set(oS1, {className:'sec-01 section make-current is-current-section'});
						tm.set(oS2, {className:'sec-02 section is-next-section', delay:.3});

						tm.to(oS1, .75, {alpha:0, marginTop:'30px', ease:Power1.easeInOut, delay:1});
						tm.set(oS1, {className:'-=make-current is-current-section', alpha:0, delay:1.5});
						tm.set(oS1, {alpha:1, marginTop:'0px', delay:2.5});

						tm.set(navBtn, {className:"-=black-logo", delay:1});
						mod.removeClass('move-to-O');

						setTimeout(function(){
							info2.removeClass('blur-info-left').addClass('fade-info-in');
						},1500);

						setTimeout(function(){
							tm.set(oS1, {className:'sec-01 section is-next-section'});
							tm.set(oS2, {className:'sec-02 section is-next-section'});
						},2000);

			       	}

					if(oSlide.hasClass('is-active-slide') && oS3.hasClass('is-current-section')) {

						tm.set(oS3, {className:'+=move-behind'});
						tm.set(mod, {className:'-=is-hidden', delay:2});
						tm.set(oS2, {className:'sec-02 section is-current-section', delay:.3});
						tm.set(oS3, {className:'sec-03 section move-behind is-next-section', delay:1.3});
						tm.set(navBtn, {className:"+=black-logo", delay:1.3});

					}

					if(oSlide.hasClass('is-active-slide') && oS4.hasClass('is-current-section')) {
						tm.set(mod, {className:'+=is-hidden'});
						tm.set(oS3, {className:'sec-03 section is-current-section'});
						tm.set(oS4, {className:'sec-04 section is-next-section', delay:.75});
						tm.set(navBtn, {className:"-=black-logo", delay:1});

					}

					if(dSlide.hasClass('is-active-slide') && dS1.hasClass('is-next-section')) {

						info3.removeClass('fade-info-in').addClass('fade-info-out');
						tm.set(oS3, {className:'sec-03 section move-behind is-previous-section'});
						tm.set(oPage, {className:'page is-current', delay:.5});
						tm.set(oS4, {className:'sec-04 section is-current-section', delay:.5});
						tm.set(navBtn, {className:"+=black-logo", delay:1});
	
						setTimeout(function(){
							tm.set(oSlide, {className:'slide is-active-slide'});
							tm.set(dSlide, {className:'slide is-inactive-slide'});
							tm.set(dPage, {className:'page is-next'});
							tm.set(mod, {className:'omask'});
						}, 2000);

					}


					if(dSlide.hasClass('is-active-slide') && dS2.hasClass('is-current-section')) {
						
						tm.set(dS1, {className:'sec-01 section make-current is-current-section'});
						tm.set(dS2, {className:'sec-02 section is-next-section', delay:.3});

						tm.to(dS1, .75, {alpha:0, marginTop:'30px', ease:Power1.easeInOut, delay:1});
						tm.set(dS1, {className:'-=make-current is-current-section', alpha:0, delay:1.5});
						tm.set(dS1, {alpha:1, marginTop:'0px', delay:2.5});

						tm.set(navBtn, {className:"-=black-logo", delay:1});
						mod.removeClass('move-to-D');

						setTimeout(function(){
							info3.removeClass('blur-info-left').addClass('fade-info-in');
						},1500);

						setTimeout(function(){
							tm.set(dS1, {className:'sec-01 section is-next-section'});
							tm.set(dS2, {className:'sec-02 section is-next-section'});
						},2000);

			       	}

			       	else if(dSlide.hasClass('is-active-slide') && dS3.hasClass('is-current-section') && memberScrollPos == 0) {

						tm.set(mod, {className:'-=is-hidden', delay:2});
						tm.set(dS2, {className:'sec-02 section is-current-section', delay:.3});
						tm.set(dS3, {className:'sec-03 section move-behind', delay:.3});
						tm.set(dS3, {className:'sec-03 section move-behind is-next-section', delay:2});
						tm.set(navBtn, {className:"+=black-logo", delay:1.3});

					}
					else if(contactSlide.hasClass('is-active-slide')) {

						tm.set(dSlide, {className:'slide make-current is-active-slide'});
						tm.set(dPage, {className:'page make-current is-current'});
						tm.set(dS3, {className:'sec-03 section is-current-section'});
						info4.removeClass('fade-info-in').addClass('fade-info-out');

						

						setTimeout(function(){
							tm.set(mod, {className:'dmask'});
							tm.set('.bg', {className:'-=is-hidden'});
							tm.set('.social-icons', {className:'+=is-hidden', delay:1});
							tm.set(contactSlide, {className:'slide is-inactive-slide', delay:1});	
						}, 1500);

					}

			    }




		var hammertime = new Hammer( $( "body" )[ 0 ], {
		      domEvents: false
		    } );

		hammertime.on('swipeleft swipedown', function(e){
			checkSlideDown();

		});
		hammertime.on('swiperight swipeup', function(e){
			checkSlideUp();

		});

		// Get IE or Edge browser version
	    var version = detectIE();

	    if (version === false) {
	      $('html').removeClass('ie10');
	    } else if (version >= 12) {
	      // $('body').attr('onmousewheel', 'move()');
	      $('html').addClass('ie10');
	      $('#map').replaceWith( "<img id='map' src='app/images/dotted-map.svg'>" );
	    } else {
	      // alert('You are using IE 10');
	      $('html').addClass('ie10');
	      $('#map').replaceWith( "<img id='map' src='app/images/dotted-map.svg'>" );
	      // $('body').attr('onmousewheel', 'move()');
	    };

	    // add details to debug result
	    // document.getElementById('').innerHTML = window.navigator.userAgent;

	    /**
	     * detect IE
	     * returns version of IE or false, if browser is not Internet Explorer
	     */
	    function detectIE() {
	      var ua = window.navigator.userAgent;

	      var msie = ua.indexOf('MSIE ');
	      if (msie > 0) {
	        // IE 10 or older => return version number
	        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	      }

	      var trident = ua.indexOf('Trident/');
	      if (trident > 0) {
	        // IE 11 => return version number
	        var rv = ua.indexOf('rv:');
	        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	      }

	      var edge = ua.indexOf('Edge/');
	      if (edge > 0) {
	        // Edge (IE 12+) => return version number
	        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	      }

	      // other browser
	      return false;
	    };

		var isMobile = {
	        detectMobile: function() {
	            return navigator.userAgent.match(/Mobi/i);
	        }
	    }

    // Stop Scroll / Key Backup

    

        if ($('html').hasClass('ie10')) {
        

                $('body').bind('mousewheel keydown swipe', function(e) {

                    if (status === 0 && $('#menu').hasClass('nav-is-inactive') && !$('#news-events').hasClass('event-is-active')) {
                        
                        if(e.deltaY < 0 || e.keyCode === 40  || e.keyCode === 39) {
                            console.log(e.deltaY);
                            status=1;
                            checkSlideDown();
                            setTimeout(function(){

                                status=0;
                            },2000);


                        } else if(e.deltaY > 0 || e.keyCode === 38  || e.keyCode === 37){

                            status = 1;
                            checkSlideUp();

                            setTimeout(function(){

                                status=0;
                            },2000);

                        } else {
                            status = 1;
                            checkSlideUp();

                            setTimeout(function(){

                                status=0;
                            },2000);
                        }
                        return false;

                    } else if (status > 0){
                        //do nothing
                        // console.log('waiting');
                    }


            });

        } 
        else if(/Firefox/i.test(navigator.userAgent)){

                $('body').bind('DOMMouseScroll keydown swipe', function(e) {

                var delta = e.detail < 0 || e.wheelDelta > 0 ? 1: -1;

                    if (status === 0 && $('#menu').hasClass('nav-is-inactive') && !$('#news-events').hasClass('event-is-active')) {
                        
                        if(delta < 0 || e.keyCode === 40  || e.keyCode === 39) {

                            status=1;
                            checkSlideDown();
                            setTimeout(function(){

                                status=0;
                            },2000);


                            

                        } else if(e.keyCode === 38  || e.keyCode === 37){

                            status = 1;
                            checkSlideUp();

                            setTimeout(function(){

                                status=0;
                            },2000);

                        } else {
                            status = 1;
                            checkSlideUp();

                            setTimeout(function(){

                                status=0;
                            },2000);
                        }

                    } else if (status > 0){
                        //do nothing
                        console.log('waiting');
                    }

            });
        } else {

            $('body').bind('mousewheel keydown swipe', function(e) {

                if (status === 0 && !$('#menu').hasClass('open-nav')) {
                    
                    if(e.originalEvent.wheelDelta / 120 > 0 || e.keyCode === 38  || e.keyCode === 37 || $('body').hasClass('swiped-left')) {

                        status = 1;
                        checkSlideUp();

                        setTimeout(function(){

                            status=0;
                        },4000);

                    } else if(e.originalEvent.wheelDelta / 120 < 0 || e.keyCode === 40  || e.keyCode === 39){

                        status=1;
                        checkSlideDown();
                        setTimeout(function(){

                            status=0;
                        },4000);

                    } else {

                    }

                } else if (status > 0){
                    //do nothing
                    console.log('waiting');
                }
            });
        };

    

    var touchReg = false;

    // define a function...
    function checkIOSVersion() {
        if (/iPhone/.test(navigator.userAgent) && !window.MSStream && window.orientation !== 0 && $(window).innerWidth() >= 414 && $(window).innerWidth() <= 736) {
            console.log('you are using an iPhone Plus');
            $('html').addClass('iPhone-Plus');

        } else{
            console.log('you are using an iPhone');
            $('html').removeClass('iPhone-Plus');
        }
    }

    if( isMobile.detectMobile() && !$('html').hasClass('iPhone-Plus')) {

    	$('#video-bg').detach();
    	$('.bg').addClass('mobile-bg');

        
        var ts;
        $('body').bind('touchstart', function (event){
           ts = event.originalEvent.touches[0].clientY;
        });


        $('body').bind('touchmove', function (event){

           var te = event.originalEvent.changedTouches[0].clientY;

           if (touchReg == false && status === 0  && !$('#menu').hasClass('open-nav')) {

                $(this).on('touchend touchcancel', function(){
                    touchReg = false;
                });

                if (ts > te+5){

                    touchReg = true;
                    status = 1;
                    counterSlide = 1;
                    checkSlideDown();

                    setTimeout(function(){
                        status=0;
                    },4000);

                } else if (ts < te-5) {

                  touchReg = true;
                  status = 1;
                  checkSlideUp();

                  setTimeout(function(){
                    status=0;
                  },4000);

               }
            
            } else if (status > 0){
                //do nothing
                console.log('waiting');
            }
        });
    };

			
//});


	//Hover Events

		$('.menu-item-number:eq(0), .menu-item-title:eq(0)').click(function(){
			// alert('was clicked');
			
			
			if(oSlide.hasClass('is-active-slide') || mS2.hasClass('is-current-section') || dSlide.hasClass('is-active-slide') || contactSlide.hasClass('is-active-slide')){
				tm.set('.social-icons', {className:'+=is-hidden', delay:1});
				tm.set('.m-arrow',{className:'-=is-hidden'});
				tm.set('.bg', {className:'-=is-hidden'});
				tm.set(mod, {className:'mmask'});
				tm.set(oPage, {className:'page is-next'});
				tm.set(dPage, {className:'page is-next'});
				tm.set(oSections, {className:'-=is-current-section is-previous-section'});
				tm.set(dSections, {className:'-=is-current-section is-previous-section'});
				tm.set(mSlide, {className:'slide is-active-slide'});
				tm.set(oSlide, {className:'slide is-inactive-slide'});
				tm.set(dSlide, {className:'slide is-inactive-slide'});
				tm.set(contactSlide, {className:'slide is-inactive-slide'});
				tm.set(info, {className:'slide-info'});
				tm.set(info2, {className:'slide-info'});
				tm.set(info3, {className:'slide-info'});
				tm.set(info4, {className:'slide-info'});
				tm.set(oSections, {className:'+=is-next-section', delay:.3});
				tm.set(dSections, {className:'+=is-next-section', delay:.3});

				tm.set('#menu li:not(:eq(0))', {className:'+=is-disabled'});
				tm.set('#menu li:not(:eq(0))', {className:'-=is-disabled', delay:4});
				tm.set('#menu li:eq(0)', {className:'+=is-chosen'});
				tm.set('#menu li:eq(0)', {className:'-=is-chosen', delay:4});

				setTimeout(function(){
					closeNav();
					navBtn.removeClass("black-logo");
				}, 1000);

				tm.set(mS1, {className:'sec-01 section make-current is-current-section'});
				tm.set(mS2, {className:'sec-02 section is-next-section', delay:.3});

				tm.set(mS1, {className:'-=make-current is-current-section', delay:1.5});
				mod.removeClass('move-to-M').addClass('is-centered');

				setTimeout(function(){
					info.removeClass('blur-info-left').addClass('fade-info-in');
				},1500);

				setTimeout(function(){
					tm.set(pagesContainer, {className:"is-not-in-use"});
					tm.set(mPage, {className:'page'});
					tm.set(mS2, {className:'-=is-next-section'});
					clickedAgain=0;
				},2000);

	       	} else{
	       		$('#close-menu-btn').trigger('click');
	       	}
		});

		$('.menu-item-number:eq(1), .menu-item-title:eq(1)').click(function(){


			if(mSlide.hasClass('is-active-slide') || $('#O-page .section:not(".sec-01")') || dSlide.hasClass('is-active-slide') || contactSlide.hasClass('is-active-slide')){
				tm.set('.social-icons', {className:'+=is-hidden', delay:1});
				tm.set('.m-arrow',{className:'+=is-hidden'});
				tm.set('.bg', {className:'-=is-hidden'});
				tm.set(mod, {className:'omask'});
				tm.set(mPage, {className:'page make-previous is-previous'});
				tm.set(oPage, {className:'page is-next'});
				tm.set(dPage, {className:'page is-next'});
				mSections.removeClass('is-current-section is-previous-section is-next-section');
				oSections.removeClass('is-current-section is-previous-section is-next-section');
				dSections.removeClass('is-current-section is-previous-section is-next-section');
				tm.set(mSlide, {className:'slide is-inactive-slide'});
				tm.set(oSlide, {className:'slide is-active-slide'});
				tm.set(dSlide, {className:'slide is-inactive-slide'});
				tm.set(contactSlide, {className:'slide is-inactive-slide'});
				tm.set(info, {className:'slide-info'});
				tm.set(info2, {className:'slide-info'});
				tm.set(info3, {className:'slide-info'});
				tm.set(info4, {className:'slide-info'});
				tm.set(oSections, {className:'+=is-next-section', delay:.3});
				tm.set(mSections, {className:'+=is-previous-section', delay:.3});
				tm.set(dSections, {className:'+=is-next-section', delay:.3});

				tm.set('#menu li:not(:eq(1))', {className:'+=is-disabled'});
				tm.set('#menu li:not(:eq(1))', {className:'-=is-disabled', delay:4});
				tm.set('#menu li:eq(1)', {className:'+=is-chosen'});
				tm.set('#menu li:eq(1)', {className:'-=is-chosen', delay:4});

				setTimeout(function(){
					closeNav();
					navBtn.removeClass("black-logo");
				}, 1000);

				
				mod.removeClass('move-to-O');

				setTimeout(function(){
					info2.removeClass('blur-info-left').addClass('fade-info-in');
					clickedAgain=0;
				},1500);

	       	} else{
	       		$('#close-menu-btn').trigger('click');
	       	}
		});

		$('.menu-item-number:eq(2), .menu-item-title:eq(2)').click(function(){

			if(mSlide.hasClass('is-active-slide') || $('#D-page .section:not(".sec-01")') || oSlide.hasClass('is-active-slide') || contactSlide.hasClass('is-active-slide')){
				tm.set('.social-icons', {className:'+=is-hidden', delay:1});
				tm.set('.m-arrow',{className:'+=is-hidden'});
				tm.set('.bg', {className:'-=is-hidden'});
				tm.set(mod, {className:'dmask'});
				tm.set(mPage, {className:'page make-previous is-previous'});
				tm.set(oPage, {className:'page make-previous is-previous'});
				tm.set(dPage, {className:'page is-next'});
				mSections.removeClass('is-current-section is-previous-section is-next-section');
				oSections.removeClass('is-current-section is-previous-section is-next-section');
				dSections.removeClass('is-current-section is-previous-section is-next-section');
				tm.set(mSlide, {className:'slide is-inactive-slide'});
				tm.set(oSlide, {className:'slide is-inactive-slide'});
				tm.set(dSlide, {className:'slide is-active-slide'});
				tm.set(contactSlide, {className:'slide is-inactive-slide'});
				tm.set(info, {className:'slide-info'});
				tm.set(info2, {className:'slide-info'});
				tm.set(info3, {className:'slide-info'});
				tm.set(info4, {className:'slide-info'});
				tm.set(oSections, {className:'+=is-previous-section', delay:.5});
				tm.set(mSections, {className:'+=is-previous-section', delay:.5});
				tm.set(dSections, {className:'+=is-next-section', delay:1});

				tm.set('#menu li:not(:eq(2))', {className:'+=is-disabled'});
				tm.set('#menu li:not(:eq(2))', {className:'-=is-disabled', delay:4});
				tm.set('#menu li:eq(2)', {className:'+=is-chosen'});
				tm.set('#menu li:eq(2)', {className:'-=is-chosen', delay:4});

				setTimeout(function(){
					closeNav();
					navBtn.removeClass("black-logo");
				}, 1000);

				tm.set(dS1, {className:'sec-01 section make-current is-current-section'});
				tm.set(dS2, {className:'sec-02 section is-next-section', delay:.3});

				tm.set(dS1, {className:'-=make-current is-current-section', delay:1.5});
				
				mod.removeClass('move-to-D');

				setTimeout(function(){
					info3.removeClass('blur-info-left').addClass('fade-info-in');
					clickedAgain=0;
				},1500);

	       	} else{
	       		$('#close-menu-btn').trigger('click');
	       	}
		});

		$('.menu-item-number:eq(3), .menu-item-title:eq(3)').click(function(){

			if(mSlide.hasClass('is-active-slide') || oSlide.hasClass('is-active-slide') || dSlide.hasClass('is-active-slide')){
				tm.set('.m-arrow',{className:'+=is-hidden'});
				tm.set(mod, {className:'is-hidden'});
				tm.set(mPage, {className:'page make-previous is-previous'});
				tm.set(oPage, {className:'page make-previous is-previous'});
				tm.set(dPage, {className:'page make-previous is-previous'});
				mSections.removeClass('is-current-section is-previous-section is-next-section');
				oSections.removeClass('is-current-section is-previous-section is-next-section');
				dSections.removeClass('is-current-section is-previous-section is-next-section');
				tm.set(mSlide, {className:'slide is-inactive-slide'});
				tm.set(oSlide, {className:'slide is-inactive-slide'});
				tm.set(dSlide, {className:'slide is-inactive-slide'});
				tm.set(contactSlide, {className:'slide is-active-slide'});
				tm.set(info, {className:'slide-info'});
				tm.set(info2, {className:'slide-info'});
				tm.set(info3, {className:'slide-info'});
				tm.set(info4, {className:'slide-info'});
				tm.set(oSections, {className:'+=is-previous-section', delay:.5});
				tm.set(mSections, {className:'+=is-previous-section', delay:.5});
				tm.set(dSections, {className:'+=is-previous-section', delay:1});

				tm.set('#menu li:not(:eq(3))', {className:'+=is-disabled'});
				tm.set('#menu li:not(:eq(3))', {className:'-=is-disabled', delay:4});
				tm.set('#menu li:eq(3)', {className:'+=is-chosen'});
				tm.set('#menu li:eq(3)', {className:'-=is-chosen', delay:4});

				setTimeout(function(){
					closeNav();
					navBtn.removeClass("black-logo");
				}, 1000);

				tm.set('.bg', {className:'+=is-hidden'});
				tm.set('.social-icons', {className:'-=is-hidden', delay:2});
				tm.set(oS3, {className:'sec-03 section move-behind is-previous-section'});
				tm.set(dS3, {className:'sec-03 section is-previous-section', delay:.65});
				tm.set(contactSlide, {className:'slide is-active-slide', delay:1});

				setTimeout(function(){
					tm.set(dSlide, {className:'slide make-previous is-inactive-slide'});
					tm.set(dPage, {className:'page make-previous is-previous'});
					info4.removeClass('fade-info-out').addClass('fade-info-in');
					clickedAgain=0;
				},1500);

	       	} else{
	       		$('#close-menu-btn').trigger('click');
	       	}

		});

});