var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = 50;
var y = 50;
var speed = 10;
var enemySpeed = 10;
var squares = [];
var limit = 0;

var player = new Square(x, y, 20, 20, "#0000FF");
squares.push(player);
var enemy = new Square(200, 100, 40, 40, "#FF0000");
console.log(enemy.color);
squares.push(enemy);


drawSquare();
setInterval(update, 1000/60);

function update() {
  drawSquare();
  moveEnemy();
  if (hasCollided(player, enemy)) {
    newColor();
  }
  limit--;
  console.log(limit);
}

function drawSquare() {
  ctx.clearRect(0,0,800,600);

  for (var i = 0; i < squares.length; i++) {
    ctx.fillStyle = squares[i].color;
    ctx.fillRect(squares[i].x, squares[i].y, squares[i].w, squares[i].h);
  }
}

$(function(){
  $(this).keypress(function(event){
    getKey(event);
  });
});

function getKey(event)
{
  var char = event.which || event.keyCode;
  var actualLetter = String.fromCharCode(char);
  move(actualLetter);
}

function move(actualLetter) {
  if (actualLetter == "w") {
    if (hasCollided(player, enemy)) {
      y += speed;
    } else {
      y -= speed;
    }
  }
  if (actualLetter == "a") {
    if (hasCollided(player, enemy)) {
      x += speed;
    } else {
      x -= speed;
    }
  }
  if (actualLetter == "s") {
    if (hasCollided(player, enemy)) {
      y -= speed;
    } else {
      y += speed;
    }
  }
  if (actualLetter == "d") {
    if (hasCollided(player, enemy)) {
      x -= speed;
    } else {
      x += speed;
    }
  }

  player.setY(y);
  player.setX(x);
  drawSquare();
}

function hasCollided(object1, object2) {
    return !(
        ((object1.y + object1.h) < (object2.y)) ||
        (object1.y > (object2.y + object2.h)) ||
        ((object1.x + object1.w) < object2.x) ||
        (object1.x > (object2.x + object2.w))
    );
}

function moveEnemy() {
  enemy.x += enemySpeed;
  if (enemy.x >= 800 - enemy.w) {
    enemySpeed *= -1;
  }

  if (enemy.x <= 0) {
    enemySpeed *= -1;
  }
}

function newColor() {
  if (limit <= 0) {
    $("canvas").css("background-color", "rgb(" + Math.floor(Math.random() * 255).toString() +  "," + Math.floor(Math.random() * 255).toString() +  "," + Math.floor(Math.random() * 255).toString() + ")");
    limit = 10;
  }
}
