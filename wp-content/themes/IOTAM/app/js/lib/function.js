$(document).ready(function() {

	// Get IE or Edge browser version
	    var version = detectIE();

	    if (version === false) {
	      $('html').removeClass('IE');
	    } 
	    else if (version >= 12) {
	    	 console.log('You are using IE');
	      $('html').addClass('IE');
	    } 
	    else {
	      console.log('You are using IE');
	      $('html').addClass('IE');
	    };

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

	// Declaring Global Variables
	
		var colorBlock = $('.site-transition'),
			tw = TweenLite,
			tm = TweenMax,
			status = 1,
			videoPlay = 0,
			introvid = document.querySelector('#teaser-video'),
			happinessvid1 = document.querySelector('#beingtherematters'),
			happinessvid2 = document.querySelector('#livingforthursdays'),
			happinessvid3 = document.querySelector('#newmomsarentalone'),
			connectionvid1 = document.querySelector('#workingouttogether'),
			connectionvid2 = document.querySelector('#powerofapet'),
			peacevid1 = document.querySelector('#dealingwithstress'),
			peacevid2 = document.querySelector('#spaceforwellness'),
			confidencevid1 = document.querySelector('#overcomingbullying'),
			confidencevid2 = document.querySelector('#improvingselfesteem'),
			freedomvid = document.querySelector('#overcomingaddiction');

		var homePage = $('.content-container').detach();

		var isMobile = {
            detectMobile: function() {
                return navigator.userAgent.match(/Mobi/i);
            }
        };

	// Check if intro video loaded and start intro
	
	    function checkLoad() {
	        if (introvid.readyState === 4) {
	        	// alert('ready');
	        	playVideo();
	        	$('body').removeClass('initial-hide');
	            regIntroEnd();
	            setTimeout(function(){
	            	$('.site-container').removeClass('initial-hide');
	            },500);
	        } else {
	             setTimeout(checkLoad, 100);
	             console.log('checking');
	        }
	    }
	    checkLoad();

	    if(!isMobile.detectMobile()){
		    function refreshOnSlowLoad(){
		    	setTimeout(function(){
		    		if(introvid.readyState !== 4){
			    		clearTimeout(checkLoad);
			    		location.reload();
			    	}
		    	},3000);
		    }
	    	refreshOnSlowLoad();
	    };

	    function playVideo() {
		    if(isMobile.detectMobile() ){
		    	$('body').removeClass('initial-hide').addClass('fade-in');	
		    }
		    else{
			    $('#teaser-video')[0].play();
			}
		}

	// Intro Animation

		function intro(){
			colorBlock.addClass('is-transitioning to-home');
			tm.set('#preloader', {className:'+=blur-out', delay:.5});
			tm.set('nav', {className:'-=initial-hide', delay:1});
			tm.set('header', {className:'+=is-on-screen-Y', delay:1});
			$('#site-container').removeClass('hide');

			setTimeout(function(){
				$('#preloader').detach();
				colorBlock.removeClass('is-transitioning');
				status=0;
			}, 2000);
		}
		
		var regIntro;
		function regIntroEnd() {
			regIntro =  setTimeout(function(){
				intro();
			}, 30000);
		}
		var scrollstart=0;

	// Change IDs for Checkboxes & Submit
		
		$('#connection-video-page .share-form .checkbox-field > input').attr('id', 'checkbox2');
		$('#connection-video-page .share-form .checkbox-field > label').attr('for', 'checkbox2');
		$('#connection-video-page .share-form .submit > input').attr('id', 'connection-submit');

		$('#peaceofmind-video-page .share-form .checkbox-field > input').attr('id', 'checkbox3');
		$('#peaceofmind-video-page .share-form .checkbox-field > label').attr('for', 'checkbox3');
		$('#peaceofmind-video-page .share-form .submit > input').attr('id', 'peaceofmind-submit');

		$('#confidence-video-page .share-form .checkbox-field > input').attr('id', 'checkbox4');
		$('#confidence-video-page .share-form .checkbox-field > label').attr('for', 'checkbox4');
		$('#confidence-video-page .share-form .submit > input').attr('id', 'confidence-submit');

		$('#freedom-video-page .share-form .checkbox-field > input').attr('id', 'checkbox5');
		$('#freedom-video-page .share-form .checkbox-field > label').attr('for', 'checkbox5');
		$('#freedom-video-page .share-form .submit > input').attr('id', 'freedom-submit');

	// Disable Site Transition on Resize
		
		$(window).resize(function(){
			$('.site-transition').addClass('has-not-transition');
			setTimeout(function(){
				$('.site-transition').removeClass('has-not-transition');
			},3000);
		});

	// Keydown Video Page Functions
	
		function keypressSlideDown(){
			if ($('#happiness-video-page').hasClass('video-page-is-active')){
            	happinessSlideDown();
            }
            else if ($('#connection-video-page').hasClass('video-page-is-active')){
            	connectionSlideDown();
            }
       		else if ($('#peaceofmind-video-page').hasClass('video-page-is-active')){
            	peaceSlideDown();
            }
            else if ($('#confidence-video-page').hasClass('video-page-is-active')){
            	confidenceSlideDown();
            }
            else if ($('#freedom-video-page').hasClass('video-page-is-active')){
            	freedomSlideDown();
            };
		}

		function keypressSlideUp(){
			if ($('#happiness-video-page').hasClass('video-page-is-active')){
            	happinessSlideUp();
            }
            else if ($('#connection-video-page').hasClass('video-page-is-active')){
            	connectionSlideUp();
            }
       		else if ($('#peaceofmind-video-page').hasClass('video-page-is-active')){
            	peaceSlideUp();
            }
            else if ($('#confidence-video-page').hasClass('video-page-is-active')){
            	confidenceSlideUp();
            }
            else if ($('#freedom-video-page').hasClass('video-page-is-active')){
            	freedomSlideUp();
            };
		}

	// Bind Page Function
	
		function bindPage(){
			scrollstart=1;
			$(this).addClass('selected');
			$(this).siblings().removeClass('selected');
			$('.slide-1').removeClass('is-inactive-slide');
			$('.slide-2').removeClass('is-active-slide');

			setTimeout(function(){
				var status=0,
					touchReg = false,
					keypress = false;

				if( isMobile.detectMobile() ){
					var ts;
			        $('body').bind('touchstart', function (event){
			           ts = event.originalEvent.touches[0].clientY;
			        });


			        $('body').bind('touchmove', function (event){

			           var te = event.originalEvent.changedTouches[0].clientY;

			           if (touchReg == false && status === 0) {

			                $(this).on('touchend touchcancel', function(){
			                    touchReg = false;
			                });

			                if (ts > te+175){

			                    touchReg = true;
			                    status = 1;
			                    counterSlide = 1;
			                    if ($('#happiness-video-page').hasClass('video-page-is-active')){
	                            	happinessSlideDown();
	                            }
	                            else if ($('#connection-video-page').hasClass('video-page-is-active')){
	                            	connectionSlideDown();
	                            }
	                       		else if ($('#peaceofmind-video-page').hasClass('video-page-is-active')){
	                            	peaceSlideDown();
	                            }
	                            else if ($('#confidence-video-page').hasClass('video-page-is-active')){
	                            	confidenceSlideDown();
	                            }
	                            else if ($('#freedom-video-page').hasClass('video-page-is-active')){
	                            	freedomSlideDown();
	                            };

			                    setTimeout(function(){
			                        status=0;
			                        scrollstart=0;
			                    },850);

			                } else if (ts < te-175) {

			                  touchReg = true;
			                  status = 1;
			                  if ($('#happiness-video-page').hasClass('video-page-is-active')){
	                            	happinessSlideUp();
	                            }
	                            else if ($('#connection-video-page').hasClass('video-page-is-active')){
	                            	connectionSlideUp();
	                            }
	                       		else if ($('#peaceofmind-video-page').hasClass('video-page-is-active')){
	                            	peaceSlideUp();
	                            }
	                            else if ($('#confidence-video-page').hasClass('video-page-is-active')){
	                            	confidenceSlideUp();
	                            }
	                            else if ($('#freedom-video-page').hasClass('video-page-is-active')){
	                            	freedomSlideUp();
	                            };

			                  setTimeout(function(){
			                    status=0;
			                    scrollstart=0;
			                  },850);

			               }
			            
			            } else if (status > 0){
			                //do nothing
			                console.log('waiting');
			            }
			        });
	            } else{
	            	$('body').bind('mousewheel', function(e) {
						console.log('working');
						var currentY = e.deltaY;
						var detail = e.originalEvent.wheelDelta;
						console.log('currentY: ' + currentY);
						console.log('wheel delta: ' + detail);

	                    if (status === 0 && !$('.select-dropdown').hasClass('dropdown-active') && !$('.story-lightbox').hasClass('is-shown') && !$('#menu').hasClass('is-on-screen-X')) {
	                        
	                        if(currentY < 0) {
	                            console.log(e.deltaY);
	                            status=1;

	                            if ($('#happiness-video-page').hasClass('video-page-is-active')){
	                            	happinessSlideDown();
	                            }
	                            else if ($('#connection-video-page').hasClass('video-page-is-active')){
	                            	connectionSlideDown();
	                            }
	                       		else if ($('#peaceofmind-video-page').hasClass('video-page-is-active')){
	                            	peaceSlideDown();
	                            }
	                            else if ($('#confidence-video-page').hasClass('video-page-is-active')){
	                            	confidenceSlideDown();
	                            }
	                            else if ($('#freedom-video-page').hasClass('video-page-is-active')){
	                            	freedomSlideDown();
	                            };
	                            
	                            setTimeout(function(){
	                                status=0;
	                            },2000);

	                        } else if(e.deltaY > 0 /*(e.keyCode === 38 && !$('.share-form input').is(':focus'))*/ ){

	                            status = 1;
	                            if ($('#happiness-video-page').hasClass('video-page-is-active')){
	                            	happinessSlideUp();
	                            }
	                            else if ($('#connection-video-page').hasClass('video-page-is-active')){
	                            	connectionSlideUp();
	                            }
	                       		else if ($('#peaceofmind-video-page').hasClass('video-page-is-active')){
	                            	peaceSlideUp();
	                            }
	                            else if ($('#confidence-video-page').hasClass('video-page-is-active')){
	                            	confidenceSlideUp();
	                            }
	                            else if ($('#freedom-video-page').hasClass('video-page-is-active')){
	                            	freedomSlideUp();
	                            };

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
			}, 500);
		}

	// Detach Pages
		
		function detachHomePage(){
			var homePage = $('.content-container').detach();
		}

		function detachVideoPages(){
			var videoPages = $('.sub-content-container').detach();
		}

	// Attach Pages
		
		function attachHomePage(){
			$('.site-container').prepend(homePage); 
		}

		attachHomePage();

		function attachVideoPages(){
			$('#resources').before(videoPages); 
		}

	// Each Pages Start Function

		function startHappinessPage(){
			colorBlock.removeClass('to-home to-connection to-peace to-confidence to-freedom').addClass('is-transitioning to-happiness');
			// attachVideoPages();
			bindPage();
			setTimeout(function(){
				$('.video-page').removeClass('video-page-is-active');
				$('.content-container, #resources').removeClass('is-active-section').addClass('is-inactive-section');
				$('.sub-content-container').removeClass('is-inactive-section').addClass('is-active-section');
				$('#happiness-video-page .section-2, #happiness-video-page .section-3').removeClass('is-current-section is-previous-section').addClass('is-next-section');
				$('#happiness-video-page .section-1').removeClass('is-next-section is-previous-section').addClass('is-current-section');
				$('#happiness-video-page').addClass('video-page-is-active');
			},850);

			setTimeout(function(){
				colorBlock.removeClass('is-transitioning');
				detachHomePage();
			},1800);
		}

		function startConnectionPage(){
			colorBlock.removeClass('to-home to-happiness to-peace to-confidence to-freedom').addClass('is-transitioning to-connection');
			// attachVideoPages();
			bindPage();
			setTimeout(function(){
				$('.video-page').removeClass('video-page-is-active');
				$('.content-container, #resources').removeClass('is-active-section').addClass('is-inactive-section');
				$('.sub-content-container').removeClass('is-inactive-section').addClass('is-active-section');
				$('#connection-video-page .section-2, #connection-video-page .section-3').removeClass('is-current-section is-previous-section').addClass('is-next-section');
				$('#connection-video-page .section-1').removeClass('is-next-section is-previous-section').addClass('is-current-section');
				$('#connection-video-page').addClass('video-page-is-active');
			},850);
			setTimeout(function(){
				colorBlock.removeClass('is-transitioning');
				detachHomePage();
			},1800);
		}

		function startPeacePage(){
			colorBlock.removeClass('to-home to-happiness to-connection to-confidence to-freedom').addClass('is-transitioning to-peace');
			// attachVideoPages();
			bindPage();
			setTimeout(function(){
				$('.video-page').removeClass('video-page-is-active');
				$('.content-container, #resources').removeClass('is-active-section').addClass('is-inactive-section');
				$('.sub-content-container').removeClass('is-inactive-section').addClass('is-active-section');
				$('#peaceofmind-video-page .section-2, #connection-video-page .section-3').removeClass('is-current-section is-previous-section').addClass('is-next-section');
				$('#peaceofmind-video-page .section-1').removeClass('is-next-section is-previous-section').addClass('is-current-section');
				$('#peaceofmind-video-page').addClass('video-page-is-active');
			},850);
			setTimeout(function(){
				colorBlock.removeClass('is-transitioning');
				detachHomePage();
			},1800);
		}

		function startConfidencePage(){
			colorBlock.removeClass('to-home to-happiness to-connection to-peace to-freedom').addClass('is-transitioning to-confidence');
			// attachVideoPages();
			bindPage();
			setTimeout(function(){
				$('.video-page').removeClass('video-page-is-active');
				$('.content-container, #resources').removeClass('is-active-section').addClass('is-inactive-section');
				$('.sub-content-container').removeClass('is-inactive-section').addClass('is-active-section');
				$('#confidence-video-page .section-2, #connection-video-page .section-3').removeClass('is-current-section is-previous-section').addClass('is-next-section');
				$('#confidence-video-page .section-1').removeClass('is-next-section is-previous-section').addClass('is-current-section');
				$('#confidence-video-page').addClass('video-page-is-active');
			}, 850);
			setTimeout(function(){
				colorBlock.removeClass('is-transitioning');
				detachHomePage();
			},1800);
		}

		function startFreedomPage(){
			colorBlock.removeClass('to-home to-happiness to-connection to-peace to-confidence').addClass('is-transitioning to-freedom');
			// attachVideoPages();
			bindPage();
			setTimeout(function(){
				$('.video-page').removeClass('video-page-is-active');
				$('.content-container, #resources').removeClass('is-active-section').addClass('is-inactive-section');
				$('.sub-content-container').removeClass('is-inactive-section').addClass('is-active-section');
				$('#freedom-video-page .section-2, #connection-video-page .section-3').removeClass('is-current-section is-previous-section').addClass('is-next-section');
				$('#freedom-video-page .section-1').removeClass('is-next-section is-previous-section').addClass('is-current-section');
				$('#freedom-video-page').addClass('video-page-is-active');
			}, 850);
			setTimeout(function(){
				colorBlock.removeClass('is-transitioning');
				detachHomePage();
			},1800);
		}

	// Dropdown Click Events

		$("#happiness-dropdown > li > ul > li:eq(0)").on('click', function(){
			if($('#happiness-video-page.video-page-is-active .page-1').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// // //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startHappinessPage();
				$('body').addClass('is-not-scrollable');
				setTimeout(function(){
					$("#happiness-video-page .dot-1").trigger("click");
				});
			}
		});

		$("#happiness-dropdown > li > ul > li:eq(1)").on('click', function(){
			if($('#happiness-video-page.video-page-is-active .page-2').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// // //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startHappinessPage();
				$('body').addClass('is-not-scrollable');
				setTimeout(function(){
					$("#happiness-video-page .dot-2").trigger("click");
				});
			}
		});

		$("#happiness-dropdown > li > ul > li:eq(2)").on('click', function(){
			if($('#happiness-video-page.video-page-is-active .page-3').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// // //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startHappinessPage();
				$('body').addClass('is-not-scrollable');
				setTimeout(function(){
					$("#happiness-video-page .dot-3").trigger("click");

				});
			}
		});

		$("#connection-dropdown > li > ul > li:eq(0)").on('click', function(){
			if($('#connection-video-page.video-page-is-active .page-1').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startConnectionPage();
				$('body').addClass('is-not-scrollable');
				setTimeout(function(){
					$("#connection-video-page .dot-1").trigger("click");
				});
			}
		});

		$("#connection-dropdown > li > ul > li:eq(1)").on('click', function(){
			if($('#connection-video-page.video-page-is-active .page-2').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startConnectionPage();
				$('body').addClass('is-not-scrollable');
				setTimeout(function(){
					$("#connection-video-page .dot-2").trigger("click");
				});
			}
		});

		$("#peaceofmind-dropdown > li > ul > li:eq(0)").on('click', function(){
			if($('#peaceofmind-video-page.video-page-is-active .page-1').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startPeacePage();
				$('body').addClass('is-not-scrollable');
				setTimeout(function(){
					$("#peaceofmind-video-page .dot-1").trigger("click");
				});
			}
		});

		$("#peaceofmind-dropdown > li > ul > li:eq(1)").on('click', function(){
			if($('#peaceofmind-video-page.video-page-is-active .page-2').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startPeacePage();
				$('body').addClass('is-not-scrollable');
				setTimeout(function(){
					$("#peaceofmind-video-page .dot-2").trigger("click");
				});
			}
		});

		$("#confidence-dropdown > li > ul > li:eq(0)").on('click', function(){
			if($('#confidence-video-page.video-page-is-active .page-1').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startConfidencePage();
				$('body').addClass('is-not-scrollable');
				setTimeout(function(){
					$("#confidence-video-page .dot-1").trigger("click");
				});
			}
		});

		$("#confidence-dropdown > li > ul > li:eq(1)").on('click', function(){
			if($('#confidence-video-page.video-page-is-active .page-2').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startConfidencePage();
				$('body').addClass('is-not-scrollable');
				setTimeout(function(){
					$("#confidence-video-page .dot-2").trigger("click");
				});
			}
		});

		$("#freedom-dropdown > li > ul > li:eq(0)").on('click', function(){
			if($('#freedom-video-page.video-page-is-active .page-1').hasClass('is-current-page')){
				$('.nav-trigger').trigger('click');
			} else{
				tm.set('.media-container', {className:'media-container'});
				// //$(this).addClass('no-focus');
				$('.close-video').trigger('click');
				$('.nav-trigger').trigger('click');
				startFreedomPage();
				$('body').addClass('is-not-scrollable');
			}
		});

		$('.dropdown > li.has-children > .invisible-dropdown-btn').on("click", function() {
			// //$(this).addClass('no-focus');
			$(this).parent().siblings().find('ul').toggleClass("is-open");
			$(this).parent().find('ul').stop(true, false, true).toggleClass('is-open');
			$(this).find('img').toggleClass('is-rotated');
			return false;
		});

	// Homepage Square Click Events

		$("#happiness-square").on('click', function(){
			//$(this).addClass('no-focus');
			startHappinessPage();
			$('body').addClass('is-not-scrollable');
		});

		$("#connection-square").on('click', function(){
			//$(this).addClass('no-focus');
			startConnectionPage();
			$('body').addClass('is-not-scrollable');
		});

		$("#peaceofmind-square").on('click', function(){
			//$(this).addClass('no-focus');
			startPeacePage();
			$('body').addClass('is-not-scrollable');
		});

		$("#confidence-square").on('click', function(){
			//$(this).addClass('no-focus');
			startConfidencePage();
			$('body').addClass('is-not-scrollable');
		});

		$("#freedom-square").on('click', function(){
			//$(this).addClass('no-focus');
			startFreedomPage();
			$('body').addClass('is-not-scrollable');
		});

		$(".grid-item-small:eq(0)").bind('click touchend', function(){
			//$(this).addClass('no-focus');
			colorBlock.removeClass('to-happiness to-connection to-peace to-confidence to-freedom').addClass('is-transitioning to-home');
			$('body').unbind();
			$('body').removeClass('is-not-scrollable');
			setTimeout(function(){
				$('.content-container, .sub-content-container').removeClass('is-active-section').addClass('is-inactive-section');
				$('#resources').removeClass('is-inactive-section').addClass('is-active-section');
				$('body').removeClass('is-not-scrollable');
			}, 1000);
			setTimeout(function(){
				colorBlock.removeClass('is-transitioning');
			},1800);
		});// 

	// Skip Intro Click Event

		$('.enter-site-link, #skip-intro').on('click', function(){
			//$(this).addClass('no-focus');
			clearTimeout(regIntro);
			intro();
		});// 

	// Toggle Menu Click Events

		$('.nav-trigger').on('click', function(){
			$(this).parents('button').addClass('no-focus');
			$('li.has-children > ul, ul.dropdown').removeClass('is-open');
			$('li.has-children .dropdown-btn').removeClass('is-rotated');
			$('#menu').toggleClass('is-on-screen-X');
			$('.site-container').toggleClass('move-over');
			$('.close-menu').toggleClass('show');
		});

		$('.close-trigger').on('click', function(){
			$(this).parents('button').addClass('no-focus');
			$('.nav-trigger').trigger('click');
		});

	// Main Nav Click Events

		$('#menu > li > span').on('click', function(){
			//$(this).addClass('no-focus');
			if ($(this).parent().children('ul').hasClass('dropdown') && !$(this).children('ul').hasClass('is-open')){
				$(this).parent().children('ul.dropdown').toggleClass('is-open');
			}
		});

		$("#home-link").on('click', function(){
			if($('.sub-content-container').hasClass('is-active-section') || $('#resources').hasClass('is-active-section')){
				attachHomePage();
				//$(this).addClass('no-focus');
				$('.nav-trigger').trigger('click');
				$('.close-video').trigger('click');
				colorBlock.removeClass('to-happiness to-connection to-peace to-confidence to-freedom').addClass('is-transitioning to-home');
				$('body').unbind();
				$('body').removeClass('is-not-scrollable');
				setTimeout(function(){
					$('#resources, .sub-content-container').removeClass('is-active-section').addClass('is-inactive-section');
					$('.content-container').removeClass('is-inactive-section');
					$('.video-page').removeClass('video-page-is-active');
					setTimeout(function(){
						$("#happiness-video-page .dot-1").trigger("click");
					}, 500);	
				}, 1000);
				setTimeout(function(){
					colorBlock.removeClass('is-transitioning');
				},1800);
			} else{
				$('.nav-trigger').trigger('click');
			}
			
		});

		$("#resources-link").bind('click touchend', function(){
			if($('#resources').hasClass('is-active-section')){
				$('.nav-trigger').trigger('click');
			} else{
				//$(this).addClass('no-focus');
				$('.nav-trigger').trigger('click');
				$('.close-video').trigger('click');
				colorBlock.removeClass('to-happiness to-connection to-peace to-confidence to-freedom').addClass('is-transitioning to-home');
				$('body').unbind();
				$('body').removeClass('is-not-scrollable');
				setTimeout(function(){
					$('.content-container, .sub-content-container').removeClass('is-active-section').addClass('is-inactive-section');
					$('#resources').removeClass('is-inactive-section').addClass('is-active-section');
					$('body').removeClass('is-not-scrollable');
				}, 1000);
				setTimeout(function(){
					colorBlock.removeClass('is-transitioning');
				},1800);
			}
		});// 

	// Share & Discover Click Event
		
		$('.discover').bind('click touchend', function(event){
        	keypressSlideDown();
	    });

	// Video Play/Pause/Rewind/FastForward Click Event

		$('.video-play').on('click touchend', function(ev){
			// // //$(this).addClass('no-focus');
			videoPlay = 1;
			$('body').unbind();

			var videoID = $(this).parents('.page').find('.video').attr('id'), 
				progressID = $(this).parents('.page').find('.progress-bar').attr('id'),
				video = $(this).parents('.page').find('.video'),
				progress = $(this).parents('.page').find('.progress-bar'), 
				rewind = $(this).parents('.page').find('.rewind-video'), 
				playPause = $(this).parents('.page').find('.play-pause-video'), 
				fforward = $(this).parents('.page').find('.fastforward-video'),
				close = $(this).parents('.page').find('.close-video'),
				videoControls = $(this).parents('.page').find('.video-controls'),
				videoPage = $(this).parents('.video-page');

			$(this).parents('.page').find('.video').removeClass('fade-out').addClass('fade-in');
			$(this).parents('.video-page-is-active').find('.discover-btn').addClass('fade-out');
			$(this).parents('.page').find('.video-background').removeClass('fade-out').addClass('fade-in');
			$(this).parents('.page').find('.video-controls').removeClass('fade-out').addClass('fade-in');
			$(this).parents('.page').find('.video-controls').find('input[type="range"]').removeClass('fade-out').addClass('fade-in');
			$(this).parents('.page').find('.close-video').removeClass('fade-out').addClass('bring-to-front');
			$(this).parents('.page').find('.overlay').removeClass('fade-in').addClass('fade-out');
			$(this).parents('.main-page').addClass('fade-out');
			$(this).parents('.section').find('.main-page-dots').addClass('fade-out');
			$(this).parents('.video-page').find('.top-square:first-child').addClass('fade-out');
			$(this).parents('.video-page').find('.social-media-hub').addClass('fade-out');

			// Change tabindex
			
				videoControls.find('button').prop('tabIndex', '');
				close.prop('tabIndex', '');

				$video = document.getElementById(videoID);
				var $progressBar = document.getElementById(progressID);

				var playClicked;
				// var intervalRewind;
				playClicked=false;

				function doYT(){
				    window.player = new YT.Player('video_player', {
				        videoId: videoID,
				        events: {
				            'onReady': onPlayerReady,
				            'onStateChange': onPlayerStateChange
				        }
				    });
				}

				window.YT && doYT() || function(){
				    var a=document.createElement("script");
				    a.setAttribute("type","text/javascript");
				    a.setAttribute("src","http://www.youtube.com/player_api");
				    a.onload=doYT;
				    a.onreadystatechange=function(){
				        if (this.readyState=="complete"||this.readyState=="loaded") doYT()
				    };
				    (document.getElementsByTagName("head")[0]||document.documentElement).appendChild(a)
				}();

				function onPlayerReady() {
				  console.log('Video is ready to play');
				}

				function onPlayerStateChange(event) {
				  switch (event.data) {
				    case YT.PlayerState.UNSTARTED:
				      console.log('unstarted');
				      break;
				    case YT.PlayerState.ENDED:
				      console.log('ended');
				      break;
				    case YT.PlayerState.PLAYING:
				      console.log('playing');
				      break;
				    case YT.PlayerState.PAUSED:
				      console.log('paused');
				      break;
				    case YT.PlayerState.BUFFERING:
				      console.log('buffering');
				      break;
				    case YT.PlayerState.CUED:
				      console.log('video cued');
				      break;
				  }
				}

			setTimeout(function(){
				// $video.playbackRate = 1.0;
				// $video.play();
				video[0].src += "&autoplay=1";
			    ev.preventDefault();
				var duration = $video.duration;

				
				function updateProgressBar() {
				   var value = Math.round((($video.contentWindow.postMessage('{"event":"onStateChange","func":"' + 'getPlayerState' + '","args":""}', '*')) * 100) / duration);
				    $progressBar.value = value;
				    $('.fade-in .progress-bar').attr('value', value);
				}

				$video.addEventListener("onStateChange", function() {
					updateProgressBar();
				});

				$video.addEventListener("YT.PlayerState.ENDED", function() {
					console.log('works');
					$(this).parents('.page').find('.next-video').addClass('start-countdown');
					countdown();
				});

				playPause.on('click', function(){

					if (playClicked == true) {
					    $video.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
					    // $video.playbackRate = 1.0;
						// clearInterval(intervalRewind);
						setTimeout(function(){
					    	playClicked = false;
					    },500);
					} 
					else {
				  		// $video.playbackRate = 1.0;
						// clearInterval(intervalRewind);
					    $video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
					    setTimeout(function(){
					    	playClicked = true;
					    },500);
					}
				});
				// fforward.on('click', function() {
				//     $video.playbackRate = 3.0;
				// });
				// rewind.on('click', function() {
				//    intervalRewind = setInterval(function(){
				//        $video.playbackRate = 1.0;
				//        if($video.currentTime == 0){
				//            clearInterval(intervalRewind);
				//            $video.pause();
				//        }
				//        else{
				//            $video.currentTime += -.1;
				//        }
				//     },30);
				// });
				
			},500);

			function countdown(){
				(function (startCountdown) {
				    var timer = setInterval(

				        function () {
				            checkTime(startCountdown);
				        }, 1000);

				    function checkTime(this_time) {
				        var check = new Date - this_time;
				        $('.next-video-countdown').html(' ' + Math.abs(Math.round(check / 1000)) + ' seconds');
				        if (check >= 0) {
				            // clearInterval(timer);
				            $('.close-video').trigger('click');
				            if(video.parents('.section').find('.dot-1').hasClass('selected')){
								video.parents('.section').find('.dot-2').trigger('click');
								setTimeout(function(){
									video.parents('.section').find('.page-2').find('.video-play').trigger('click');
								},2000);
				            }
				            else if(video.parents('.section').find('.dot-2').hasClass('selected')){
				            	video.parents('.section').find('.dot-3').trigger('click');
				            	setTimeout(function(){
									video.parents('.section').find('.page-3').find('.video-play').trigger('click');
								},2000);
				            }
				        }
				    }
				})(10000 + new Date().getTime());	
			}

			// Close Video Click Event

			$('.close-video').bind('click touchend', function(){
				$(this).siblings('.video-controls').find('button').prop('tabIndex', '-1');
				$(this).prop('tabIndex', '-1');
				// // //$(this).addClass('no-focus');
				if(videoPlay === 1){
					// clearInterval(timer);
					$video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
					$(this).siblings('.main-page').removeClass('fade-out');
					$(this).parents('.video-page-is-active').find('.discover-btn').removeClass('fade-out');
					$(this).parents('.page').find('.video').removeClass('fade-in').addClass('fade-out');
					$(this).parents('.page').find('.video-background').removeClass('fade-in').addClass('fade-out');
					$(this).parents('.page').find('.video-controls').removeClass('fade-in').addClass('fade-out');
					$(this).parents('.page').find('.video-controls').find('input[type="range"]').removeClass('fade-in').addClass('fade-out');
					$(this).parents('.page').find('.close-video').removeClass('bring-to-front').addClass('fade-out');
					$(this).parents('.page').find('.overlay').removeClass('fade-out');
					$(this).parents('.section').find('.main-page-dots').removeClass('fade-out');
					$(this).parents('.video-page').find('.top-square:first-child').removeClass('fade-out');
					$(this).parents('.video-page').find('.social-media-hub').removeClass('fade-out');
					bindPage();
					$(this).parents('.page').find('.next-video').removeClass('start-countdown');
				}
			});
		});
	
	// Close Video Click Event

		$('.close-video').bind('click touchend', function(){
			$(this).siblings('.video-controls').find('button').prop('tabIndex', '-1');
			$(this).prop('tabIndex', '-1');
			// // //$(this).addClass('no-focus');
			if(videoPlay === 1){
				$video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
				$(this).siblings('.main-page').removeClass('fade-out');
				$(this).parents('.page').find('.video').removeClass('fade-in').addClass('fade-out');
				$(this).parents('.page').find('.video-controls').removeClass('fade-in').addClass('fade-out');
				$(this).parents('.page').find('.video-controls').find('input[type="range"]').removeClass('fade-in').addClass('fade-out');
				$(this).parents('.page').find('.close-video').removeClass('bring-to-front').addClass('fade-out');
				$(this).parents('.page').find('.overlay').removeClass('fade-out');
				$(this).parents('.section').find('.main-page-dots').removeClass('fade-out');
				$(this).parents('.video-page').find('.top-square:first-child').removeClass('fade-out');
				$(this).parents('.video-page').find('.social-media-hub').removeClass('fade-out');
				bindPage();
				$(this).parents('.page').find('.next-video').removeClass('start-countdown');
			}
		});

	// Function to allow videos to play in browser on iPad

		$('video').bind('webkitendfullscreen', function() { 
		    $video.pause();
			$(this).siblings('.main-page').removeClass('fade-out');
			$(this).parents('.page').find('.video').removeClass('fade-in').addClass('fade-out');
			$(this).parents('.page').find('.video-controls').removeClass('fade-in').addClass('fade-out');
			$(this).parents('.page').find('.video-controls').find('input[type="range"]').removeClass('fade-in').addClass('fade-out');
			$(this).parents('.page').find('.close-video').removeClass('bring-to-front').addClass('fade-out');
			$(this).parents('.page').find('.overlay').removeClass('fade-out');
			$(this).parents('.section').find('.main-page-dots').removeClass('fade-out');
			$(this).parents('.video-page').find('.top-square:first-child').removeClass('fade-out');
			$(this).parents('.video-page').find('.social-media-hub').removeClass('fade-out');
			bindPage();
		});

	// Form Dropdown Click Event

		var clicked;

		$('.select-option').bind('click touchend', function() {
			// //$(this).addClass('no-focus');
            var selectedText = $(this).text();
            var category = $(this).attr('cat');

            $(this).parents('form').find('.topic option').val(selectedText);
            $(this).parents('form').find('.category').val(category);
            $(this).parents('form').find('.is-selected').html('<span>' + selectedText + '</span>');

            if(clicked === 2){
				$('ul.select-dropdown').removeClass('dropdown-active'); 
				setTimeout(function(){
					clicked=1;
				},400);
				
			} else {
				$('ul.select-dropdown').addClass('dropdown-active'); 
				setTimeout(function(){
					clicked=2;
				},400);
			}
        });

    // Stories Lightbox Click Events

        $('.story').bind('click touchend', function() {
        	//$(this).addClass('no-focus');
        	if(!$(this).hasClass('last-story')){
        		var storyInfo = $(this).html();
        		if(isMobile.detectMobile()){
		        	setTimeout(function(){
		        		if(scrollstart !== 1){
			            	$('.story-lightbox').addClass('is-shown');
			            	$('.lightbox-dimmer').addClass('is-shown');
			            	$('.story-lightbox .close-story').before(storyInfo);

			            	setTimeout(function(){
			            		$('.story-lightbox .reveal').removeClass('hide');
			            		$('.story-lightbox .read-more-btn').addClass('hide');
			            	},500);
			            }
		        	}, 1000);	
	        	} else{
	            	$('.story-lightbox').addClass('is-shown');
	            	$('.lightbox-dimmer').addClass('is-shown');
	            	$('.story-lightbox .close-story').before(storyInfo);

	            	setTimeout(function(){
	            		$('.story-lightbox .reveal').removeClass('hide');
	            		$('.story-lightbox .read-more-btn').addClass('hide');
	            	},500);
		            
		        }
            }
        });

        $('.close-story').bind('click touchend', function() {
        	//$(this).addClass('no-focus');
        	$('.story-lightbox').removeClass('is-shown').addClass('fade-out');
        	$('.lightbox-dimmer').removeClass('is-shown').addClass('fade-out');

        	setTimeout(function(){
        		$('.story-lightbox').removeClass('fade-out');
        	 	$('.lightbox-dimmer').removeClass('fade-out');
        		$('.story-lightbox .individual-story-container').detach();
        	},1200);
        });// 

    // Homepage Slide Toggle Click & Mouseover Events

        $('.slide-dot').bind('click touchend', function(){
        	//$(this).addClass('no-focus');

			if($(this).is('.slide-dot:first') && !$(this).hasClass('selected')){
				$(this).addClass('selected');
				$(this).siblings().removeClass('selected');
				$('.slide-1').removeClass('is-inactive-slide');
				$('.slide-2').removeClass('is-active-slide');
			} 
			else if($(this).is('.slide-dot:last') && !$(this).hasClass('selected')){
				$(this).addClass('selected');
				$(this).siblings().removeClass('selected');
				$('.slide-1').addClass('is-inactive-slide');
				$('.slide-2').addClass('is-active-slide');
			} else{
				//do nothing
			}
		});

		$('.grid-item-square, .grid-item-small').mouseover(function() {
		  	$(this).find('.slide-2').addClass('is-active-slide');
		  	$(this).find('.slide-1').addClass('is-inactive-slide');
		}).mouseout(function() {
			if(!$('.slide-dot:last').hasClass('selected')){
			  	$(this).find('.slide-2').removeClass('is-active-slide');
			  	$(this).find('.slide-1').removeClass('is-inactive-slide');
			}
		});// 

	// Videopage Page Indicator Click Events 

        $(".dot-1").bind("click touchend", function() {
			$(this).addClass('selected no-focus');
			$(this).siblings().removeClass('selected');
			$(this).parents(".section-1").find(".page-1").removeClass('make-next is-next-page is-previous-page').addClass('is-current-page');
			$(this).parents(".section-1").find(".page-2").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
			$(this).parents(".section-1").find(".page-3").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
		});

		$(".dot-2").bind("click touchend", function(){
			$(this).addClass('selected no-focus');
			$(this).siblings().removeClass('selected');
			$(this).parents(".section-1").find(".page-2").removeClass('is-next-page is-previous-page').addClass('is-current-page');
			$(this).parents(".section-1").find(".page-3").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
			$(this).parents(".section-1").find(".page-1").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');

		});

		$(".dot-3").bind("click touchend", function(){
			$(this).addClass('selected no-focus');
			$(this).siblings().removeClass('selected');
			$(this).parents(".section-1").find(".page-3").removeClass('is-next-page is-previous-page').addClass('is-current-page');
			$(this).parents(".section-1").find(".page-2").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');
			$(this).parents(".section-1").find(".page-1").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');

		});

		$(".right-arrow").bind("click touchend", function() {
			//$(this).addClass('no-focus');
			if($(this).parents(".page").hasClass("page-1") && $(this).parents(".is-current-page").siblings().hasClass("page-2")){
				$(this).parents(".section-1").find(".dot-2").siblings().removeClass('selected');
				$(this).parents(".section-1").find(".dot-2").addClass('selected');
				$(this).parents(".section-1").find(".page-2").removeClass('is-next-page is-previous-page').addClass('is-current-page');
				$(this).parents(".section-1").find(".page-3").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
				$(this).parents(".section-1").find(".page-1").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');
			}
			else if($(this).parents(".page").hasClass("page-2") && $(this).parents(".is-current-page").siblings().hasClass("page-3")){
				$(this).parents(".section-1").find(".dot-3").siblings().removeClass('selected');
				$(this).parents(".section-1").find(".dot-3").addClass('selected');
				$(this).parents(".section-1").find(".page-3").removeClass('is-next-page is-previous-page').addClass('is-current-page');
				$(this).parents(".section-1").find(".page-2").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');
				$(this).parents(".section-1").find(".page-1").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');
			}
			else if(($(this).parents(".page").hasClass("page-2") && !$(this).parents(".is-current-page").siblings().hasClass("page-3")) || $(this).parents(".page").hasClass("page-3")){
				$(this).parents(".section-1").find(".dot-1").siblings().removeClass('selected');
				$(this).parents(".section-1").find(".dot-1").addClass('selected');
				$(this).parents(".section-1").find(".page-1").removeClass('make-next is-next-page is-previous-page').addClass('is-current-page');
				$(this).parents(".section-1").find(".page-2").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
				$(this).parents(".section-1").find(".page-3").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
			}
			
		});

		$(".left-arrow").bind("click touchend", function() {
			//$(this).addClass('no-focus');
			if($(this).parents(".page").hasClass("page-2")){
				$(this).parents(".section-1").find(".dot-1").siblings().removeClass('selected');
				$(this).parents(".section-1").find(".dot-1").addClass('selected');
				$(this).parents(".section-1").find(".page-1").removeClass('make-next is-next-page is-previous-page').addClass('is-current-page');
				$(this).parents(".section-1").find(".page-2").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
				$(this).parents(".section-1").find(".page-3").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
			}
			else if($(this).parents(".page").hasClass("page-3")){
				$(this).parents(".section-1").find(".dot-2").siblings().removeClass('selected');
				$(this).parents(".section-1").find(".dot-2").addClass('selected');
				$(this).parents(".section-1").find(".page-2").removeClass('is-next-page is-previous-page').addClass('is-current-page');
				$(this).parents(".section-1").find(".page-3").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
				$(this).parents(".section-1").find(".page-1").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');
			}
			
		});// 
				       
	// Happiness Page Slide Up & Down Functions
	
		function happinessSlideDown(){
			if($('#happiness-video-page .section-1').hasClass('is-current-section') && $('#happiness-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#happiness-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#happiness-video-page .section-1', {className:'section section-1 is-previous-section'});
					tm.set('#happiness-top-square', {className:'+=opaque is-shown', delay:1});
					tm.set('#happiness-social-media-hub .media-container', {className:'+=is-green'});
					tm.set('#happiness-discover-btn', {className:'discover-btn fade-out'});
				}, 500);
			}
			else if($('#happiness-video-page .section-2').hasClass('is-current-section') && $('#happiness-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){

					tm.set('#happiness-video-page .section-3', {className:'section section-3 is-current-section'});
					tm.set('#happiness-video-page .section-2', {className:'section section-2 is-previous-section'});
					tm.set('#happiness-top-square', {className:'+=opaque is-shown'});
				}, 500);
			}
	       	else {
	       		// do nothing
	       	}
    	} 

		function happinessSlideUp(){
	       	if($('#happiness-video-page .section-1').hasClass('is-current-section') && $('#happiness-video-page').hasClass('video-page-is-active')) {
				// do nothing
			}
			else if($('#happiness-video-page .section-2').hasClass('is-current-section') && $('#happiness-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#happiness-video-page .section-1', {className:'section section-1 is-current-section'});
					tm.set('#happiness-video-page .section-2', {className:'section section-2 is-next-section'});
					tm.set('#happiness-top-square', {className:'-=opaque is-shown'});
					tm.set('#happiness-social-media-hub .media-container', {className:'-=is-green'});
					tm.set('#happiness-discover-btn', {className:'discover-btn fade-in'});	
				}, 500);
			}
			else if($('#happiness-video-page .section-3').hasClass('is-current-section') && $('#happiness-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#happiness-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#happiness-video-page .section-3', {className:'section section-3 is-next-section'});
				}, 500);
			}
	    }

	// Connection Page Slide Up & Down Functions

	    function connectionSlideDown(){
			if($('#connection-video-page .section-1').hasClass('is-current-section') && $('#connection-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#connection-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#connection-video-page .section-1', {className:'section section-1 is-previous-section'});
					tm.set('#connection-top-square', {className:'+=opaque is-shown', delay:1});
					tm.set('#connection-social-media-hub .media-container', {className:'+=is-orange'});
					tm.set('#connection-discover-btn', {className:'discover-btn fade-out'});
				}, 500);
			}
			else if($('#connection-video-page .section-2').hasClass('is-current-section') && $('#connection-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#connection-video-page .section-3', {className:'section section-3 is-current-section'});
					tm.set('#connection-video-page .section-2', {className:'section section-2 is-previous-section'});
					tm.set('#connection-top-square', {className:'+=opaque is-shown'});
				}, 500);
			}
	       	else {
	       		// do nothing
	       	}
    	} 
		
		function connectionSlideUp(){
	       	if($('#connection-video-page .section-1').hasClass('is-current-section') && $('#connection-video-page').hasClass('video-page-is-active')) {
				// do nothing
			}
			else if($('#connection-video-page .section-2').hasClass('is-current-section') && $('#connection-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#connection-video-page .section-1', {className:'section section-1 is-current-section'});
					tm.set('#connection-video-page .section-2', {className:'section section-2 is-next-section'});
					tm.set('#connection-top-square', {className:'-=opaque is-shown'});
					tm.set('#connection-social-media-hub .media-container', {className:'-=is-orange'});
					tm.set('#connection-discover-btn', {className:'discover-btn fade-in'});
				}, 500);
			}
			else if($('#connection-video-page .section-3').hasClass('is-current-section') && $('#connection-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#connection-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#connection-video-page .section-3', {className:'section section-3 is-next-section'});
				}, 500);
			}
	    }

	// Peace of Mind Page Slide Up & Down Functions

	    function peaceSlideDown(){
			if($('#peaceofmind-video-page .section-1').hasClass('is-current-section') && $('#peaceofmind-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#peaceofmind-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#peaceofmind-video-page .section-1', {className:'section section-1 is-previous-section'});
					tm.set('#peaceofmind-top-square', {className:'+=opaque is-shown', delay:1});
					tm.set('#peaceofmind-social-media-hub .media-container', {className:'+=is-blue'});	
					tm.set('#peaceofmind-discover-btn', {className:'discover-btn fade-out'});
				}, 500);
			}
			else if($('#peaceofmind-video-page .section-2').hasClass('is-current-section') && $('#peaceofmind-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#peaceofmind-video-page .section-3', {className:'section section-3 is-current-section'});
					tm.set('#peaceofmind-video-page .section-2', {className:'section section-2 is-previous-section'});
					tm.set('#peaceofmind-top-square', {className:'+=opaque is-shown'});
				}, 500);
			}
	       	else {
	       		// do nothing
	       	}
    	} 
		
		function peaceSlideUp(){
	       	if($('#peaceofmind-video-page .section-1').hasClass('is-current-section') && $('#peaceofmind-video-page').hasClass('video-page-is-active')) {
				// do nothing
			}
			else if($('#peaceofmind-video-page .section-2').hasClass('is-current-section') && $('#peaceofmind-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#peaceofmind-video-page .section-1', {className:'section section-1 is-current-section'});
					tm.set('#peaceofmind-video-page .section-2', {className:'section section-2 is-next-section'});
					tm.set('#peaceofmind-top-square', {className:'-=opaque is-shown'});
					tm.set('#peaceofmind-social-media-hub .media-container', {className:'-=is-blue'});
					tm.set('#peaceofmind-discover-btn', {className:'discover-btn fade-in'});
				}, 500);
			}
			else if($('#peaceofmind-video-page .section-3').hasClass('is-current-section') && $('#peaceofmind-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#peaceofmind-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#peaceofmind-video-page .section-3', {className:'section section-3 is-next-section'});
				}, 500);
			}
	    }

	// Confidence Page Slide Up & Down Functions
	
	    function confidenceSlideDown(){
			if($('#confidence-video-page .section-1').hasClass('is-current-section') && $('#confidence-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#confidence-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#confidence-video-page .section-1', {className:'section section-1 is-previous-section'});
					tm.set('#confidence-top-square', {className:'+=opaque is-shown', delay:1});
					tm.set('#confidence-social-media-hub .media-container', {className:'+=is-lime'});
					tm.set('#confidence-discover-btn', {className:'discover-btn fade-out'});
				}, 500);
			}
			else if($('#confidence-video-page .section-2').hasClass('is-current-section') && $('#confidence-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#confidence-video-page .section-3', {className:'section section-3 is-current-section'});
					tm.set('#confidence-video-page .section-2', {className:'section section-2 is-previous-section'});
					tm.set('#confidence-top-square', {className:'+=opaque is-shown'});
				}, 500);
			}
	       	else {
	       		// do nothing
	       	}
    	} 

		function confidenceSlideUp(){
	       	if($('#confidence-video-page .section-1').hasClass('is-current-section') && $('#confidence-video-page').hasClass('video-page-is-active')) {
				// do nothing
			}
			else if($('#confidence-video-page .section-2').hasClass('is-current-section') && $('#confidence-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#confidence-video-page .section-1', {className:'section section-1 is-current-section'});
					tm.set('#confidence-video-page .section-2', {className:'section section-2 is-next-section'});
					tm.set('#confidence-top-square', {className:'-=opaque is-shown'});
					tm.set('#confidence-social-media-hub .media-container', {className:'-=is-lime'});
					tm.set('#confidence-discover-btn', {className:'discover-btn fade-in'});
				}, 500);
			}
			else if($('#confidence-video-page .section-3').hasClass('is-current-section') && $('#confidence-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#confidence-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#confidence-video-page .section-3', {className:'section section-3 is-next-section'});
				}, 500);
			}
	    }

	// Freedom Page Slide Up & Down Functions

	    function freedomSlideDown(){
			if($('#freedom-video-page .section-1').hasClass('is-current-section') && $('#freedom-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#freedom-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#freedom-video-page .section-1', {className:'section section-1 is-previous-section'});
					tm.set('#freedom-top-square', {className:'+=opaque is-shown', delay:1});	
					tm.set('#freedom-social-media-hub .media-container', {className:'+=is-pink'});
					tm.set('#freedom-discover-btn', {className:'discover-btn fade-out'});
				}, 500);
			}

			else if($('#freedom-video-page .section-2').hasClass('is-current-section') && $('#freedom-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#freedom-video-page .section-3', {className:'section section-3 is-current-section'});
					tm.set('#freedom-video-page .section-2', {className:'section section-2 is-previous-section'});
					tm.set('#freedom-top-square', {className:'+=opaque is-shown'});
				}, 500);
			}
	       	else {
	       		// do nothing
	       	}
    	} 

		function freedomSlideUp(){
	       	if($('#freedom-video-page .section-1').hasClass('is-current-section') && $('#freedom-video-page').hasClass('video-page-is-active')) {
				// do nothing
			}
			else if($('#freedom-video-page .section-2').hasClass('is-current-section') && $('#freedom-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#freedom-video-page .section-1', {className:'section section-1 is-current-section'});
					tm.set('#freedom-video-page .section-2', {className:'section section-2 is-next-section'});
					tm.set('#freedom-top-square', {className:'-=opaque is-shown'});
					tm.set('#freedom-social-media-hub .media-container', {className:'-=is-pink'});
					tm.set('#freedom-discover-btn', {className:'discover-btn fade-in'});
				}, 500);
			}
			else if($('#freedom-video-page .section-3').hasClass('is-current-section') && $('#freedom-video-page').hasClass('video-page-is-active')) {
				setTimeout(function(){
					tm.set('#freedom-video-page .section-2', {className:'section section-2 is-current-section'});
					tm.set('#freedom-video-page .section-3', {className:'section section-3 is-next-section'});
				}, 500);
			}
	    }

	// Tab Index Functions
	
		$("body").on("keydown", function(event) {
			$('*').removeClass('no-focus');
	    });

		// Menu Tab Index Functions

		    $('.toggle-menu').bind('keydown', function(event){
		    	if (event.keyCode === 13) {
		    		event.preventDefault();
		    		$('.nav-trigger').trigger('click');
		    		$(".close-menu").focus();
		    	} else if(event.keyCode === 9 && $('.video').hasClass('fade-in')){
		    		event.preventDefault();
		    		$('.fade-in').siblings('.close-video').focus();
		    	}
		    });

		    $('.close-menu').bind('keydown', function(event){
		    	if (event.keyCode === 13) {
		    		$('.nav-trigger').trigger('click');
		    		$(".toggle-menu").focus();
		    	}
		    });

		    // $('.main-link:eq(1)').bind('keydown', function(event){
		    // 	if (event.keyCode === 13) {
		    // 		$(this).trigger('click');
		    // 	}
		    // });

		    $('.menu-item').bind('keydown', function(event){

		    	if ($('#menu').hasClass('is-on-screen-X') && event.keyCode === 27) {
		        	$('.close-trigger').trigger('click');
		        } else if ($('#menu').hasClass('is-on-screen-X') && event.keyCode === 9) {
		        	$('.close-trigger').trigger('click');
		        }

		    	// Main Menu Items Down Arrow Pressed
		    	
		    	else if (event.keyCode === 40 && $(this).is('.menu-item:first')) {
			    	$('.menu-item:eq(1)').find('.main-link').focus();
		    	} 
		    	else if (event.keyCode === 40 && $(this).is('.menu-item:last')) {
			    	$('.menu-item:first-of-type').focus();
		    	} 
		    	else if (event.keyCode === 40 && document.activeElement.className == 'main-link'){
		    		if($(this).is('.menu-item:eq(2)') && $('.dropdown').hasClass('is-open')){
		    			console.log('pressed menu item');
		    			$('.menu-item .invisible-dropdown-btn:eq(0)').focus();
		    		} else{
		    			$(':focus').closest('.menu-item').next('.menu-item').find('.main-link').focus();
		    		}
		    	} 

		    	// Main Menu Items Up Arrow Pressed
		    	
		    	else if (event.keyCode === 38 && $(this).hasClass('close-menu')) {
			    	$('.menu-item:eq(3)').find('.main-link').focus();
		    	} 
		    	else if (event.keyCode === 38 && $(this).is('.menu-item:eq(1)')){
		    		$('.close-menu').focus();
		    	} 
		    	else if (event.keyCode === 38 && $(this).is('.menu-item:eq(3)')){
		    		if($('.menu-item .dropdown').hasClass('is-open')){
		    			$('.menu-item .invisible-dropdown-btn:eq(4)').focus();
		    		} else{
		    			$('.menu-item:eq(2)').find('.main-link').focus();
		    		}
		    	} else if (event.keyCode === 38 && $(this).is('.menu-item') && document.activeElement.className == 'main-link'){
		    		$(':focus').closest('.menu-item').prev('.menu-item').find('.main-link').focus();	
		    	}

		    	// Sub Menu Items Down Arrow Pressed

		    	else if (event.keyCode === 40 && document.activeElement.className == 'invisible-dropdown-btn'){
		    		console.log('pressed dropdown btn');
		    		if($('.sub-sub-menu:eq(0)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(0)')){
		    			$('.dropdown-link:eq(0)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(1)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(1)')){
		    			$('.dropdown-link:eq(3)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(2)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(2)')){
		    			$('.dropdown-link:eq(5)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(3)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(3)')){
		    			$('.dropdown-link:eq(7)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(4)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(4)')){
		    			$('.dropdown-link:eq(9)').focus();
		    		} 
		    		else if($(this).find(':focus').is('.invisible-dropdown-btn:last')){
		    			$('.menu-item:eq(3)').find('.main-link').focus();
	
		    		} else {
		    			$(':focus').closest('.dropdown').next('.dropdown').find('.invisible-dropdown-btn').focus();
		    		}
		    	} 

		    	// Sub Menu Items Up Arrow Pressed
 
		    	else if (event.keyCode === 38 && document.activeElement.className == 'invisible-dropdown-btn'){

		    		// If Sub-Sub Menu Is Open & In Corresponding Menu
		    		
		    		if(!$('.sub-sub-menu:eq(0)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(1)')){
		    			$('.invisible-dropdown-btn:eq(0)').focus();
		    		} 
		    		else if(!$('.sub-sub-menu:eq(1)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(2)')){
		    			$('.invisible-dropdown-btn:eq(1)').focus();
		    		} 
		    		else if(!$('.sub-sub-menu:eq(2)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(3)')){
		    			$('.invisible-dropdown-btn:eq(2)').focus();
		    		} 
		    		else if(!$('.sub-sub-menu:eq(3)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(4)')){
		    			$('.invisible-dropdown-btn:eq(3)').focus();
		    		}

		    		else if($('.sub-sub-menu:eq(0)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(1)')){
		    			$('.dropdown-link:eq(2)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(1)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(2)')){
		    			$('.dropdown-link:eq(4)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(2)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(3)')){
		    			$('.dropdown-link:eq(6)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(3)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(4)')){
		    			$('.dropdown-link:eq(8)').focus();
		    		}

		    		else if($('.sub-sub-menu:eq(0)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(0)')){
		    			$('.dropdown-link:eq(2)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(1)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(1)')){
		    			$('.dropdown-link:eq(4)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(2)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(2)')){
		    			$('.dropdown-link:eq(6)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(3)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(3)')){
		    			$('.dropdown-link:eq(8)').focus();
		    		} 
		    		else if($('.sub-sub-menu:eq(4)').hasClass('is-open') && $(this).find(':focus').is('.invisible-dropdown-btn:eq(4)')){
		    			$('.dropdown-link:eq(9)').focus();
		    		}

		    		else if($(this).find(':focus').is('.invisible-dropdown-btn:first')){
		    			$('.menu-item:eq(2)').find('.main-link').focus();
		    		} 
		    		else {
		    			$(':focus').closest('.dropdown').prev('.dropdown').find('.invisible-dropdown-btn').focus();
		    		}
		    	} 

		    	// Sub-Sub Menu Items Down Arrow Pressed

		    	else if (event.keyCode === 40 && document.activeElement.className == 'dropdown-link'){
		    		console.log('pressed sub-dropdown btn');
		    		if($(this).find(':focus').is('.dropdown-link:eq(2)') || $(this).find(':focus').is('.dropdown-link:eq(4)') || $(this).find(':focus').is('.dropdown-link:eq(6)') || $(this).find(':focus').is('.dropdown-link:eq(8)') || $(this).find(':focus').is('.dropdown-link:eq(9)')){
		    			$(':focus').closest('.dropdown').next('.dropdown').find('.invisible-dropdown-btn').focus();
		    		} else {
		    			$(':focus').closest('.sub-sub-menu-item').next('.sub-sub-menu-item').find('.dropdown-link').focus();
		    		}
		    	} 

		    	// Sub-Sub Menu Items Up Arrow Pressed
 
		    	else if (event.keyCode === 38 && document.activeElement.className == 'dropdown-link'){

		    		if($(this).find(':focus').is('.dropdown-link:eq(0)') || $(this).find(':focus').is('.dropdown-link:eq(3)') || $(this).find(':focus').is('.dropdown-link:eq(5)') || $(this).find(':focus').is('.dropdown-link:eq(7)') || $(this).find(':focus').is('.dropdown-link:eq(9)')){
		    			$(':focus').closest('.dropdown').find('.invisible-dropdown-btn').focus();
		    		} else {
		    			$(':focus').closest('.sub-sub-menu-item').prev('.sub-sub-menu-item').find('.dropdown-link').focus();
		    		}
		    	} 

		    	// All Menu Items Enter Key Pressed

		    	else if (event.keyCode === 13 && document.activeElement.className == 'invisible-dropdown-btn'){
		    		$(this).find(':focus').trigger('click');
		    	} 
		    	else if (event.keyCode === 13 && document.activeElement.className == 'main-link'){
		    		$(this).find('.main-link').trigger('click');
		    	} 
		    	else if (event.keyCode === 13 && document.activeElement.className == 'dropdown-link'){
		    		$(this).find(':focus').trigger('click');
		    	}

		    	else {
		    		console.log('other key pressed');
		    	}
		    });

		// Home Grid Tab Index Function

		    $('.grid-item, .grid-item-square, .grid-item-small').on('focus', function(){
		    	$(this).addClass('selected');
				$(this).siblings().removeClass('selected');
				$(this).find('.slide-1').addClass('is-inactive-slide');
				$(this).find('.slide-2').addClass('is-active-slide');
		    });

		// Button Tab Index Functions
			
			$('#skip-intro').bind('keydown', function(event){
		    	if (event.keyCode === 13) {
		    		// // //$(this).addClass('no-focus');
					clearTimeout(regIntro);
					intro();
		    	}
		    });

		// Individual Video Page Functions
			
			$('.hashtag').bind('keydown', function(event){
				var videoPlayBtn = $(this).parents('.social-media-hub').siblings('.section-1').find('.is-current-page .video-play');
		    	if (event.keyCode === 9 && $(this).parents('.social-media-hub').siblings('.section-1').hasClass('is-current-section')) {
		        	event.preventDefault();
		        	$(this).parents('.social-media-hub').siblings('.section-1').find('.is-current-page').find('.video-play').focus();
		        	console.log($(this).parents('.social-media-hub').siblings('.section-1').find('.is-current-page').find('.video-play').attr('class'));
		        } else if (event.keyCode === 9 && !$(this).parents('.social-media-hub').siblings('.section-1').hasClass('is-current-section')) {
		        	event.preventDefault();
		        	keypressSlideUp();
		        	videoPlayBtn.focus();
		        	alert('hi');
		        }
		    });

		    $('.transcript-button').bind('keydown', function(event){
		    	if (event.keyCode === 9){
		    		event.preventDefault();
		    		$(this).parents('.section-1').siblings('.discover-btn').find('.discover').focus();
		    	}
		    	
		    });

		    $('.discover').bind('keydown', function(event){
		    	if (event.keyCode === 9 && $(this).parents('.discover-btn').siblings('.section-1').hasClass('is-current-section') || event.keyCode === 13) {
		        	event.preventDefault();
		        	keypressSlideDown();
		        	$(this).parents('.discover-btn').siblings('.section-2').find('.name-field').focus();
		        }
		    });

		// Video Buttons Functions

		    $('.video-play').bind('keydown', function(event){
		    	var closeBtn = $(this).parents('.page').find('.close-video');
		    	if (event.keyCode === 9 && $(this).parents('.main-page').siblings('.video').hasClass('fade-in')){
		    		event.preventDefault();
		    		closeBtn.focus();
		    	}
		    	else if(event.keyCode === 13){
		    		$(this).trigger('click');
		    		event.preventDefault();
		    		closeBtn.focus();
		    	}
		    });

		    $('.play-pause-video').bind('keydown', function(event){
		    	var closeBtn = $(this).parents('.video-controls').siblings('.close-video');
		    	if (event.keyCode === 9){
		    		event.preventDefault();
		    		$('.toggle-menu').focus();
		    	}
		    });

		    // $('.fastforward-video').bind('keydown', function(event){
		    // 	var closeBtn = $(this).parents('.video-controls').siblings('.close-video');
		    // 	if (event.keyCode === 9){
		    // 		event.preventDefault();
		    // 		$('.toggle-menu').focus();
		    // 	}
		    // });

		    $('.close-video').bind('keydown', function(event){
		    	if(event.keyCode === 9 && $(this).parents('.page').hasClass('is-current-page')){
		    		event.preventDefault();
		    		$(this).siblings('.video-controls').find('.play-pause-video').focus();
		    		// $(this).siblings('.main-page').find('.video-play').focus();
		    	}
		    });

		    $('.left-arrow, .right-arrow').bind('keydown', function(event){
		    	if(event.keyCode === 13){
		    		$(this).trigger('click');
		    		event.preventDefault();
		    		$('.toggle-menu').focus();
		    	}
		    });

		// Share Form Functions
		
			$('.select-option').bind('keydown', function(event){
		    	if(event.keyCode === 13){
		    		event.preventDefault();
		    		$(this).trigger('click');
		    	} else if(event.keyCode === 40 && $(this).attr('cat') !== '6'){
		    		$(this).next('.select-option').focus();
		    	} else if(event.keyCode === 40 && $(this).attr('cat') === '6'){
		    		$(this).closest('.select-dropdown').find('.select-option:first-of-type').focus();
		    	} else if(event.keyCode === 9 && $(this).closest('.select-dropdown').hasClass('dropdown-active')){
		    		event.preventDefault();
		    	}
		    });

		    $('.submit-btn').bind('keydown', function(event){
		    	console.log($(this).closest('.section-2').siblings('.section-3').find('.story').length);
		    	if(event.keyCode === 9 && $(this).closest('.section-2').siblings('.section-3').find('.story').length > 1 ){
		    		event.preventDefault();
		    		$(this).closest('.section-2').siblings('.section-3').find('.story:first-of-type .read-more-btn').focus();
		    		keypressSlideDown();
		    	} else{
		    		event.preventDefault();
		    		$(this).closest('.section-2').siblings('.section-3').find('.back-to-top-btn').focus();
		    		keypressSlideDown();
		    	}
		    });

		    $('.checkbox-label').bind('keydown', function(event){
		    	if(event.keyCode === 13){
		    		event.preventDefault();
		    		$(this).parents('.checkbox-field').find('input').trigger('click');
		    		$(this).focus();
		    	}
		    });

		    $('.read-more-btn').bind('keydown', function(event){
		    	// console.log($(this).closest('.section-2').siblings('.section-3').find('.story').length);
		    	if(event.keyCode === 9 && $(this).parents('.story').next('.story').hasClass('last-story') ){
		    		event.preventDefault();
		    		$(this).parents('.story').next('.story').find('.read-more-btn').focus();
		    	} else{
		    		event.preventDefault();
		    		$(this).parents('.story').next('.story').find('.back-to-top-btn').focus();
		    	}
		    });

		    $('.more-stories-btn').bind('keydown', function(event){
		    	if(event.keyCode === 9){
		    		event.preventDefault();
		    		keypressSlideUp();
		    		setTimeout(function(){
		    			keypressSlideUp();
		    			$('.toggle-menu').focus();
		    		},2000);
		    	}
		    });



		
});



