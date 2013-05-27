$(document).scroll(function(e){
	var per=($(window).scrollTop()/1100)*100;
	if(per>55)
		{
		$('.fixed-menu').css('display','block');
		$('.float-menu').css('display','none');
		}
	else{
		$('.fixed-menu').css('display','none');
		$('.float-menu').css('display','block');
	}
	console.log(per);
});
