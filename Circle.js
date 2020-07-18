class Circle {
  baseRadius = 25;
  baseRepelRadius = this.baseRadius + 15;
  strokeWidth = 3;
  static minX = 0;
  static maxX = 100;
  static minY = 0;
  static maxY = 100;
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
    this.fullRadius = this.radius + this.strokeWidth;
    Circle.circles.push(this);
  }

  updatePositions(i) {
    this.checkBounds(i);
    this.repelNeighbours();
  }

  checkBounds(i) {
    let dx = 0, dy = 0;

    // X <, >
    if (this.pos.x - this.fullRadius < Circle.minX) {
      dx = p5.Vector.sub(this.pos, new p5.Vector(Circle.minX + this.fullRadius, this.pos.y)).normalize().mult(-5).x;
    }
    if (this.pos.x + this.fullRadius > Circle.maxX) {
      dx = p5.Vector.sub(this.pos, new p5.Vector(Circle.maxX - this.fullRadius, this.pos.y)).normalize().mult(-5).x;
    }
    // Y -, _
    if (this.pos.y - this.fullRadius < Circle.minY) {
      dy = p5.Vector.sub(this.pos,new p5.Vector(this.pos.x, Circle.minY + this.fullRadius)).normalize().mult(-5).y;
    }
    if (this.pos.y + this.fullRadius > Circle.maxY) {
      dy = p5.Vector.sub(this.pos, new p5.Vector(this.pos.x, Circle.maxY - this.fullRadius)).normalize().mult(-5).y;
    }
    this.pos.add(new p5.Vector(dx, dy));

  }

  repelNeighbours() {
    for (let circle of Circle.circles) {
      if (circle !== this && circle !== Circle.mainCircle) {
        let distance = int(this.pos.dist(circle.pos)-this.fullRadius);
        if (distance < this.repelRadius) {
          let dirrection = p5.Vector.sub(this.pos, circle.pos).normalize();
          circle.pos.add(dirrection.mult(-5));
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
    //draw repel radius
    strokeWeight(1);
    fill(251, 202, 251, 200);
    ellipse(this.pos.x, this.pos.y, this.repelRadius * 2);
    //draw circle
    stroke(0);
    strokeWeight(this.strokeWidth);
    fill(255, 204, 0);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    //draw text
    textSize(this.baseRadius);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
    text(i, this.pos.x, this.pos.y);
    pop();
  }

  static drawBounds() {
    push();
    stroke(255, 0, 0);
    strokeWeight(1);
    noFill();
    rectMode(CORNERS);
    rect(Circle.minX, Circle.minY, Circle.maxX, Circle.maxY);
    pop();
  }
}