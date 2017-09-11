/**
 * @author Josh Gibbs (uPaymeiFixit@gmail.com)
 */

const graphs = [
	{
	  description: 'x = cos(t) - cos(80t) * sin(t);    y = sin(t) - sin(80t)',
	  scalex: 2.9,
	  scaley: 6,
    resolution: 0.0005,
    speed: 50,
	  x: T => Math.cos(T) - Math.cos(80 * T) * Math.sin(T),
	  y: T => 2 * Math.sin(T) - Math.sin(80 * T)
  },
  {
    description: 'x = sin(t) * cos(-7t/16) - cos(t)/4 * sin(-7t/16);    y = sin(t) * sin(-7t/16) + cos(t)/4 * cos(-7t/16)',
    scalex: 2.1,
    scaley: 2.1,
    resolution: 0.01,
    speed: 10,
    x: T => Math.sin(T) * Math.cos(-7 * T / 16) - 0.25 * Math.cos(T) * Math.sin(-7 * T / 16),
    y: T => Math.sin(T) * Math.sin(-7 * T / 16) + 0.25 * Math.cos(T) * Math.cos(-7 *T / 16)
  },
  {
    description: 'x = 11cos(t) - 6cos(11t/6);    y = 11sin(t) - 6sin(11t/6)',
    scalex: 35,
    scaley: 35,
    resolution: 0.01,
    speed: 10,
    x: T => 11 * Math.cos(T) - 6 * Math.cos(11 / 6 * T),
    y: T => 11 * Math.sin(T) - 6 * Math.sin(11 / 6 * T)
  },
  {
    description: 'Butterfly Curve',
    scalex: 8,
    scaley: 8,
    resolution: 0.01,
    speed: 10,
    x: T => Math.sin(T) * (Math.pow(Math.E, Math.cos(T)) - 2 * Math.cos(4 * T) - Math.sin(T / 12)),
    y: T => Math.cos(T) * (Math.pow(Math.E, Math.cos(T)) - 2 * Math.cos(4 * T) - Math.sin(T / 12))
  },
  {
    description: 'Hypercycloid',
    scalex: 42,
    scaley: 42,
    resolution: 0.01,
    speed: 10,
    x: T => 17 * Math.cos(T) + 3 * Math.cos(17 * T / 3),
    y: T => 17 * Math.sin(T) + 3 * Math.sin(17 * T / 3)
  },
  {
    description: 'x = sin(7πT);    y = cos(5πT)',
    scalex: 2.5,
    scaley: 2.5,
    resolution: 0.001,
    speed: 10,
    x: T => Math.sin(7 * Math.PI * T),
    y: T => Math.cos(5 * Math.PI * T)
  }
];

let graph_index = Math.floor(Math.random() * graphs.length);
let T = 0;
let ctx;

// Setup function
window.onload = () => {
  ctx = document.getElementsByTagName('canvas')[0].getContext('2d');

  window.onresize = resize;
  ctx.canvas.ondblclick = ctx.canvas.webkitRequestFullScreen;
  window.onclick = changeGraph;

  resize();
  window.requestAnimationFrame(animate);
}

function resize () {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.font = '16px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(graphs[graph_index].description, 10, 20);
}

// Iterates through the color schemes
function changeGraph () {
  graph_index = (graph_index + 1) % graphs.length;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  T = 0;
  ctx.fillText(graphs[graph_index].description, 10, 20);
}

// Calculate final x and y positions for line
function animate () {
  window.requestAnimationFrame(animate);

  for (let i = 0; i < graphs[graph_index].speed; i++) {

    // Calculate (x1, y1)
    let x1 = graphs[graph_index].x(T);
    let y1 = graphs[graph_index].y(T);

    T += graphs[graph_index].resolution;

    // Calculate (x2, y2)
    let x2 = graphs[graph_index].x(T);
    let y2 = graphs[graph_index].y(T);

    // Stretch coordinates to canvas size and then scale graphs
    x1 *= ctx.canvas.width / graphs[graph_index].scalex;
    y1 *= -ctx.canvas.height / graphs[graph_index].scaley;
    x2 *= ctx.canvas.width / graphs[graph_index].scalex;
    y2 *= -ctx.canvas.height / graphs[graph_index].scaley;

    // Move coordinates to center of canvas
    x1 += ctx.canvas.width / 2;
    y1 += ctx.canvas.height / 2;
    x2 += ctx.canvas.width / 2;
    y2 += ctx.canvas.height / 2;

    draw(x1, y1, x2, y2);
  }
}

// Calculate hue and draw a line from (x1, y1) to (x2, y2)
function draw (x1, y1, x2, y2) {
  const hue = Math.abs(x1 / ctx.canvas.width + y1 / ctx.canvas.height) + 0.5;
  ctx.strokeStyle = `rgba(${hsvToRgb(hue + 0.5, 1, 1)}, 0.25)`;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

//utilities
function hsvToRgb(h, s, v){
	var r, g, b;

	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);

	switch(i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
	}

	return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}
