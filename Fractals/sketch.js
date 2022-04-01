masters = [];
points = []
current = Point;
next = Point; 
let running;
let button;
let button2;
bg = 255;
pc = 0;
limit = 8000; 
speed = 50;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(bg);

    button = createButton('Run');
    button.position(10, 10);
    button.mousePressed(setRun);

    button2 = createButton('Reset');
    button2.position(10, 30);
    button2.mousePressed(reset);

    let inp = createInput('');
    inp.position(80, 65);
    inp.size(100);
    inp.input(myInputEvent);

    let inp2 = createInput('');
    inp2.position(80, 95);
    inp2.size(100);
    inp2.input(myInputEvent2);

    running = false;

}

function draw(){
    background(bg);
    fill(pc)
    rect(0, 0, 200, 130);
    

    fill(bg)
    textSize(20);
    text(points.length, 100, 40);
    text("speed", 10, 80);
    text("limit", 10, 110);

    if(running == false){
        for(let i = 0; i < masters.length; i++){
            fill(pc)
            masters[i].show();
        }
    }
    
    if(running === true){
        run();
    }

    if(points.length >= 8000){
        running = false;
        finished();
    }
    
}

function setRun(){
    if(masters.length > 2){
        current = masters[0];
        next = masters[1];
        running = true
    }
}

function getMiddle(a, b){
    let x = a.x + (b.x - a.x)/2;
    let y = a.y + (b.y - a.y)/2;
    return new Point(x, y, 1);
}

function run(){
    for(let j = 0; j < speed; j++){
        next = getMiddle(current, next)
        points.push(next);
        random = Math.floor(Math.random() * masters.length);
        current = masters[random];
    }

    stroke('red');
    line(next.x, next.y, current.x, current.y);
    for(let i = 0; i < points.length; i++){
        stroke(pc)
        fill(pc)
        points[i].show();
        
    }
}

function touchStarted(){
    if(running === false && masters.length < 3){
        if(!(mouseX > 0 && mouseX < 200 && mouseY > 0 && mouseY < 130)){
            p = new Point(mouseX,mouseY, 20);
            masters.push(p)
        }
    }
}

function reset(){
    masters = [];
    points = [];
    running = false;
}

function finished(){
    for(let i = 0; i < points.length; i++){
        points[i].show();
    }
}

function myInputEvent() {
    speed = this.value();
}

function myInputEvent2() {
    limit = this.value();
}