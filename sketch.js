function setup() {
  createCanvas(800, 600);
  init();
}

function draw() {
  drawCircles();
}

let circles = [];

function init() {
  circles.push(new Circle(400, 300, true));
  circles.push(new Circle(200, 100, false));
}

function drawCircles() {
  stroke(5);
  for (let i = 0; i < circles.length; i++) {
    circles[i].draw();
  }
}

