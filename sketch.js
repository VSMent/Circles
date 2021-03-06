function setup() {
    createCanvas(800, 700);
    init();
    frameRate(30);
    console.log(circles);

    // noLoop();
}

function draw() {
    background(255);
    if (IS_DEBUG) {
        drawGrid();
        Circle.drawForceBounds();
    }
    drawConnections();
    drawCircles();
    updatePositions();
}

let circles;
let isDragging;

/**
 * Initialize project:
 * - Create circles
 * - Set bounds
 */
function init() {
    isDragging = false;
    let bounds = 10;  // offset from canvas border
    Circle.mainCircle = new Circle(width / 2, height / 2, true);

    // Create secondary circles
    for (let i = 0; i < 30; i++) {
        new Circle(Math.floor((Math.random() * (width - bounds * 2)) + bounds), Math.floor((Math.random() * (height - bounds * 2)) + bounds));
    }
    circles = Circle.circles;

    // Set circle bounds
    Circle.minX = bounds;
    Circle.minY = bounds;
    Circle.maxX = width - bounds;
    Circle.maxY = height - bounds;
}

function updatePositions() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].updatePositions(i);
    }
}

function drawConnections() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].drawLine();
    }
}

function drawCircles() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].draw(i);
    }
}

/**
 * Draws grid with defined step
 * @param {number} step pixels between lines
 */
function drawGrid(step = 10) {
    push();
    stroke(192, 192, 192, 100);
    for (let i = step; i < width; i += step) {
        line(i, 0, i, height);
    }
    for (let i = step; i < height; i += step) {
        line(0, i, width, i);
    }
    pop();
}

function mouseDragged(event) {
    if (mouseButton === LEFT && !Circle.currentlyDragging) {
        for (let i = 0; i < circles.length; i++) {
            if (circles[i].isHovered()) {
                Circle.currentlyDragging = circles[i];
                isDragging = true;
                break;
            }
        }
    }
    return false;
}

function mouseReleased(event) {
    if (mouseButton === LEFT) {
        if (isDragging) {
            Circle.currentlyDragging = null;
            isDragging = false;
        } else {
            if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
                new Circle(mouseX, mouseY);
            }
        }
    }
    return false;
}