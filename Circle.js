/**
 * Main class. Represents circle of some data.
 *
 * Instances:
 * - 1 main circle
 * - lots of smaller ones
 */
class Circle {
    radius = 25;
    repelRadius = this.radius + 15;
    strokeWidth = 3;
    repelMultiplier = 1;
    attractRadius = 0;
    bodyColor = color(255, 204, 0);
    bodyHoverColor = color(204, 163, 0);
    debugRepelColor = color(251, 202, 251, 170);
    debugAttractColor = color(202, 251, 222, 100);
    /**
     * Contains currently dragging circle reference or null if no circle is being dragged
     * @type {Circle|null}
     */
    static currentlyDragging = null;
    /**
     * All circles minimal x bound
     * @type {number}
     */
    static minX = 0;
    /**
     * All circles maximal x bound
     * @type {number}
     */
    static maxX = 100;
    /**
     * All circles minimal y bound
     * @type {number}
     */
    static minY = 0;
    /**
     * All circles maximal y bound
     * @type {number}
     */
    static maxY = 100;
    /**
     * Array of all circle references
     * @type {[Circle]}
     */
    static circles = []
    /**
     * Reference to main circle
     * @type {Circle}
     */
    static mainCircle;

    constructor(x, y, isMain = false) {
        this.pos = new p5.Vector(x, y);
        if (isMain) {
            this.radius *= 1.5;
            this.repelRadius *= 3;
            this.repelMultiplier = 10;
            this.attractRadius = 3 * this.repelRadius;
        }
        this.fullRadius = this.radius + this.strokeWidth;
        Circle.circles.push(this);
    }

    /**
     * @public
     * Used to update circle position
     */
    updatePositions() {
        if (Circle.currentlyDragging !== this) {
            this.stayInBounds();
        } else {
            this.drag();
        }
        this.repelNeighbours();
        if (this === Circle.mainCircle) {
            this.attractNeighbours();
        }
    }

    /**
     * @private
     * Make sure circle is staying in defined bounds
     */
    stayInBounds() {
        let dx = 0, dy = 0;

        // X <, >
        if (this.pos.x - this.fullRadius < Circle.minX) {
            dx = p5.Vector.sub(this.pos, new p5.Vector(Circle.minX + this.fullRadius, this.pos.y)).normalize().mult(-this.repelMultiplier).x;
        }
        if (this.pos.x + this.fullRadius > Circle.maxX) {
            dx = p5.Vector.sub(this.pos, new p5.Vector(Circle.maxX - this.fullRadius, this.pos.y)).normalize().mult(-this.repelMultiplier).x;
        }
        // Y -, _
        if (this.pos.y - this.fullRadius < Circle.minY) {
            dy = p5.Vector.sub(this.pos, new p5.Vector(this.pos.x, Circle.minY + this.fullRadius)).normalize().mult(-this.repelMultiplier).y;
        }
        if (this.pos.y + this.fullRadius > Circle.maxY) {
            dy = p5.Vector.sub(this.pos, new p5.Vector(this.pos.x, Circle.maxY - this.fullRadius)).normalize().mult(-this.repelMultiplier).y;
        }
        this.pos.add(new p5.Vector(dx, dy));

    }

    /**
     * @private
     * Push neighbour circles away on repelRadius distance
     */
    repelNeighbours() {
        for (let circle of Circle.circles) {
            if (circle !== this && circle !== Circle.mainCircle && Circle.currentlyDragging !== circle) {
                let distance = int(this.pos.dist(circle.pos) - this.fullRadius);
                if (distance < this.repelRadius) {
                    let direction = p5.Vector.sub(this.pos, circle.pos).normalize();
                    circle.pos.add(direction.mult(-this.repelMultiplier));
                }
            }
        }
    }

    /**
     * @private
     * Attract neighbour circles
     * Used only for main circle
     */
    attractNeighbours() {
        for (let circle of Circle.circles) {
            if (circle !== this && circle !== Circle.mainCircle && Circle.currentlyDragging !== circle) {
                let distance = int(this.pos.dist(circle.pos) + this.fullRadius);
                if (distance > this.attractRadius) {
                    let direction = p5.Vector.sub(this.pos, circle.pos).normalize();
                    circle.pos.add(direction.mult(this.repelMultiplier));
                }
            }
        }
    }

    /**
     * @private
     * Draw connection from main circle to other circles
     */
    drawLine() {
        push();
        stroke(192, 192, 192);
        strokeWeight(1);
        // draw line
        this !== Circle.mainCircle && line(this.pos.x, this.pos.y, Circle.mainCircle.pos.x, Circle.mainCircle.pos.y);
        pop();
    }

    /**
     * @public
     * Used to draw circle
     * @param {string} i String that will be drawn on the circle
     */
    draw(i) {
        push();
        if (IS_DEBUG) {
            //draw attract radius
            strokeWeight(1);
            fill(this.debugAttractColor);
            ellipse(this.pos.x, this.pos.y, this.attractRadius * 2);
            //draw repel radius
            strokeWeight(1);
            fill(this.debugRepelColor);
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

    /**
     * @private
     * @returns {boolean}
     */
    isHovered() {
        return dist(this.pos.x, this.pos.y, mouseX, mouseY) < this.fullRadius;
    }

    /**
     * @private
     * Moves circle alongside with mouse
     */
    drag() {
        this.pos = new p5.Vector(mouseX, mouseY);
    }

    /**
     * @public
     * Draw bounds of repel and attract forces
     */
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