// MAIN CANVAS
var canv = document.getElementById('canvas');	// main canvas
	var ctx = canv.getContext('2d');	// context
	var canv_width = 800,canv_height = 500;	//canvas sizes
	var circles = [];	// all circles array
	var mouseX = 0, mouseY = 0;	// mouse coords

	canv.onmousemove = getMouseCords;
	function getMouseCords(e){
		mouseX = e.pageX;	
		mouseY = e.pageY;		
	}

	var debugWindow = document.getElementById('m_coords');	// debug window
	function debug(){
		debugWindow.value = "";	//clear
		debugWindow.value += `mX :${mouseX}      mY :${mouseY}\n`;	// mouse coords
		debugWindow.value += `cX :${mainCircleX}      cY :${mainCircleY}\n`;	// boll top-left corner
		debugWindow.value += `cXA:${mainCircleX}-${mainCircleX+circles[0].radius*2}  cYA:${mainCircleY}-${mainCircleY+circles[0].radius*2}\n`;	// ball area

	}

	canv.setAttribute('width', canv_width);
	canv.setAttribute('height', canv_height);

	function mainCanvasClear(){
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0, canv_width, canv_height);
	}
// main canvas

// CIRCLE CANVAS
		Circle.first(
			canv_width/2 - 20,	// top-left x pos
			canv_height/2 - 20,	// top-left y pos
			20,	//radius
			document.createElement('canvas'),	//canvas to draw
			undefined,	// context
			true,	// is main?
			circles	// array to put in
		);

	var mainCircleX = canv_width/2 - circles[0].radius,	// main circle coords X
		mainCircleY = canv_height/2 - circles[0].radius;	// main circle coords Y


	circles[0].context.fillStyle = 'gray';
	circles[0].context.strokeStyle = 'rgba(255,255,255,1)';

	// circles[0].context.fillStyle = 'red';
	// circles[0].context.fillRect(0,0, canv_width, canv_height);

	

// circle canvas

// MAIN

	var first = true, wasOverCircle = false;

	Circle.child(circles[0], 30, 30, 10,);



	(function loop(){
	// image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
		if(first){
			mainCanvasClear();
			circles.forEach(function(el){
				ctx.drawImage(el.canvas, 0, 0, el.canvas.width, el.canvas.height, el.cX, el.cY, el.radius, el.radius);
			});
			first = false;
		}

		circles.forEach(function(el){

			if((mouseX >= el.cX && mouseX <= el.cX + el.radius*2) && (mouseY >= el.cY && mouseY <= el.cY + el.radius*2)){
				el.context.fillStyle = 'red';
				el.drawOut(ctx);
				wasOverCircle = true;


			}else if(wasOverCircle){
				first = true;
			}
		});


		debug();
		requestAnimationFrame(function(){loop();});
	})();

// main




