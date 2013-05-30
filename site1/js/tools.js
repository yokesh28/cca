$(document).ready(function(){
	
	mailto();

	var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
	$(document).keydown(function(e) {
	  kkeys.push( e.keyCode );
	  if ( kkeys.toString().indexOf( konami ) >= 0 ){
	    $(document).unbind('keydown',arguments.callee);
		$('img').rotate(360);

	    /*
	    $.getScript('http://www.cornify.com/js/cornify.js',function(){
	      cornify_add();
	      $(document).keydown(cornify_add);
	    });  
	    */      
	  }
	});
});


function mailto(){

	 //safe mailto's
	 $('a[href*="[at]"][href*="[dot]"]').each(function() {
	  var email = $(this).attr('href').split('[at]').join('@').split('[dot]').join('.');
	  $(this).attr('href', email.toLowerCase());
	  if ($(this).text().length == 0) $(this).text(email);
	 });
}

(function($) {
        $.fn.rotate = function(degree, tempo, fraction) {

        	degree = degree||0;
        	tempo = tempo||1000;
        	fraction = fraction||0;
        	increment = 17*degree/tempo;
        	elem = $(this);

        	rotation = function(elem){
        		fraction += Math.round(increment);
        		if (fraction >= degree)
        			clearInterval(timer);
        		elem.each(function(){
		            $(this).css({
	                    '-webkit-transform': 'rotate(' + fraction + 'deg)',
	                    '-moz-transform': 'rotate(' + fraction + 'deg)',
	                    '-ms-transform': 'rotate(' + fraction + 'deg)',
	                    '-o-transform': 'rotate(' + fraction + 'deg)',
	                    'transform': 'rotate(' + fraction + 'deg)',
	                    'zoom': 1
		            });
	        	});
        	}
        	// Animate rotation with a recursive call
	        timer = setInterval(function() {
	            rotation(elem);
	        },17);
        };

})(jQuery);