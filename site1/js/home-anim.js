window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();


$(document).ready(function() {	

	var home_animate = $('#home_animate').val();

	if (($.browser.msie && parseInt($.browser.version, 10) < 9) || (home_animate)) {
		$('canvas').remove();
		$('#carousel').show();
		$('#carousel').css({opacity: 1});
		initCarousel();
	}
	else {

		$('#carousel').css({opacity: 0});
		$('#logo').hide();

		var animHome = $( '#animHome' );

		var canvas = animHome[0],
		    context = canvas.getContext('2d'),
			width = window.innerWidth,
			height = window.innerHeight,
			dirtyRegions = [],
			
			// The number of papers to generate
			quantity = 5,
			
			// Constructed Paper objects
			papers = [],
			
			// The index of the current layout
			layoutIndex = 0,
			
			// Used to automatically swap out layours
			layoutInterval = -1,
			
			paper_length = 100,
			//c = Math.pow(Math.sqrt(paper_length)+Math.sqrt(paper_length-2)-(2*paper_length*paper_length*Math.cos(72)),0.5),

			logo = new Image(),
			logoComplet = new Image(),
			logowhite = new Image(),
			logopoint = new Image(),
			animlogo = new Image(),
			slogan = new Image(),
			animlogoAlpha = 1,
			animlogoCompletAlpha = 0,

			timeline_steps = [
				[0, 50000],		// 0 - Animation des triangles
				[170, 50000],	// 1 - Animation des lignes
				[205, 50000],	// 2 - Animation bloc jaune
				[440, 50000],	// 3 - Effacement des lignes
				[240, 50000],	// 4 - Effacement du canvas
				[130, 200],		// 5 - Decalage Ã  droite de la scene
				[85, 120],		// 6 - Animation du point sur le i
				[125, 150],		// 7 - Alpha image logo
				[115, 145],		// 8 - Apparition logo complet
			],

			colors = [  
				[167, 204, 105],
				[230, 68, 50],
				[245, 104, 102],
				[243, 190, 64],
				[23, 135, 139],
			],

			colorsF = [ 17, 25, 44 ],

			timeline = new Timeline(timeline_steps, 0.9),

			// Available layout modes
			layouts = [
				// Small spiral flower			
				function() {
					papers.forEach( function( paper, i ) {
						var radius = 0.001,
							x = Math.sin( i/quantity * Math.PI*2 ) * radius,
							y = Math.cos( i/quantity * Math.PI*2 ) * radius,
							angle = Math.atan2( y, x ) * 180/Math.PI + 5.9,
							size = 100;
						paper.interpolations = { x: x, y: y, size: size, angle: angle };
						paper.speed = 0.7*timeline.speed;
					} );
				},
			];

		logo.src = '../bundles/wiseagence/images/animhome/w.png';
		logowhite.src = '../bundles/wiseagence/images/animhome/w-white.png';
		logopoint.src = '../bundles/wiseagence/images/animhome/logo-point.png';
		animlogo.src = '../bundles/wiseagence/images/animhome/anim-logo.png';
		logoComplet.src = '../bundles/wiseagence/images/animhome/logo.png';
		slogan.src = '../bundles/wiseagence/images/animhome/fabrique-du-digital.png';	

		window.addEventListener( 'resize', resize, false );
		canvas.addEventListener( 'click', click, false );

		resize();
		var scene = new Scene(0.44, 0.35);
		var pointX = paper_length * 0.55,
			pointY = paper_length * 0.55;


		// Generate the papers
		for( var i = 0; i < quantity; i++ ) {

			papers.push( new Paper((Math.random()-0.2)*width/25, (Math.random()-0.5)*height/25, 180, 0, i/quantity) );
			papers[i].colorA = new HSL(colors[i][0],colors[i][1],colors[i][2], 0.8);
			papers[i].colorB = new HSL(colorsF[0],colorsF[1],colorsF[2], 1);
		}
		
		setLayout( 0 );	
		
		checkImages();
	}

	

	function click() {
		nextLayout();
		clearInterval( layoutInterval );
	}
	
	function resize() {
	    canvas.width = width = $('#nav-top').width();
	    canvas.height = height = 440;
	}
	
	function previousLayout() {
		setLayout( layoutIndex - 1 );
	}
	
	function nextLayout() {
		setLayout( layoutIndex + 1 );
	}
	
	function setLayout( i ) {
		layoutIndex = ( i < 0 ? layouts.length - Math.abs(i) : i ) % layouts.length; 
		layouts[ layoutIndex ]();
	}
	
	function invalidate( x, y, w, h, angle ) {
		
		var tx = x; // TODO
		var ty = y;
		
		var region = new Region();
		region.inflate( tx, ty );
		region.inflate( tx + w, ty + w );
		region.expand( 4, 4 );
		
		dirtyRegions.push( region );
	}

	function animate() {

		timeline.increment();

		context.clearRect( 0, 0, canvas.width, canvas.height );

		if (timeline.isStep(5)){
			if (timeline.duration(5) == 1)
				scene.initAnimation(0.44, (canvas.width/2-paper_length*0.76)/canvas.width, 45/timeline.speed);
			scene.animate();
		}

		//alpha logo final
		if (timeline.isStep(8)){
			animlogoCompletAlpha += 1/timeline.nbFrames(8);	
			if (animlogoCompletAlpha > 1)	
				animlogoCompletAlpha = 1;
		}
		
		//Animation des formes		
		//context.globalAlpha = 1 - animlogoCompletAlpha;
		
		for( var i = 0; i < papers.length; i++ ) {
		
			var paper = papers[i];			
			paper.step( 0.01, timeline.speed );

			var x = ~~(paper.x*paper.size + scene.width);
			var y = ~~(paper.y*paper.size + scene.height);
			
			invalidate( x, y, paper.size, paper.size, paper.angle );
			
			context.save();
			context.translate( x, y );
			context.rotate( paper.angle * Math.PI/180 );

			x0 = Math.abs(paper.sizeA*paper.x);
			y0 = Math.abs(paper.sizeA*paper.y);				
			x1 = Math.abs(paper.sizeA*paper.x);
			y1 = Math.abs(paper.sizeA*paper.y);	
			context.fillStyle   = paper.colorA.toString();
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(0, 0);			
			context.lineTo(x0, y0);	
			context.lineTo(y1, x1);	
			context.lineTo(0, paper.sizeA);			
			context.lineTo(paper.paper_x0, paper.paper_y0);	
			context.fill();	

			// Lignes
			context.globalAlpha = 1;
			if (timeline.isStep(1)){	

				x = timeline.duration(1)*15*timeline.speed;

				context.beginPath();
				var yy0 = paper.pente * -x + paper.sizeA;
				var yy1 = paper.pente * x + paper.sizeA;
				context.lineTo( -x, yy0 );
				context.lineTo(x, yy1);
				context.lineWidth = 1;
				context.strokeStyle = 'rgb(230, 230, 230)';
				context.stroke();
			}

			context.restore();
		}


		// Anim Logo
		//context.drawImage(logowhite, scene.width-paper_length/2, scene.height-paper_length/2, paper_length, paper_length*0.887); 
		
		context.globalAlpha = animlogoCompletAlpha;
		//context.globalAlpha = 0.5;
		context.drawImage(logoComplet, scene.width-paper_length+1, scene.height-paper_length+2);			

		if (timeline.isStep(7)){			
			animlogoAlpha = 1 - timeline.duration(7)/timeline.nbFrames(7);	
			if (animlogoAlpha < 0)	
				animlogoAlpha = 0;
		}
		context.globalAlpha = animlogoAlpha;

		context.drawImage(animlogo, scene.width-paper_length+(paper_length*1.5), scene.height-paper_length+(paper_length*0.7), paper_length*2.53*0.65, paper_length*0.65);
		context.drawImage(logo, scene.width+(paper_length*-0.5), scene.height+(paper_length*-0.27), 91, 60);
		context.drawImage(slogan, scene.width-paper_length+(paper_length*0.85), scene.height-paper_length+(paper_length*1.5), 228 * 0.85, 11 * 0.85);

		// Logo point
		if (timeline.isStep(6)){
			timeline.duration(6);			
			moveStepLength = Math.PI/timeline.nbFrames(6);
			pointX = -timeline.duration(6) * 1.74 + paper_length * 0.55;			
			pointY = (Math.PI/2) * Math.sin(moveStepLength*timeline.duration(6)) * timeline.nbFrames(6) + paper_length * 0.53;
			context.drawImage(logopoint, scene.width + pointX, scene.height - pointY); 
		}
		else
			context.drawImage(logopoint, scene.width + pointX, scene.height - pointY);
		

		// Animation du bandeau jaune
		context.globalAlpha = 1;
		if (timeline.isStep(2)){
	
			var timer = timeline.duration(2)*25*timeline.speed;

			context.fillStyle   = 'rgba(250,213,2,1)';
			context.beginPath();	

			var paper = papers[2];	
			var x = ~~(paper.x*paper.size + scene.width);
			var y = ~~(paper.y*paper.size + scene.height);
			context.save();
			context.translate( x, y );			
			context.rotate( paper.angle * Math.PI/180 );
			var yy0 = paper.pente * -timer - 0.05*paper.sizeA;
			context.lineTo(-timer, yy0);
			context.fill();	
			context.restore();

			var paper = papers[3];	
			var x = ~~(paper.x*paper.size + scene.width);
			var y = ~~(paper.y*paper.size + scene.height);
			context.save();
			context.translate( x, y );			
			context.rotate( paper.angle * Math.PI/180 );
			var yy0 = paper.pente * -timer + paper.sizeA;
			context.lineTo(timer, yy0);
			context.fill();	
			context.restore();

			var paper = papers[4];	
			var x = ~~(paper.x*paper.size + scene.width);
			var y = ~~(paper.y*paper.size + scene.height);
			context.save();
			context.translate( x, y );			
			context.rotate( paper.angle * Math.PI/180 );
			context.lineTo(paper.paper_x0, paper.paper_y0);	
			context.fill();	
			context.restore();

			var paper = papers[3];	
			var x = ~~(paper.x*paper.size + scene.width);
			var y = ~~(paper.y*paper.size + scene.height);
			context.save();
			context.translate( x, y );			
			context.rotate( paper.angle * Math.PI/180 );
			var yy0 = paper.pente * -timer + paper.sizeA;
			context.lineTo(-timer, yy0);
			context.fill();	
			context.restore();
		}

		if (!timeline.isStep(4)){
			requestAnimFrame( animate );
		}
		else
		{	
			requestAnimFrame( animate );
			if (timeline.duration(4) == 1)
				initCarousel();
			$('#carousel').animate({opacity: 1}, 1000);
			$('canvas').fadeOut(1000, function(){
				$('canvas').remove();
			});
			$('#logo').fadeIn();
		}
	}


	function Timeline(timeline_steps, speed){

		this.cpt = 0;
		this.steps = timeline_steps || new Array();
		this.step_duration = new Array();
		this.speed = speed || 1;

		this.isStep = function( s ) { 

			if (this.cpt >= this.steps[s][0]*this.speed && this.cpt < this.steps[s][1]*this.speed)
				return true;			
			else
				return false;
		};

		this.duration = function( s ){
			if (typeof(this.steps[s]['duration']) == "undefined")
				return 0;
			else
				return this.steps[s]['duration'];
		};

		this.nbFrames = function(s){
			if (typeof(this.steps[s]) == "undefined")
				return 0;
			else
				return this.steps[s][1]*this.speed - this.steps[s][0]*this.speed;
		};

		this.increment = function() {
			this.cpt = this.cpt+this.speed;
			for( var s = 0; s < this.steps.length; s++ ) {	
				if (this.isStep(s))			
					if (typeof(this.steps[s]['duration']) == "undefined")
						this.steps[s]['duration'] = 1;
					else
						this.steps[s]['duration'] = this.steps[s]['duration']+this.speed;
			}
		};
	}
	
	function Paper( x, y, angle, size, progress ) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.size = size;
		this.fold = this.size;
		this.colorA = "";
		this.colorB = "";
		this.progress = progress || 0;
		this.speed = 1;
		this.sizeA = paper_length;
		this.sizeB = paper_length;		
		this.paper_x0 = paper_length*Math.cos(72)+paper_length/95;
		this.paper_y0 = paper_length*Math.sin(72)+paper_length/20;
		this.pente = (this.paper_y0-paper_length)/this.paper_x0;

		// Used to change properties over time based on layout
		this.interpolations = { 
			x: this.x, 
			y: this.y, 
			angle: this.angle, 
			size: this.size
		};
		
		this.step = function( v, speed ) {
			this.speed = speed || 1;
			this.progress += v*speed;
			this.progress /= 1.005;
			this.fold = this.size * this.progress;
			
			this.colorA.o = this.colorA.o + (1-this.colorA.o)*0.02;

			if (this.progress > 1.10*this.speed){
				this.colorA.o = this.colorA.o - 0.05*(this.colorA.o - this.colorB.o);
				this.colorA.h = Math.round(this.colorA.h - 0.05*(this.colorA.h - this.colorB.h));
				this.colorA.s = Math.round(this.colorA.s - 0.05*(this.colorA.s - this.colorB.s)); 
				this.colorA.l = Math.round(this.colorA.l - 0.05*(this.colorA.l - this.colorB.l));
			}

			this.interpolate( 0.06 * this.speed );
		}
		
		this.interpolate = function( v ) {
			for( var property in this.interpolations ) {
				this[ property ] += ( this.interpolations[ property ] - this[ property ] ) * v;
			}
		}
		
		this.reset = function() {
			this.progress = 0;
			this.fold = 0;
			
			var temp = this.colorB;
			
			this.colorB = this.colorA;
			this.colorA = temp.randomize();
		}
	}



	function HSL( h, s, l, o ) {
		this.h = h || 0;
		this.s = s || 100;
		this.l = l || 50;
		this.o = o || 0;		

		this.randomize = function() {
			this.h = ~~(Math.random()*360);
			this.s = ~~(30 + Math.random()*50);
			this.l = 50;
			this.o = 0.6;			
			return this;
		}
		
		this.toString = function() {
			return 'rgba('+this.h+','+this.s+','+this.l+','+this.o+')'
		}
	}

	function Scene(height_d, width_d){


		this.height_d = height_d || 0.5;
		this.width_d = width_d || 0.5;		
		this.height = height*this.height_d;
		this.width = width*this.width_d;
		this.height_f = 0;
		this.width_f = 0;
		this.inMove = false;
		this.moveTime = 0;
		this.moveHeightFraction = 0;
		this.moveWidthFractio = 0;

		this.center = function(){
			this.position(0.5, 0.5);
		}

		this.position = function(height_d, width_d){
			this.height_d = height_d;
			this.width_d = width_d;
			this.height = height*this.height_d;
			this.width = width*this.width_d;
		}

		this.initAnimation = function(height_f, width_f, moveTime){

			this.inMove = true;
			this.moveTime = moveTime;
			this.height_f = height_f;
			this.width_f = width_f;
			this.moveHeightFraction = (height_f - this.height_d)/moveTime;
			this.moveWidthFraction = (width_f - this.width_d)/moveTime;
			this.moveStepLength = Math.PI/moveTime;
		}

		this.animate = function(){

			if (this.inMove)
				this.moveTime--;

			if (this.moveTime > 0){
				this.height_d = this.height_d + this.moveHeightFraction * Math.PI/2 * Math.sin( this.moveStepLength * this.moveTime );
				this.width_d = this.width_d + this.moveWidthFraction * Math.PI/2 * Math.sin( this.moveStepLength * this.moveTime );			
				this.position(this.height_d, this.width_d);
			}	
			else
				this.inMove = false;
		}
	}

	function Region() {
		this.reset = function() {
			this.left = 999999; 
			this.top = 999999; 
			this.right = 0; 
			this.bottom = 0; 
		};
		
		this.inflate = function( x, y ) {
			this.left = Math.min(this.left, x);
			this.top = Math.min(this.top, y);
			this.right = Math.max(this.right, x);
			this.bottom = Math.max(this.bottom, y);
		};
		
		this.expand = function( x, y ) {
			this.left -= x;
			this.top -= y;
			this.right += x;
			this.bottom += y;
		};
		
		this.reset();
	}

   function checkImages() {
      var done = true;
      $('img').each(function() {
         done = done && this.complete;
         return done;
      });
      if(done) {
        animate();
      } else {
        setTimeout(checkImages,100); // wait at least 100 ms and check again
      }
   }
});