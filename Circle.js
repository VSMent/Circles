class Circle {
    static first(cX, cY, radius, canvas, context, main=true, array){
        this.cX = cX;
        this.cY = cY;
        this.radius = radius;
        this.canvas = canvas;
        // this.context = context;
        this.main = main;

        if(array){
            array.push(this);

            this.context = this.canvas.getContext('2d');
            this.canvas.setAttribute('width', this.radius*2);
            this.canvas.setAttribute('height', this.radius*2);

            // array[array.length-1].drawIn();
        }
    }



  constructor(mainC,marX,marY,radius) {
      let c = new Circle(mainC.cX + marX, mainC.cY + marY, radius, mainC.canvas.cloneNode());
      c.context = c.canvas.getContext('2d');
      c.main = false;

  }


  drawIn(){
    // image, sourX, sourY, sWidt, sHeig, destX, destY, dWidt, dHeig
    this.context.beginPath();
    this.context.arc(this.radius, this.radius, 19, 0, 2*Math.PI);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
  }

  drawOut(mainContext){
    // image, sourX, sourY, sWidt, sHeig, destX, destY, dWidt, dHeig
    mainContext.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, this.cX, this.cY, this.radius, this.radius);
  }

  changeFill(color){
    this.context.fillStyle = color;

  }

  changeStroke(color){

  }
}