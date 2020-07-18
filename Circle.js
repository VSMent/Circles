class Circle {
  baseRadius = 50;
  baseSelfRepelRadius = this.baseRadius + 10;
  static circles = []
  static mainCircle = new Circle(400, 300, true);

  constructor(x, y, isMain = false) {
    this.pos = new p5.Vector(x, y);
    this.isMain = isMain;
    if (isMain) {
      this.radius = 1.5 * this.baseRadius;
      this.selfRepelRadius = 1.5 * this.baseSelfRepelRadius;
    } else {
      this.radius = this.baseRadius;
      this.selfRepelRadius = this.baseSelfRepelRadius;
    }
    Circle.circles.push(this);
  }

  updatePosition() {
    return;
    for (let circle of Circle.circles) {
      if (circle !== this) {
        if (int(dist(this.pos.x, this.pos.y, circle.x, circle.y)) < this.selfRepelRadius) {

        }
      }
    }
  }

  drawLine() {
    push();
    stroke(192, 192, 192);
    strokeWeight(1);
    // draw line
    this !== Circle.mainCircle && line(this.pos.x, this.pos.y, Circle.mainCircle.pos.x, Circle.mainCircle.pos.y);
    pop();
  }

  draw(i) {
    push();
    stroke(0);
    strokeWeight(1);
    //draw circle
    strokeWeight(3);
    fill(255, 204, 0);
    ellipse(this.pos.x, this.pos.y, this.radius);
    //draw text
    textSize(32);
    textAlign(CENTER, CENTER);
    text(i, this.pos.x, this.pos.y);
    pop();
  }
}