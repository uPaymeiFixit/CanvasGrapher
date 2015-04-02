/**
 @author Josh Gibbs (uPaymeiFixit@gmail.com)
*/

//variables
var x, y, T=0, resolution=0.01, parametric=true;
var ctx, width, height, scalex, scaley;
var speed = 50;

//main
function formula(){
	//f1
	//x = cos(T) - cos(80 * T) * sin(T)
	//y = 2 * sin(T) - sin(80 * T)

	//f2
	//x = sin(T) * cos(-7*T/16) - 1/4 * cos(T) * sin(-7*T/16)
	//y = sin(T) * sin(-7*T/16) + 1/4 * cos(T) * cos(-7*T/16)

	//f3
	//x = 11 * cos(T) - 6 * cos(11/6 * T)
	//y = 11 * sin(T) - 6 * sin(11/6 * T)

	//Butterfly Curve
	x = sin(T) * (Math.pow(Math.E, cos(T)) - 2 * cos(4 * T) - sin(T / 12))
	y = cos(T) * (Math.pow(Math.E, cos(T)) - 2 * cos(4 * T) - sin(T / 12))

	//Hypercycloid
	//x = 17 * cos(T) + 3 * cos(17 * T / 3)
	//y = 17 * sin(T) + 3 * sin(17 * T / 3)
};
function calculate(){
	for(var i = 0; i<speed; i++){

		var px = width / 2 + x * scalex;
		var py = height / 2 - y * scaley;

		if(parametric){
			T+=resolution;
		} else {
			x+=resolution;
		}
		
		formula();
		//console.log(x + ', ' + y)

		var cx = width / 2 + x * scalex;
		var cy = height / 2 - y * scaley;

		draw(px, py, cx, cy);
	};
};
function draw(px, py, cx, cy){

	//ctx.clearRect(0, 0, cx, cy); //clears part of the screen so that there is a trail

	var hue = Math.abs((x * scalex / width) + (y * scaley / height)) + 0.5;
	ctx.strokeStyle = 'rgba(' + hsvToRgb(hue + 0.5, 1, 1) + ',' + 0.5 + ')';

	ctx.beginPath();
	ctx.moveTo(px,py);
	ctx.lineTo(cx,cy);
	ctx.stroke();
};

//setup
function init(){
	width = window.innerWidth;
	height = window.innerHeight;
	ctx.canvas.width = width;
	ctx.canvas.height = height;

	//f1-2
	//scalex = width / 2.9;
	//scaley = height / 6;

	//f3
	//scalex = width / 50;
	//scaley = height / 50;

	//Butterfly Curve
	scalex = width / 8;
	scaley = height / 8;

	//Hypercycloid
	//scalex = width / 50;
	//scaley = height / 50;
	
	formula();
};
window.onload = function(){
	ctx = document.getElementById('canvas').getContext('2d');
	init();
	setInterval('calculate()', 1000 / 60);
};
window.onresize = init;

//utilities
function cos(c){return Math.cos(c)};
function sin(s){return Math.sin(s)};
function hsvToRgb(h, s, v){
	var r, g, b;

	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);

	switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
	};

	return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
};