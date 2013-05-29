$(document).scroll(function(e) {
	var per = ($(window).scrollTop() / 1100) * 100;
	if (per > 55) {
		$('.float-menu').css({'position': 'fixed', 'z-index': '5'});
		
	} else {
		$('.float-menu').css({'position': 'static', 'z-index': '5'});
	}

console.log(per);
if(per > 55 && per <= 127)
	{
	$('ul.right').find('li').removeClass('active');
	$("ul.right li:first-child").addClass('active');
	}
else if(per > 128 && per <= 186)
{
	$('ul.right').find('li').removeClass('active');
	$("ul.right li:nth-child(2)").addClass('active');
	}
else if(per > 187 && per <= 252)
{
	$('ul.right').find('li').removeClass('active');
	$("ul.right li:nth-child(3)").addClass('active');
	}
else if(per > 253 && per <= 310)
{
	$('ul.right').find('li').removeClass('active');
	$("ul.right li:nth-child(4)").addClass('active');
	}
else if(per > 311)
{
	$('ul.right').find('li').removeClass('active');
	$("ul.right li:nth-child(5)").addClass('active');
	}
else
	{
	$('ul.right').find('li').removeClass('active');
	}

});

function scrollToElement(selector, time, verticalOffset) {
	time = typeof (time) != 'undefined' ? time : 1000;
	verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset
			: 0;
	element = $(selector);
	offset = element.offset();
	offsetTop = offset.top + verticalOffset;
	$('html, body').animate({
		scrollTop : offsetTop
	}, time);
}



$(document).on('click', 'a[href*="#"]', function() {
	
	

	
	if (this.hash) {
		$.bbq.pushState('#/' + this.hash.slice(1));
		return false;
	}
}).ready(function() {
	$(window).bind('hashchange', function(event) {
		var tgt = location.hash.replace(/^#\/?/, '');
		if (document.getElementById(tgt)) {
			$.smoothScroll({
				scrollTarget : '#' + tgt
			});
		}
	});

	$(window).trigger('hashchange');
});


//JavaScript Document


$(window).load(function() { //DOM


 $(".pre-loader").fadeOut(1000);
 
 $("#homepage").fadeIn(2000);
 
 $(document).foundation();
});