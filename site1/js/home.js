(function(){
	updateInstagramBloc();	
	//window.setInterval("updateInstagramBloc()", 5000);
});

function updateInstagramBloc(){
	//chargement ajax photos instagram
	var instagramRoute = $('#gallery_instagram').attr('route');
	$.post(instagramRoute, {}, 
		function(data){
			if (data != undefined){

				$('#gallery_instagram_temp').remove();
				$('#gallery_instagram').before("<span id='gallery_instagram_temp'></span>");
				$('#gallery_instagram_temp').hide().append(data);

				//suppression d'images			
				$('#gallery_instagram figure a').each(function(){

					var href = $(this).attr('href');
					var isExisting = $('#gallery_instagram_temp').find('a[href="'+href+'"]').size();
					if (isExisting == 0)
						$(this).fadeOut(function(){$(this).remove();});
				});

				//ajout d'image		
				var data2 = "";
				$('#gallery_instagram_temp figure a').each(function(){
					var href = $(this).attr('href');						
					var isExisting = $('#gallery_instagram').find('a[href="'+href+'"]').size();
					if (isExisting == 0){
						$('#gallery_instagram').prepend($(this).parent('figure').clone().wrap('<figure>').parent().html());
						$('#gallery_instagram figure a[href="'+href+'"] img').fadeIn();
					}
				});		
			}
		},
		'html'
	);
}

(function(){
	$(window).scrollTop(0);
});
$(window).load(function(){
					enquire.register("screen and (min-width:900px)", {
							match : function(){ 		
								$('#gall-home #gallery_instagram').css({width:20000});
								$('#imgs').css({width:20000});
							}
					}).listen();	
					enquire.register("screen and (max-width:900px)", {
							match : function(){ 
								updateInstagramBloc();		
								var widthInsta = $('#gallery_instagram .figure').length;
								$('#gall-home #gallery_instagram').css({width:widthInsta * 306});
								
								var widthTwit = $('.bigtwit .article').length;
								$('#imgs').css({width:(widthTwit * 306) + 23});
							}
					}).listen();	
});
$(function(){							
	var noMobileWidth = $(window).width();
	if(noMobileWidth > 900){
			var windowHeight = $(window).height();
	
			$('#nav-top').waypoint(function(event, direction) {
			   if (direction === 'down') {					
					jaugeSlider = 100;
					stop_Int();
					$('#jauge').css({display:'none'});
					//$('#jauge').css({display:'none'}).css({display:'block', height: 0+'%'});
					$('#jauge').fadeOut(200, function(){
						//$(this).css({display:'block', height: 0+'%'});
					});
					$('#timer').addClass('blue');
					noInterval = true;
					noBanner = true;
					enquire.register("screen and (min-width:900px)", {
							match : function(){ 		
								$('#logo').animate({top:10});
							}
					}).listen();				
			   }
			   else {
					start_Int();
					$('#jauge').css({display:'none'}).css({display:'block', height: 0+'%'});
					$('#timer').removeClass('blue');
					noInterval = false;
					noBanner = false;
					enquire.register("screen and (min-width:900px)", {
							match : function(){ 		
								$('#logo').animate({top:20});
							}
					}).listen();					
			   }
			});	
	
			$('#twitter-home').waypoint(function(event, direction) {
				 if (direction === 'down') {
					animtTwit();
				}
			}, {
				offset: 'bottom-in-view',
				triggerOnce: true
			});

			$('#footer').waypoint(function(event, direction) {
				animLogoFooter();
			}, {
				offset: 'bottom-in-view',
				triggerOnce: true
			});
	
	
			$(window).scroll(function() { 
				var myScrollTop = $(this).scrollTop();                
		        if (myScrollTop > 440) {
					$('.header').addClass('fixed-header');
				}                                
				else{$('.header').removeClass('fixed-header');} 
			});
	
	
			//block twitter
			$('#hover-twit').hover(function(){
				$(this).find('#left-twitter').stop().animate({left:0}, 500, 'easeInOutCubic');
				$('.btn-twitter .twitter-follow-button').stop().delay(300).fadeIn(200);
			}, function(){
				$('.btn-twitter .twitter-follow-button').stop().fadeOut(100);
				$(this).find('#left-twitter').stop().animate({left:-152}, 500, 'easeInOutCubic');
			});
			$("#hover-twit").live("click", function(){  
				 //window.location=$(this).find('.mybtntwit').find('#follow-button').attr("href");
				
				var myCible = "https://twitter.com/intent/follow?original_referer=http%3A%2F%2Fpreprod.wise-digital.com%2F&region=follow_link&screen_name=agencewise&tw_p=followbutton&variant=2.0"
				window.open(myCible);
			});
	}
});

function animtTwit(){
	$('#hover-twit').find('#left-twitter').animate({left:0}, 500, 'easeInOutCubic');
		$('.btn-twitter .twitter-follow-button').delay(300).fadeIn(200, function(){
			$('.btn-twitter .twitter-follow-button').delay(300).fadeOut();
			$('#hover-twit').find('#left-twitter').delay(500).animate({left:-152}, 500, 'easeInOutCubic');
		});
}
function animLogoFooter(){
	$('#footer .left-footer').find('img').animate({top: 0, opacity: 1}, 'easeInOutCubic');
}


/*---gestion du swipe----*/
/*
	var IMG_WIDTH = 306;
	var currentImg=0;
	var maxImages=8;
	var speed=500;
	var imgs;
		
	var swipeOptions= 
	{
		triggerOnTouchEnd : true,	
		swipeStatus : swipeStatus,
		allowPageScroll:"vertical",
		threshold:20			
		}
	
	$(function()
	{	
		maxImages= $('#twitter-home').find('.article').length;	
		imgs = $("#imgs");
		imgs.swipe( swipeOptions );
	});
		
	function swipeStatus(event, phase, direction, distance)
	{
		if( phase=="move" && (direction=="left" || direction=="right") )
		{
			var duration=0;
			
			if (direction == "left")
				scrollImages((IMG_WIDTH * currentImg) + distance, duration);
			
			else if (direction == "right")
				scrollImages((IMG_WIDTH * currentImg) - distance, duration);
			
		}
		
		else if ( phase == "cancel")
		{
			scrollImages(IMG_WIDTH * currentImg, speed);
		}
		
		else if ( phase =="end" )
		{
			if (direction == "right")
				previousImage()
			else if (direction == "left")			
				nextImage()
		}
	}
						
				
			
	function previousImage()
	{
		currentImg = Math.max(currentImg-1, 0);
		scrollImages( IMG_WIDTH * currentImg, speed);
	}

	function nextImage()
	{
		currentImg = Math.min(currentImg+1, maxImages-1);
		scrollImages( IMG_WIDTH * currentImg, speed);
	}
		
	function scrollImages(distance, duration)
	{
		imgs.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
		var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
		imgs.css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
	}

*/


/*---gestion du swipe insta----*/

	var IMG_WIDTH_insta = 306;
	var currentImgInsta=0;
	var maxImagesInsta=2;
	var speed=300;
	var sInsta;
		
	var swipeInsta= 
	{
		triggerOnTouchEnd : true,	
		swipeStatus : swipeStatusInsta,
		allowPageScroll:"vertical",
		threshold:75			
		}
	
	
		
	$(window).load(function(){
		maxImagesInsta= $('#gallery_instagram .figure').length;
		sInsta = $("#insta-swipe");
		sInsta.swipe( swipeInsta );
	});
	$(function()
	{	

	});
		
	function swipeStatusInsta(event, phase, direction, distance)
	{		
		if( phase=="move" && (direction=="left" || direction=="right") )
		{
			var duration=0;
			if (direction == "left"){
				scrollImagesInsta((IMG_WIDTH_insta * currentImgInsta) + distance, duration);
			}
				
			
			else if (direction == "right"){
				scrollImagesInsta((IMG_WIDTH_insta * currentImgInsta) - distance, duration);
			}
		}
		
		else if ( phase == "cancel")
		{
			scrollImagesInsta(IMG_WIDTH_insta * currentImgInsta, speed);
		}
		
		else if ( phase =="end" )
		{
			if (direction == "right"){
				previousImageInsta();	
			}
				
			else if (direction == "left"){
				nextImageInsta();
			}			
		}
	}
						
				
			
	function previousImageInsta()
	{
		currentImgInsta = Math.max(currentImgInsta-1, 0);
		scrollImagesInsta( IMG_WIDTH_insta * currentImgInsta, speed);
	}

	function nextImageInsta()
	{
		currentImgInsta = Math.min(currentImgInsta+1, maxImagesInsta-1);
		scrollImagesInsta( IMG_WIDTH_insta * currentImgInsta, speed);
	}
		
	function scrollImagesInsta(distance, duration)
	{
		$('#gallery_instagram').css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
		var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
		$('#gallery_instagram').css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
	}

	/*-----------------------*/
	
	var IMG_WIDTH = 306;
	var currentImg=0;
	var maxImages=8;
	var speed=500;
	var imgs;
		
	var swipeOptions= 
	{
		triggerOnTouchEnd : true,	
		swipeStatus : swipeStatus,
		allowPageScroll:"vertical",
		threshold:20			
		}
	
	$(function()
	{	
		maxImages= $('#imgs .article').length;
		imgs = $("#imgs");
		imgs.swipe( swipeOptions );
	});
		
	function swipeStatus(event, phase, direction, distance)
	{
		if( phase=="move" && (direction=="left" || direction=="right") )
		{
			var duration=0;
			
			if (direction == "left"){
				scrollImages((IMG_WIDTH * currentImg) + distance, duration);
			}
				
			
			else if (direction == "right"){
				scrollImages((IMG_WIDTH * currentImg) - distance, duration);
			}
				
			
		}
		
		else if ( phase == "cancel")
		{
			scrollImages(IMG_WIDTH * currentImg, speed);
		}
		
		else if ( phase =="end" )
		{
			if (direction == "right")
				previousImage()
			else if (direction == "left")			
				nextImage()
		}
	}
						
				
			
	function previousImage()
	{
		currentImg = Math.max(currentImg-1, 0);
		scrollImages( IMG_WIDTH * currentImg, speed);
	}

	function nextImage()
	{
		currentImg = Math.min(currentImg+1, maxImages-1);
		scrollImages( IMG_WIDTH * currentImg, speed);
	}
		
	function scrollImages(distance, duration)
	{
		imgs.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
		var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
		imgs.css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
	}