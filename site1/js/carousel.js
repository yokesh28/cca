var carousel_large = 0;
var carousel_max = 0;
var carousel_slider_index = 0;
var nb_elem_fin = 1;  
var longSlide = 2000; 
var noInterval = false;
var noBanner = false;
var noRoll = false;

var timeSlide = 8000;
var percentTimer = timeSlide/100;
var jaugeSlider = 100;

$(function(){
	//initCarousel();
	enquire.register("screen and (max-width:1400px)", {
		match : function(){ 		
			$('.bord').fadeOut();
		}
	}).listen();	
	enquire.register("screen and (min-width:1401px)", {
		match : function(){ 		
			$('.bord').fadeIn();
		}
	}).listen();
	
});

function initCarousel(){	
	centerText();	
	start_Int();
	carouselResize();
	//setInterval('carouselResize()', 100);
	$(window).resize(function(){
			carouselResize();
			$('ul#carousel-content').css({left: large_move+'px'});
	});
	$('ul#carousel-content li').each(function(){
		var index_item = $('ul#carousel-content li').index(this);
		$(this).addClass('index-'+index_item);  
		$('#bullet').append('<p></p>');
	});
	carousel_max = jQuery("ul#carousel-content li").length; 
	$("ul#carousel-content li:first-child").clone().appendTo('ul#carousel-content'); 
	$('#bullet p').each(function(){
		var index_bullet = $('#bullet p').index(this);
		$(this).addClass('index-bullet-'+index_bullet);  
	});	
	$('.index-bullet-'+carousel_slider_index).addClass('selected-bullet');
	
	$('#bullet p').live("click", function(){
		if(noBanner == false && noInterval == false){
			carousel_slider_index = $(this).attr('class').substring('13');
			jaugeSlider = 100;
			clickBullet();
			stop_Int();
			$('#jauge').fadeOut(1000, function(){
				$(this).css({display:'block', height: 0+'%'});
			});
		}		
	});
	
	$('#timer').hover(function(){
		if(noBanner == false){
			$('.roll').addClass('hover');
		}
	}, function(){
		$('.roll').removeClass('hover');
	});
	
	$('#timer').find('.roll').live("click", function(){
		if(noBanner == false && noInterval == false){
			jaugeSlider = 100;
			carousel_slide_next();
			stop_Int();
			$('#jauge').fadeOut(1000, function(){
				$(this).css({display:'block', height: 0+'%'});
			});
		}	
	});
}


function carousel_slide_next(){      
	noInterval = true;
    if (carousel_slider_index < (carousel_max-nb_elem_fin)){
        carousel_slider_index++;
    	carousel_update();               
	}        
	else{         
		carousel_slider_index++; 
		carousel_large = $(window).width();    
	    large_move = -carousel_max*carousel_large;
		$('ul#carousel-content').animate({left: large_move+'px'}, longSlide, 'easeOutCubic', function() {
		    carousel_slider_index = 0; 
			$('ul#carousel-content').css({left: 0}); 
			if(noBanner == false && noRoll == false){
				start_Int();
			}
			noInterval = false; 
		});   
		$('.index-0').find('.carousel-text').animate({right: 0+'px'}, 2000, 'easeOutCubic'); 
		$('.index-'+(carousel_slider_index - 1)).find('.carousel-text').animate({left: 800+'px'}, 2000, 'easeOutCubic', function(){
			$('.right-img').find('.carousel-text').css({right: 0+'px'});
		});
		$('#bullet p').removeClass('selected-bullet');
		$('.index-bullet-0').addClass('selected-bullet');	
	}
}


function carousel_update(){          
	carousel_large = $(window).width();    
    large_move = -carousel_slider_index*carousel_large;/*carousel_large*/
    
	$('ul#carousel-content').animate({left: large_move+'px'}, longSlide, 'easeOutCubic');
	if($('.index-'+carousel_slider_index).is('.right-img')){
		//$('.index-'+carousel_slider_index).find('.carousel-image').animate({left:538}, 2500);
		//$('.index-'+(carousel_slider_index - 1)).find('.carousel-image').animate({left:538}, 2500);
		$('.index-'+carousel_slider_index).find('.carousel-text').animate({left: 20+'px'}, 2000, 'easeOutCubic', function(){
			if(noBanner == false && noRoll == false){
				start_Int();
			} 
			noInterval = false;
		}); 
		$('.index-'+(carousel_slider_index - 1)).find('.carousel-text').animate({right: 500+'px'}, 2000, 'easeOutCubic', function(){
			$('.left-img').find('.carousel-text').css({right:500+'px'});
		});
	}
	else{
		$('.index-'+carousel_slider_index).find('.carousel-text').animate({right: 0+'px'}, 2000, 'easeOutCubic'); 
		$('.index-'+(carousel_slider_index - 1)).find('.carousel-text').animate({left: 800+'px'}, 2000, 'easeOutCubic', function(){
			$('.right-img').find('.carousel-text').css({right: 0+'px'});
			if(noBanner == false && noRoll == false){
				start_Int();
			}
			noInterval = false;
		});		
	}
	$('#bullet p').removeClass('selected-bullet');
	$('.index-bullet-'+carousel_slider_index).addClass('selected-bullet');
}

function clickBullet(){	
	carousel_large = $(window).width();    
    large_move = -carousel_slider_index*carousel_large;/*carousel_large*/
    
	$('ul#carousel-content').animate({left: large_move+'px'}, 2000, 'easeOutCubic');
	if($('.index-'+carousel_slider_index).is('.right-img')){
		//$('.index-'+carousel_slider_index).find('.carousel-img').animate({right:0}, 1800);
		$('.index-'+carousel_slider_index).find('.carousel-text').animate({left: 0+'px'}, 2000, 'easeOutCubic', function(){
			if(noBanner == false && noRoll == false){
				start_Int();
			} 
			noInterval = false;
		}); 
		$('.index-'+(carousel_slider_index - 1)).find('.carousel-text').animate({right: 500+'px'}, 2000, 'easeOutCubic', function(){
			$('.left-img').find('.carousel-text').css({right:500+'px'});
		});
	}
	else{
		$('.index-'+carousel_slider_index).find('.carousel-text').animate({right: 0+'px'}, 2000, 'easeOutCubic'); 
		$('.index-'+(carousel_slider_index - 1)).find('.carousel-text').animate({left: 800+'px'}, 2000, 'easeOutCubic', function(){
			$('.right-img').find('.carousel-text').css({right: 0+'px'});
			if(noBanner == false && noRoll == false){
				start_Int();
			}
			noInterval = false;
		});		
	}
	$('#bullet p').removeClass('selected-bullet');
	$('.index-bullet-'+carousel_slider_index).addClass('selected-bullet');	
}

function timerSlider(){
	if(jaugeSlider == 0){
		jaugeSlider = 100;
		carousel_slide_next();
		stop_Int();
		if(noBanner == false && noInterval == false){
			$('#jauge').fadeOut(1000, function(){
				$(this).css({display:'block', height: 100+'%'});
			});
		}
	}
	else{
		jaugeSlider--;	
		$('#jauge').css({height: jaugeSlider+'%'});
	}
}
function start_Int(){
      intval = window.setInterval("timerSlider()",percentTimer);
}
function stop_Int(){
      window.clearInterval(intval);
}


function carouselResize(){
		carousel_large = $(window).width();
		large_move = -carousel_slider_index*carousel_large;
		$('.width-carousel').width(carousel_large);
		$('#carousel').width(carousel_large);
		$('#carousel-content li').width(carousel_large);
		
}

/*----------------centrage vertical des textes---------------------------*/

function centerText(){
	$('.carousel-text').each(function(){
		heightText = $(this).css('height');
		newHeight = parseInt(heightText);
		$(this).css({
			top: '50%',
			marginTop: -newHeight/2
		});	
	});
	 	
}


//EASING
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	}
});
