var totalCards = 0;
var playerScore = 0;
var npcScore = 0;
var playerCards = [];
var npcCards = [];
var index = 2;
var gameover = false;

$(function(){
  startGame();
});

function startGame() {
  // set first two cards for player
  for (var i = 0; i < 2; i++) {
    playerCards.push(Math.floor((Math.random() * 11) + 1));
    $("#pc" + i).text(playerCards[i]);
    playerScore += playerCards[i];
  }

  // set first card for computer
  npcCards.push(Math.floor((Math.random() * 11) + 1));
  $("#npc0").text(npcCards[0]);
  npcScore += npcCards[0];

  // update scores
  $("#playerScore").text(playerScore);
  $("#npcScore").text(npcScore);
}

function newCard() {
  // add new card for player only if score is less than 21
  if (!gameover) {
    playerCards.push(Math.floor((Math.random() * 11) + 1));
    playerScore += playerCards[index];

    // append new card
    $("#playerCards").append("<div class='card' id='pc" + index + "'>" + playerCards[index] + "</div>");

    index++;

    // update player score
    $("#playerScore").text(playerScore);

    // check if player has lost or hit 21
    if (playerScore > 21) {
      gameLose();
    } else if (playerScore == 21) {
      stand();
    }
  }
}

function stand() {
  if (!gameover) {
    // reset index for computer
    index = 1;

    // add and append cards for computer until it hits higher than 16
    while (npcScore < 16) {
      npcCards.push(Math.floor((Math.random() * 11) + 1));
      npcScore += npcCards[index];
      $("#npcCards").append("<div class='card' id='npc" + index + "'>" + npcCards[index] + "</div>");
      index++;
    }
    $("#npcScore").text(npcScore);

    // check win or lose conditions
    if (npcScore > playerScore && npcScore < 22) {
      gameLose();
    } else if (npcScore == playerScore) {
      gameDraw();
    } else if (playerScore > npcScore || npcScore > 21) {
      gameWin();
    }
  }
}

function gameLose() {
  console.log(' you lose ');
  gameover = true;
}

function gameDraw() {
  console.log('draw!');
  gameover = true;
}

function gameWin() {
  console.log('Win!');
  gameover = true;
}
