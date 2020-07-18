function setup() {
  createCanvas(800, 600);
  init();
  // frameRate(1);
  console.log(circles);

  // noLoop();
}

function draw() {
  background(255);
  drawLines();
  drawCircles();
  updatePositions();
}

let circles;

function init() {
  let padding = 50;
  for (let i = 0; i < 50; i++) {
    new Circle(Math.floor((Math.random() * (800 - padding * 2)) + padding), Math.floor((Math.random() * (600 - padding * 2)) + padding), false);
  }
  circles = Circle.circles;
}

function updatePositions() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].updateNighbourPositions();
  }
}

function drawLines() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].drawLine();
  }
}

function drawCircles() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].draw(i);
  }
}

