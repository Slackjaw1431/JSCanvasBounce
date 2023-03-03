var mouseDown = false;
var mouseMove = false;

document.body.onmousedown = function isDown(){
  mouseDown = true;
};

document.body.onmouseup = function isUp(){
  mouseDown = false;
};

document.body.onmousemove = function(){
  mouseMove = true;
  if (mouseDown) {
    draw(event);
  }
};

var balls = [];
setInterval(animate, 33); //run animate but dont call it yet 10 times per second which is 100ms

function animate(){
  var canvas = document.getElementById("imgCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width, canvas.height);//without this it will leave a trail
  ctx.fillStyle = "#000000"; //canvas background
  ctx.fillRect(0,0,canvas.width, canvas.height);
  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].draw();
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.size = 60//Math.random() * 50 + 10;
    var canvas = document.getElementById("imgCanvas")
    this.vx = Math.round(Math.random() * 20 - 10);//ball movment randomly created
    this.vy = Math.round(Math.random() * 20 - 10);
    if (this.vx == 0 && this.vy == 0) {
      this.vx = 1; this.vy = 1;
    }

    ;

    if (this.x + this.size > canvas.width)
      this.x = this.x - this.size;
    if (this.x - this.size < 0)
      this.x = this.x + this.size;
    if (this.y - this.size < 0)
      this.y = this.y + this.size;
    if (this.y + this.size > canvas.height)
      this.y = this.y - this.size;

  }
  draw(){
    var canvas = document.getElementById("imgCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y, this.size, 0, 360);//positions, radius, start, end
    ctx.fill();
    //ctx.strokeStyle = "#000000";//adds black edge to circle
    //ctx.beginPath();
    //ctx.arc(this.x,this.y, this.size, 0, 360);
    //ctx.stroke();
  }
  update(){
    // var o;
    //
    // for (var p = 0; p < balls.length; o = p % 2) {
    //   if(o == 0){
    //     this.x += Math.random() * 50 + 1;
    //     this.y += Math.random() * 50 + 1;
    //   }
    //   else if (o == 1){
    //     this.x -= Math.random() * 50 + 1;
    //     this.y -= Math.random() * 50 + 1;
    //   }
    //   p++;
    // }
    // this.x += Math.random() * 100 + 1;
    // this.y += Math.random() * 100 + 1;

    var canvas = document.getElementById("imgCanvas");
     this.x += this.vx;
     this.y += this.vy;

     if(this.x < 0 + this.size || this.x > canvas.width - this.size)//reverse direction if going off screen
       this.vx = -this.vx;
     if (this.y < 0 + this.size || this.y > canvas.height - this.size)
       this.vy = -this.vy;
   }
}

function draw(e){
  var canvas = document.getElementById("imgCanvas");
  var ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();//get position of rect canvas in browser
  var posx = e.clientX - rect.left; //where user clicked. position subtracted from rect
  var posy = e.clientY - rect.top;

  var newBall = new Ball(posx, posy);
  newBall.draw();
  balls.push(newBall);//push new ball into balls array

}

function randomColor(){
  var r = Math.floor(Math.random() * 240 + 16); //calculates random value between 16 and 255
  var g = Math.floor(Math.random() * 240 + 16);
  var b = Math.floor(Math.random() * 240 + 16);
  var transparency = 33;//can adjust range or keep it a fixed value

  var color = "#" + r.toString(16) + g.toString(16) + b.toString(16) + transparency.toString(16); //converts numbers to hex
  return color;
}

function clearScreen(){
  balls = [];
}
