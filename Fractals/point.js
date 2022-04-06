class Point{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.moving = false;
    }

    show(){
        fill(255);
        circle(this.x, this.y, this.r);
    }

    checkPos(){
        if(mouseX <= this.x + this.r && mouseX >= this.x - this.r && mouseY <= this.y + this.r && mouseY >= this.y - this.r){
          return true
        } else {
          return false
        }
      }
}