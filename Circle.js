class Circle {
  baseRadius = 50;
  static circles = []
  static mainCircle = new Circle(400, 300, true);

  constructor(x, y, isMain = false) {
    this.x = x;
    this.y = y;
    this.isMain = isMain;
    if (isMain) {
      this.radius = 1.5 * this.baseRadius;
    } else {
      this.radius = this.baseRadius;
    }
    Circle.circles.push(this);
  }

  drawLine() {
    push();
    stroke(0);
    strokeWeight(1);
    // draw line
    this !== Circle.mainCircle && line(this.x, this.y, Circle.mainCircle.x, Circle.mainCircle.y);
    pop();
  }

  draw(i) {
    push();
    stroke(0);
    strokeWeight(1);
    //draw circle
    strokeWeight(3);
    fill(255, 204, 0);
    ellipse(this.x, this.y, this.radius);
    //draw text
    textSize(32);
    textAlign(CENTER, CENTER);
    text(i, this.x, this.y);
    pop();
  }
}