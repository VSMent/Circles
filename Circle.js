class Circle {
  radius = 25;
  repelRadius = this.radius + 15;
  strokeWidth = 3;
  repelSpeed = 1;
  attractRadius = 0;
  bodyColor = color(255, 204, 0);
  repelColor = color(251, 202, 251, 170);
  attractColor = color(202, 251, 222, 100);
  bodyHoverColor = color(204, 163, 0);
  isDragged = false;
  static minX = 0;
  static maxX = 100;
  static minY = 0;
  static maxY = 100;
  static circles = []
  static mainCircle;

  constructor(x, y, isMain = false) {
    this.pos = new p5.Vector(x, y);
    this.isMain = isMain;
    if (isMain) {
      this.radius *= 1.5;
      this.repelRadius *= 3;
      this.repelSpeed = 10;
      this.attractRadius = 3 * this.repelRadius;
    }
    this.fullRadius = this.radius + this.strokeWidth;
    Circle.circles.push(this);
  }

  updatePositions() {
    if (!this.isDragged) {
      this.stayInBounds();
    }
    this.repelNeighbours();
    if (this === Circle.mainCircle) {
      this.attractNeighbours();
    }
  }

  stayInBounds() {
    let dx = 0, dy = 0;

    // X <, >
    if (this.pos.x - this.fullRadius < Circle.minX) {
      dx = p5.Vector.sub(this.pos, new p5.Vector(Circle.minX + this.fullRadius, this.pos.y)).normalize().mult(-this.repelSpeed).x;
    }
    if (this.pos.x + this.fullRadius > Circle.maxX) {
      dx = p5.Vector.sub(this.pos, new p5.Vector(Circle.maxX - this.fullRadius, this.pos.y)).normalize().mult(-this.repelSpeed).x;
    }
    // Y -, _
    if (this.pos.y - this.fullRadius < Circle.minY) {
      dy = p5.Vector.sub(this.pos, new p5.Vector(this.pos.x, Circle.minY + this.fullRadius)).normalize().mult(-this.repelSpeed).y;
    }
    if (this.pos.y + this.fullRadius > Circle.maxY) {
      dy = p5.Vector.sub(this.pos, new p5.Vector(this.pos.x, Circle.maxY - this.fullRadius)).normalize().mult(-this.repelSpeed).y;
    }
    this.pos.add(new p5.Vector(dx, dy));

  }

  repelNeighbours() {
    for (let circle of Circle.circles) {
      if (circle !== this && circle !== Circle.mainCircle && !circle.isDragged) {
        let distance = int(this.pos.dist(circle.pos) - this.fullRadius);
        if (distance < this.repelRadius) {
          let direction = p5.Vector.sub(this.pos, circle.pos).normalize();
          circle.pos.add(direction.mult(-this.repelSpeed));
        }
      }
    }
  }

  attractNeighbours() {
    for (let circle of Circle.circles) {
      if (circle !== this && circle !== Circle.mainCircle && !circle.isDragged) {
        let distance = int(this.pos.dist(circle.pos) + this.fullRadius);
        if (distance > this.attractRadius) {
          let direction = p5.Vector.sub(this.pos, circle.pos).normalize();
          circle.pos.add(direction.mult(this.repelSpeed));
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
    if (IS_DEBUG) {
      //draw attract radius
      strokeWeight(1);
      fill(this.attractColor);
      ellipse(this.pos.x, this.pos.y, this.attractRadius * 2);
      //draw repel radius
      strokeWeight(1);
      fill(this.repelColor);
      ellipse(this.pos.x, this.pos.y, this.repelRadius * 2);
    }
    //draw circle
    stroke(0);
    strokeWeight(this.strokeWidth);
    this.isHovered() ? fill(this.bodyHoverColor) : fill(this.bodyColor);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    //draw text
    textSize(this.baseRadius);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
    text(i, this.pos.x, this.pos.y);
    pop();
  }

  isHovered() {
    return dist(this.pos.x, this.pos.y, mouseX, mouseY) < this.fullRadius;
  }

  drag() {
    if (this.isHovered()) {
      this.pos = new p5.Vector(mouseX, mouseY);
      this.isDragged = true;
    }
  }

  static drawForceBounds() {
    push();
    stroke(255, 0, 0);
    strokeWeight(1);
    noFill();
    rectMode(CORNERS);
    rect(Circle.minX, Circle.minY, Circle.maxX, Circle.maxY);
    pop();
  }
}