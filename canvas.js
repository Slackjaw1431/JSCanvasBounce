// var canvas = document.getElementById("imgCanvas");
//
// var ctx = canvas.getContext("2d"); //x and y coordinates

//ctx.fillStyle = "#ffaaaa"; //RGB Hex


// ctx.beginPath();
// ctx.arc(200,200, 50, 0, Math.PI * 2);
// ctx.fill();
//MAKING circles with arc first have to begin path (position x,position y, radius, degrees start, degrees end)

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

function draw(e){
  var canvas = document.getElementById("imgCanvas");
  var ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();//get position of rect canvas in browser
  var posx = e.clientX - rect.left; //clicking position subtracted from rect
  var posy = e.clientY - rect.top;

//ctx.fillRect(10, 10, 50, 10); //starts at top left, x, y, x (width), y(height)

  ctx.fillStyle = randomColor();
  ctx.beginPath();
  ctx.arc(posx,posy, 50, 0, 360);//positions, radius, start, end
  ctx.fill();
  ctx.strokeStyle = "#000000";//adds edge to circle
  ctx.beginPath();
  ctx.arc(posx,posy, 50, 0, 360);
  ctx.stroke();

}

function randomColor(){
  var r = Math.floor(Math.random() * 240 + 16); //calculates random value between 16 and 255
  var g = Math.floor(Math.random() * 240 + 16);
  var b = Math.floor(Math.random() * 240 + 16);
  var transparency = 33;//can adjust range or keep it a fixed value

  var color = "#" + r.toString(16) + g.toString(16) + b.toString(16) + transparency.toString(16);//toString(16) converts numbers to hex
  return color;
}
