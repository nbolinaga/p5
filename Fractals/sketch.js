masters = [];
points = [];
current = Point;
next = Point; 
let running;
let button;
let button2;
bg = 255;
pc = 0;
limit = 8000; 
speed = 50;
let released;
fin = false;
moved = false;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(bg);

    button = createButton('Run');
    button.position(10, 10);
    button.mousePressed(setRun);

    button2 = createButton('Reset');
    button2.position(10, 30);
    button2.mousePressed(reset);

    running = false;

}

function draw(){
    background(bg);
    fill(pc);
    rect(0, 0, 200, 70);
    

    fill(bg);
    textSize(20);
    text(points.length, 100, 40);

    if(running === true){
        startSim();
    }

    if(running == false && fin == false){
        fill(pc);
        text("click to add 3 points", width/2,  height/2);
        text("then click run",  width/2,  height/2 + 20);
        for(let i = 0; i < masters.length; i++){
            masters[i].show();
        }
    }
    
    

    if(points.length >= limit){
        running = false;
        finished();
    }
    
}

function setRun(){
    if(masters.length > 2){
        current = masters[0];
        next = masters[1];
        running = true;
    }
}

function getMiddle(a, b){
    let x = a.x + (b.x - a.x)/2;
    let y = a.y + (b.y - a.y)/2;
    return new Point(x, y, 1);
}

function startSim(){
    for(let j = 0; j < speed; j++){
        next = getMiddle(current, next);
        points.push(next);
        random = Math.floor(Math.random() * masters.length);
        current = masters[random];
    }

    stroke('red');
    line(next.x, next.y, current.x, current.y);
    for(let i = 0; i < points.length; i++){
        stroke(pc);
        fill(pc);
        points[i].show();
        
    }

    
}

function touchStarted(){
    // wait a few seconds to prevent double click
    if(released){
        if(running === false && masters.length < 3){
            if(!(mouseX > 0 && mouseX < 200 && mouseY > 0 && mouseY < 130)){
                p = new Point(mouseX,mouseY, 20);
                masters.push(p);
            }
        } else if(fin === true){
            for(let i = 0; i < masters.length; i++){
                if(masters[i].checkPos()){
                    masters[i].moving = true;
                    moved = true;
                }
            }

        }

        setTimeout(1000);
        released = false;

        
    }
    return true;
}

function touchEnded(){
  released = true;
  for(i = 0; i < masters.length; i++){
    masters[i].moving = false
    moved = false
  }
  if(!(mouseX > 0 && mouseX < 200 && mouseY > 0 && mouseY < 130)){
    return false;
  } else {
    return true;
  }
  
}


function reset(){
    masters = [];
    points = [];
    running = false;
}

function finished(){
    fin = true;
    // background(bg);
    fill(pc);
    rect(0, 0, 200, 70);
    for(i = 0; i < masters.length; i++){
        if(masters[i].moving){
            masters[i].x = mouseX
            masters[i].y = mouseY
            }
        if(masters[i].checkPos()){
            cursor('grab')
            break;
        } else {
            cursor('default')
        }
    }
    
    for(let i = 0; i < masters.length; i++){
        masters[i].show();
    }
    if(moved){
        points = []
        for(let i = 0; i < limit; i++){
            next = getMiddle(current, next);
            points.push(next);
            random = Math.floor(Math.random() * masters.length);
            current = masters[random];
        }
    }
    for(let i = 0; i < points.length; i++){
        points[i].show();
    }
    fill(bg);
    textSize(20);
    text(points.length, 100, 40);

}
