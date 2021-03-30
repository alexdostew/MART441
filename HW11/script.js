var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var player;
var x = 10;
var y = 10;
var speed = 10;
var score = 0;
var lives = 3;
var squares;
var obstacles;
var collectables;
var obstaclesObj = [];
var collectablesObj = [];

$(function(){
  $(this).keypress(function(event){
    getKey(event);
  });
  $.getJSON("squares.json", function(sqs){
    squares = sqs.squares;
    obstacles = squares.obstacles;
    collectables = squares.collectables;

    // create obstacle, collectable and player objects and add them to their arrays
    for (var i = 0; i < obstacles.length; i++) {
      obstaclesObj.push(new Square(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h, "#FF0000"));
    }

    for (var i = 0; i < collectables.length; i++) {
      collectablesObj.push(new Square(collectables[i].x, collectables[i].y, collectables[i].w, collectables[i].h, "#FFFF00"));
    }
  });
});

player = new Square(x, y, 20, 20, "#0000FF");

setInterval(update, 1000/60);

function update() {
  moveSquares();
  drawSquare();
}

function getKey(event)
{
  var char = event.which || event.keyCode;
  var actualLetter = String.fromCharCode(char);
  movePlayer(actualLetter);
}

function drawSquare() {
  ctx.clearRect(0,0,800,600);

  // draw playerd
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // draw obstacles
  for (var i = 0; i < obstaclesObj.length; i++) {
    ctx.fillStyle = obstaclesObj[i].color;
    ctx.fillRect(obstaclesObj[i].x, obstaclesObj[i].y, obstaclesObj[i].w, obstaclesObj[i].h);
  }

  // draw collectables
  for (var i = 0; i < collectablesObj.length; i++) {
    ctx.fillStyle = collectablesObj[i].color;
    ctx.fillRect(collectablesObj[i].x, collectablesObj[i].y, collectablesObj[i].w, collectablesObj[i].h);
  }

  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 640, 50);

  ctx.fillStyle = "#FF0000";
  ctx.fillText("Lives: " + lives, 440, 50);
}

function movePlayer(actualLetter) {
  // check if player has collided with a collectable
  for (var i = 0; i < collectablesObj.length; i++) {
    if(hasCollided(player, collectablesObj[i])) {
      collectablesObj.splice(i, 1);
      score++;
      console.log(score);
    }
  }

  // move player
  if (actualLetter == "w") {
    // check if player has collided with an obstacle
    if (checkCollision()) {
      y += speed;
    } else {
      y -= speed;
    }
  }
  if (actualLetter == "a") {
    if (checkCollision()) {
      x += speed;
    } else {
      x -= speed;
    }
  }
  if (actualLetter == "s") {
    if (checkCollision()) {
      y -= speed;
    } else {
      y += speed;
    }
  }
  if (actualLetter == "d") {
    if (checkCollision()) {
      x -= speed;
    } else {
      x += speed;
    }
  }

  player.setY(y);
  player.setX(x);
  drawSquare();
}

function moveSquares() {
  for (var i = 0; i < obstaclesObj.length; i++) {
    if (obstaclesObj[i].x > 800 - obstaclesObj[i].w || obstaclesObj[i].x < 0) {
      obstaclesObj[i].d *= -1;
    }
    obstaclesObj[i].x += speed * obstaclesObj[i].d;
  }

  if (checkCollision()) {
    x = 10;
    y = 10;
    player.setY(y);
    player.setX(x);
    lives--;

    if (lives <= 0) {
      location.reload();
    }
  }
}

function hasCollided(object1, object2) {
    return !(
        ((object1.y + object1.h) < (object2.y)) ||
        (object1.y > (object2.y + object2.h)) ||
        ((object1.x + object1.w) < object2.x) ||
        (object1.x > (object2.x + object2.w))
    );
}

function checkCollision() {
  for (var i = 0; i < obstaclesObj.length; i++) {
    if(hasCollided(player, obstaclesObj[i])) {
      return true;
    }
  }
}
