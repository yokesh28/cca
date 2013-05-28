$(document).scroll(function(e) {
	var per = ($(window).scrollTop() / 1100) * 100;
	if (per > 55) {
		$('.fixed-menu').css('display', 'block');
		$('.float-menu').css('display', 'none');
	} else {
		$('.fixed-menu').css('display', 'none');
		$('.float-menu').css('display', 'block');
	}

	console.log(per);

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
