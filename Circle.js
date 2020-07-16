class Circle {
  baseRadius = 50;

  constructor(x, y, isMain = false) {
    this.x = x;
    this.y = y;
    this.isMain = isMain;
    if (isMain) {
      this.radius = 1.5 * this.baseRadius;
    }else{
      this.radius = this.baseRadius;
    }
  }

  draw() {
    ellipse(this.x, this.y, this.radius);
  }
}