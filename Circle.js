class Circle {
  baseRadius = 50;
  baseRepelRadius = this.baseRadius + 5;
  static circles = []
  static mainCircle = new Circle(400, 300, true);

  constructor(x, y, isMain = false) {
    this.pos = new p5.Vector(x, y);
    this.isMain = isMain;
    if (isMain) {
      this.radius = 1.5 * this.baseRadius;
      this.repelRadius = 3 * this.baseRepelRadius;
    } else {
      this.radius = this.baseRadius;
      this.repelRadius = this.baseRepelRadius;
    }
    Circle.circles.push(this);
  }

  updateNighbourPositions() {
    // if (this !== Circle.mainCircle) {
      for (let circle of Circle.circles) {
        if (circle !== this && circle !== Circle.mainCircle) {
          let distance = int(this.pos.dist(circle.pos));
          if (distance < this.repelRadius) {
            let dirrection = p5.Vector.sub(this.pos, circle.pos).normalize();
            // console.log(distance,dirrection);
            circle.pos.add(dirrection.mult(-5));
          }
        }
      }
    // }
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
    textSize(this.baseRadius*.5);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(i, this.pos.x, this.pos.y);
    pop();
  }
}