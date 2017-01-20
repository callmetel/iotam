jQuery(document).ready(function($) {

	// Get IE or Edge browser version
    var version = detectIE();

    if (version === false) {
      $('html').removeClass('IE');
    } else if (version >= 12) {
    	 console.log('You are using IE');
      // $('body').attr('onmousewheel', 'move()');
      $('html').addClass('IE');
      // $('#map').replaceWith( "<img id='map' src='app/images/dotted-map.svg'>" );
    } else {
      console.log('You are using IE');
      $('html').addClass('IE');
      // $('#map').replaceWith( "<img id='map' src='app/images/dotted-map.svg'>" );
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
	

	//Declaring Global Variables
	
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

		var isMobile = {
            detectMobile: function() {
                return navigator.userAgent.match(/Mobi/i);
            }
        };

        function checkLoad() {
	        if (introvid.readyState === 4) {
	        	$('body').removeClass('initial-hide').addClass('fade-in');
	            regIntroEnd();
	            setTimeout(function(){
	            	$('.site-container').removeClass('initial-hide');
	            },500);
	        } else {
	            $('body').removeClass('initial-hide').addClass('fade-in');
	            regIntroEnd();
	            setTimeout(function(){
	            	$('.site-container').removeClass('initial-hide');
	            },1500);
	        }
	    }
	    checkLoad();
	    
	    if(isMobile.detectMobile() ){
	    	$('body').removeClass('initial-hide').addClass('fade-in');	
	    }
	    else{
		    $('#teaser-video')[0].play();
		}


	//Intro Animation

		function intro(){
			colorBlock.addClass('is-transitioning to-home');
			tm.set('#preloader', {className:'+=blur-out', delay:.5});
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

		function bindPage(){
			scrollstart=1;
			setTimeout(function(){
				var status=0,
					touchReg = false;

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
	            	$('body').bind('mousewheel keydown swipe', function(e) {
						console.log('working');

	                    if (status === 0) {
	                        
	                        if(e.deltaY < 0 || e.keyCode === 40  || e.keyCode === 39) {
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

	                        } else if(e.deltaY > 0 || e.keyCode === 38  || e.keyCode === 37){

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

	                        } else {
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


		function startHappinessPage(){
			colorBlock.removeClass('to-home to-connection to-peace to-confidence to-freedom').addClass('is-transitioning to-happiness');
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
			},1800);
		}

		function startConnectionPage(){
			colorBlock.removeClass('to-home to-happiness to-peace to-confidence to-freedom').addClass('is-transitioning to-connection');
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
			},1800);
		}

		function startPeacePage(){
			colorBlock.removeClass('to-home to-happiness to-connection to-confidence to-freedom').addClass('is-transitioning to-peace');
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
			},1800);
		}

		function startConfidencePage(){
			colorBlock.removeClass('to-home to-happiness to-connection to-peace to-freedom').addClass('is-transitioning to-confidence');
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
			},1800);
		}

		function startFreedomPage(){
			colorBlock.removeClass('to-home to-happiness to-connection to-peace to-confidence').addClass('is-transitioning to-freedom');
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
			},1800);
		}

		$("#happiness-dropdown > li > ul > li:eq(0)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startHappinessPage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#happiness-video-page .dot-1").trigger("click");
			});
		});

		$("#happiness-dropdown > li > ul > li:eq(1)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startHappinessPage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#happiness-video-page .dot-2").trigger("click");
			});
		});

		$("#happiness-dropdown > li > ul > li:eq(2)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startHappinessPage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#happiness-video-page .dot-3").trigger("click");

			});
		});

		$("#connection-dropdown > li > ul > li:eq(0)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startConnectionPage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#connection-video-page .dot-1").trigger("click");
			});
		});

		$("#connection-dropdown > li > ul > li:eq(1)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startConnectionPage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#connection-video-page .dot-2").trigger("click");
			});
		});

		$("#peaceofmind-dropdown > li > ul > li:eq(0)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startPeacePage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#peaceofmind-video-page .dot-1").trigger("click");
			});
		});

		$("#peaceofmind-dropdown > li > ul > li:eq(1)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startPeacePage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#peaceofmind-video-page .dot-2").trigger("click");
			});
		});

		$("#confidence-dropdown > li > ul > li:eq(0)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startConfidencePage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#confidence-video-page .dot-1").trigger("click");
			});
		});

		$("#confidence-dropdown > li > ul > li:eq(1)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startConfidencePage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#confidence-video-page .dot-2").trigger("click");
			});
		});

		$("#freedom-dropdown > li > ul > li:eq(0)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startFreedomPage();
			$('body').addClass('is-not-scrollable');
		});

		$("#freedom-dropdown > li > ul > li:eq(1)").on('click', function(){
			$('.close-video').trigger('click');
			$('.nav-trigger').trigger('click');
			startFreedomPage();
			$('body').addClass('is-not-scrollable');
			setTimeout(function(){
				$("#freedom-video-page .dot-2").trigger("click");
			});
		});



		$("#happiness-square").on('click', function(){
			startHappinessPage();
			$('body').addClass('is-not-scrollable');
		});

		$("#connection-square").on('click', function(){
			startConnectionPage();
			$('body').addClass('is-not-scrollable');
		});

		$("#peaceofmind-square").on('click', function(){
			startPeacePage();
			$('body').addClass('is-not-scrollable');
		});

		$("#confidence-square").on('click', function(){
			startConfidencePage();
			$('body').addClass('is-not-scrollable');
		});

		$("#freedom-square").on('click', function(){
			startFreedomPage();
			$('body').addClass('is-not-scrollable');
		});


		$('.enter-site-link, #skip-intro').on('click', function(){
			clearTimeout(regIntro);
			intro();
		});

		$('.nav-trigger').on('click', function(){
			$('li.has-children > ul, ul.dropdown').removeClass('is-open');
			$('li.has-children .dropdown-btn').removeClass('is-rotated');
			$('#menu').toggleClass('is-on-screen-X');
			$('.site-container').toggleClass('move-over');
			$('.close-menu').toggleClass('show');
		});
		$('.close-trigger').on('click', function(){
			$('.nav-trigger').trigger('click');
		})

		$('#menu > li > span').on('click', function(){
			if ($(this).parent().children('ul').hasClass('dropdown') && !$(this).children('ul').hasClass('is-open')){
				$(this).parent().children('ul.dropdown').toggleClass('is-open');
			}
		});

		$('.dropdown > li.has-children > .invisible-dropdown-btn').on("click", function() {
			$(this).parent().siblings().find('ul').toggleClass("is-open");
			$(this).parent().find('ul').stop(true, false, true).toggleClass('is-open');
			$(this).find('img').toggleClass('is-rotated');
			return false;
		});

		$("#home-link").on('click', function(){
			$('.nav-trigger').trigger('click');
			$('.close-video').trigger('click');
			colorBlock.removeClass('to-happiness to-connection to-peace to-confidence to-freedom').addClass('is-transitioning to-home');
			$('body').unbind();
			$('body').removeClass('is-not-scrollable');
			setTimeout(function(){
				$('#resources, .sub-content-container').removeClass('is-active-section').addClass('is-inactive-section');
				$('.content-container').removeClass('is-inactive-section').addClass('is-active-section');
				$('.video-page').removeClass('video-page-is-active');
				setTimeout(function(){
					$("#happiness-video-page .dot-1").trigger("click");
				}, 500);	
			}, 1000);
			setTimeout(function(){
				colorBlock.removeClass('is-transitioning');
			},1800);
			
		});

		$("#resources-link").bind('click touchend', function(){
			$('.nav-trigger').trigger('click');
			$('.content-container, .sub-content-container').removeClass('is-active-section').addClass('is-inactive-section');
			$('#resources').removeClass('is-inactive-section').addClass('is-active-section');
			$('body').removeClass('is-not-scrollable');
		});


		$('.video-play').on('click touchend', function(){
			videoPlay = 1;
			$('body').unbind();

			var videoID = $(this).parents('.page').find('video').attr('id'), 
				progressID = $(this).parents('.page').find('.progress-bar').attr('id'),
				video = $(this).parents('.page').find('video'),
				progress = $(this).parents('.page').find('.progress-bar'), 
				rewind = $(this).parents('.page').find('.rewind-video'), 
				playPause = $(this).parents('.page').find('.play-pause-video'), 
				fforward = $(this).parents('.page').find('.fastforward-video'),
				close = $(this).parents('.page').find('.close-video'); 

			// alert($(this).parents('.page').find('video').attr('id'));
			$(this).parents('.page').find('.video').removeClass('fade-out').addClass('fade-in');
			$(this).parents('.page').find('.video-controls').removeClass('fade-out').addClass('fade-in');
			$(this).parents('.page').find('.video-controls').find('input[type="range"]').removeClass('fade-out').addClass('fade-in');
			$(this).parents('.page').find('.close-video').removeClass('fade-out').addClass('bring-to-front');
			$(this).parents('.page').find('.overlay').removeClass('fade-in').addClass('fade-out');
			$(this).parents('.main-page').addClass('fade-out');
			$(this).parents('.section').find('.main-page-dots').addClass('fade-out');
			$(this).parents('.video-page').find('.top-square:first-child').addClass('fade-out');
			$(this).parents('.video-page').find('.social-media-hub').addClass('fade-out');

			$video = document.getElementById(videoID);
			var $progressBar = document.getElementById(progressID);

			setTimeout(function(){
				$video.playbackRate = 1.0;
				$video.play();
				var duration = $video.duration;
				// var progressLength = $(this).parents('.page').find('.progress-bar').

				var clicked;
				var intervalRewind;
				clicked=0;
				function updateProgressBar() {
				   var value = Math.round(($video.currentTime * 100) / duration);
				    $progressBar.value = value;
				    $('.fade-in .progress-bar').attr('value', value);
				    // console.log('progress value: ' + $progressBar.value);
				}

				$video.addEventListener("timeupdate", function() {
					updateProgressBar();
				});

				$video.addEventListener("ended", function() {
					$(this).parents('.page').find('.next-video').addClass('start-countdown');
					countdown();
				});

				playPause.on('click', function(){
					if ($video.paused == false) {
					    $video.pause();
					    $video.playbackRate = 1.0;
						clearInterval(intervalRewind);
					  } 
					else {
				  		$video.playbackRate = 1.0;
						clearInterval(intervalRewind);
				    	$video.play();
					}
				});
				fforward.on('click', function() { // button function for 3x fast speed forward
				    $video.playbackRate = 3.0;
				});
				rewind.on('click', function() { // button function for rewind
				   intervalRewind = setInterval(function(){
				       $video.playbackRate = 1.0;
				       if($video.currentTime == 0){
				           clearInterval(intervalRewind);
				           $video.pause();
				       }
				       else{
				           $video.currentTime += -.1;
				       }
				    },30);
				});
				
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
				            clearInterval(timer);
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
		});

		$('.close-video').bind('click touchend', function(){
			if(videoPlay === 1){
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
				$(this).parents('.page').find('.next-video').removeClass('start-countdown');
			}
		});

		$('video').bind('webkitendfullscreen', function()
		{ 
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


		var clicked;

		$('.select-option').bind('click touchend', function() {

            var selectedText = $(this).text();

            $('#topic option').val(selectedText);
            $('.is-selected').html('<span>' + selectedText + '</span>');

            console.log($('#topic option').val());

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

        $('.story').bind('click touchend', function() {
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
        	$('.story-lightbox').removeClass('is-shown').addClass('fade-out');
        	$('.lightbox-dimmer').removeClass('is-shown').addClass('fade-out');

        	setTimeout(function(){
        		$('.story-lightbox').removeClass('fade-out');
        	 	$('.lightbox-dimmer').removeClass('fade-out');
        		$('.story-lightbox .individual-story-container').detach();
        	},1200);
        });

        $('.slide-dot').bind('click touchend', function(){

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
		});


        $(".dot-1").bind("click touchend", function() {
			$(this).addClass('selected');
			$(this).siblings().removeClass('selected');
			$(this).parents(".section-1").find(".page-1").removeClass('make-next is-next-page is-previous-page').addClass('is-current-page');
			$(this).parents(".section-1").find(".page-2").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
			$(this).parents(".section-1").find(".page-3").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
		});

		$(".dot-2").bind("click touchend", function(){
			$(this).addClass('selected');
			$(this).siblings().removeClass('selected');
			$(this).parents(".section-1").find(".page-2").removeClass('is-next-page is-previous-page').addClass('is-current-page');
			$(this).parents(".section-1").find(".page-3").removeClass('is-current-page is-next-page is-previous-page').addClass('is-next-page');
			$(this).parents(".section-1").find(".page-1").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');

		});

		$(".dot-3").bind("click touchend", function(){
			$(this).addClass('selected');
			$(this).siblings().removeClass('selected');
			$(this).parents(".section-1").find(".page-3").removeClass('is-next-page is-previous-page').addClass('is-current-page');
			$(this).parents(".section-1").find(".page-2").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');
			$(this).parents(".section-1").find(".page-1").removeClass('is-current-page is-next-page is-previous-page').addClass('is-previous-page');

		});

		$(".right-arrow").bind("click touchend", function() {
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
			
		});

		$(".left-arrow").bind("click touchend", function() {
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
			
		});
		

	
	//Set Slides to proper positions
	
//		$(window).on('load', function(){

				       
			// Check Slide Down Function
			
				function happinessSlideDown(){

		      		//if a user slides down while on the M slide do this
		      		
					if($('#happiness-video-page .section-1').hasClass('is-current-section') && $('#happiness-video-page').hasClass('video-page-is-active')) {
						// pauseVideo();
						setTimeout(function(){

							tm.set('#happiness-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#happiness-video-page .section-1', {className:'section section-1 is-previous-section'});
							tm.set('#happiness-top-square', {className:'+=opaque is-shown', delay:1});
							tm.set('#happiness-social-media-hub .media-container', {className:'+=is-green'});	
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

			// Check Slide Up Function
				
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
						}, 500);
					}

					else if($('#happiness-video-page .section-3').hasClass('is-current-section') && $('#happiness-video-page').hasClass('video-page-is-active')) {
						setTimeout(function(){
							tm.set('#happiness-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#happiness-video-page .section-3', {className:'section section-3 is-next-section'});
						}, 500);
					}

			    }

			    function connectionSlideDown(){

		      		//if a user slides down while on the M slide do this
		      		
					if($('#connection-video-page .section-1').hasClass('is-current-section') && $('#connection-video-page').hasClass('video-page-is-active')) {
						// pauseVideo();
						setTimeout(function(){

							tm.set('#connection-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#connection-video-page .section-1', {className:'section section-1 is-previous-section'});
							tm.set('#connection-top-square', {className:'+=opaque is-shown', delay:1});
							tm.set('#connection-social-media-hub .media-container', {className:'+=is-orange'});
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

			// Check Slide Up Function
				
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
						}, 500);
					}

					else if($('#connection-video-page .section-3').hasClass('is-current-section') && $('#connection-video-page').hasClass('video-page-is-active')) {
						setTimeout(function(){
							tm.set('#connection-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#connection-video-page .section-3', {className:'section section-3 is-next-section'});
						}, 500);
					}

			    }

			    function peaceSlideDown(){

		      		//if a user slides down while on the M slide do this
		      		
					if($('#peaceofmind-video-page .section-1').hasClass('is-current-section') && $('#peaceofmind-video-page').hasClass('video-page-is-active')) {
						// pauseVideo();
						setTimeout(function(){
							tm.set('#peaceofmind-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#peaceofmind-video-page .section-1', {className:'section section-1 is-previous-section'});
							tm.set('#peaceofmind-top-square', {className:'+=opaque is-shown', delay:1});
							tm.set('#peaceofmind-social-media-hub .media-container', {className:'+=is-blue'});	
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

			// Check Slide Up Function
				
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
						}, 500);
					}

					else if($('#peaceofmind-video-page .section-3').hasClass('is-current-section') && $('#peaceofmind-video-page').hasClass('video-page-is-active')) {
						setTimeout(function(){
							tm.set('#peaceofmind-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#peaceofmind-video-page .section-3', {className:'section section-3 is-next-section'});
						}, 500);
					}

			    }

			    function confidenceSlideDown(){

		      		//if a user slides down while on the M slide do this
		      		
					if($('#confidence-video-page .section-1').hasClass('is-current-section') && $('#confidence-video-page').hasClass('video-page-is-active')) {
						// pauseVideo();
						setTimeout(function(){
							tm.set('#confidence-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#confidence-video-page .section-1', {className:'section section-1 is-previous-section'});
							tm.set('#confidence-top-square', {className:'+=opaque is-shown', delay:1});
							tm.set('#confidence-social-media-hub .media-container', {className:'+=is-lime'});
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

			// Check Slide Up Function
				
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
						}, 500);
					}

					else if($('#confidence-video-page .section-3').hasClass('is-current-section') && $('#confidence-video-page').hasClass('video-page-is-active')) {
						setTimeout(function(){
							tm.set('#confidence-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#confidence-video-page .section-3', {className:'section section-3 is-next-section'});
						}, 500);
					}

			    }

			    function freedomSlideDown(){

		      		//if a user slides down while on the M slide do this
		      		
					if($('#freedom-video-page .section-1').hasClass('is-current-section') && $('#freedom-video-page').hasClass('video-page-is-active')) {
						// pauseVideo();
						setTimeout(function(){

							tm.set('#freedom-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#freedom-video-page .section-1', {className:'section section-1 is-previous-section'});
							tm.set('#freedom-top-square', {className:'+=opaque is-shown', delay:1});	
							tm.set('#freedom-social-media-hub .media-container', {className:'+=is-pink'});
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

			// Check Slide Up Function
				
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
						}, 500);
					}

					else if($('#freedom-video-page .section-3').hasClass('is-current-section') && $('#freedom-video-page').hasClass('video-page-is-active')) {
						setTimeout(function(){
							tm.set('#freedom-video-page .section-2', {className:'section section-2 is-current-section'});
							tm.set('#freedom-video-page .section-3', {className:'section section-3 is-next-section'});
						}, 500);
					}

			    }




	//Hover Events


});



