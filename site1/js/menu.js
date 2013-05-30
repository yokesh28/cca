$(function(){
		var paper = new Raphael(document.getElementById('menu-roll'),862 ,18);

		var rollItem1 = paper.path('M0 0l95 0l-59 0z');
		rollItem1.attr({
			fill: '#121B2D',
			"stroke-width": 0
		});
		
		var rollItem2 = paper.path('M165 0l115 0l-20 0z');
		rollItem2.attr({
			fill: '#121B2D',
			"stroke-width": 0
		});
		
		var rollItem3 = paper.path('M340 0l97 0l-27 0z');
		rollItem3.attr({
			fill: '#121B2D',
			"stroke-width": 0
		});
		
		var rollItem4 = paper.path('M545 0l124 0l-76 0z');
		rollItem4.attr({
			fill: '#121B2D',
			"stroke-width": 0
		});
		
		var rollItem5 = paper.path('M708 0l124 0l-29 0z');
		rollItem5.attr({
			fill: '#121B2D',
			"stroke-width": 0
		});
		
		/*---------------*/

		$('#nav-item-1 a:not(.selected)').hover(function(){
			rollItem1.animate({
				path: 'M0 0l95 0l-59 13z'
			}, 200);			
		}, function(){
			rollItem1.animate({
				path: 'M0 0l95 0l-59 0z'
			}, 200);			
		});
		
		$('#nav-item-2 a:not(.selected)').hover(function(){
			rollItem2.animate({
				path: 'M165 0l115 0l-20 18z'
			}, 200);			
		}, function(){
			rollItem2.animate({
				path: 'M165 0l115 0l-20 0z'
			}, 200);			
		});
		
		$('#nav-item-3 a:not(.selected)').hover(function(){
			rollItem3.animate({
				path: 'M340 0l97 0l-27 13z'
			}, 200);			
		}, function(){
			rollItem3.animate({
				path: 'M340 0l97 0l-27 0z'
			}, 200);			
		});
		
		$('#nav-item-4 a:not(.selected)').hover(function(){
			rollItem4.animate({
				path: 'M545 0l124 0l-76 13z'
			}, 200);			
		}, function(){
			rollItem4.animate({
				path: 'M545 0l124 0l-76 0z'
			}, 200);			
		});
		
		$('#nav-item-5 a:not(.selected)').hover(function(){
			rollItem5.animate({
				path: 'M708 0l124 0l-29 13z'
			}, 200);			
		}, function(){
			rollItem5.animate({
				path: 'M708 0l124 0l-29 0z'
			}, 200);			
		});
			
		animteCurrItem();
		function animteCurrItem(){
				var selectedId = $('#nav-top').find('a.selected').parent().attr('id');
				if($('#carousel').length == 0 && selectedId){
					var findMyItem = selectedId.substring(9);
					switch (findMyItem) {
					 	case '1':
							rollItem1.animate({
								path: 'M0 0l95 0l-59 13z'
							}, 200);	
					 	break;
					 	case '2':
							rollItem2.animate({
								path: 'M165 0l115 0l-20 18z'
							}, 200);
					 	break;
					 	case '3':
							rollItem3.animate({
								path: 'M340 0l97 0l-27 13z'
							}, 200);
					 	break;
					 	case '4':
							rollItem4.animate({
								path: 'M545 0l124 0l-76 13z'
							}, 200);
					 	break;
					 	case '5':
							rollItem5.animate({
								path: 'M708 0l124 0l-29 13z'
							}, 200);
					 	break;				
					 	default: 
					 	break;
					}
				}
				else{
					
				}	
		}									
});/*--fin onload--*/