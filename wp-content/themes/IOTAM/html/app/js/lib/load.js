//Preload Image & Video Content while Animating Load
		
		// number of loaded images for preloader progress 
		var loadedCount = 0; //current number of images loaded
		var thingsToLoad = $('.load').length; //number of slides with .bcg container
		var loadingProgress = 0; //timeline progress - starts at 0

		$('.load').imagesLoaded({
		    background: true
		  }
		).progress( function( instance, image ) {
			loadProgress();
		});

		function loadProgress(imgLoad, image)
		{
		 	//one more image has been loaded
			loadedCount++;

			loadingProgress = (loadedCount/thingsToLoad);

			//console.log(loadingProgress);

			// GSAP timeline for our progress bar
			TweenLite.to(progressTl, 1, {progress:loadingProgress, ease:Linear.easeNone});

		}

		//progress animation instance. the instance's time is irrelevant, can be anything but 0 to void  immediate render
		var progressTl = new TimelineMax({paused:true,onUpdate:progressUpdate,onComplete:loadComplete});

		progressTl
			//tween the progress bar width
			.to($('.progress span'), 1, {scaleX:1, transformOrigin:'left', ease:Linear.easeNone});

		//as the progress bar witdh updates and grows we put the precentage loaded in the screen
		function progressUpdate()
		{
			//the percentage loaded based on the tween's progress
			loadingProgress = Math.round(progressTl.progress() * 100);
			//we put the percentage in the screen
			$(".txt-perc").text(loadingProgress + '%');

		}

		function loadComplete() {
			setTimeout(function(){
				// preloader out
				var preloaderOutTl = new TimelineMax();

				preloaderOutTl
					.to($('#slides-container'), 1, {opacity:1})
					.set($('body'), {className: '-=is-loading'})

				return preloaderOutTl;
				var loading = $(document).find('.load');
				loading.removeClass('load').addClass('loaded');
			}, 1000);
			
		}
