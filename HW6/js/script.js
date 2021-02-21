var cards = [];
var blankImage = "./images/blank-card.jpg";
var images = [];
var player = {"firstName" : "", "lastName" : "", "age" : "", "attempts" : 0};
var choice1;
var choice2;
var limit = 0;
var playable = false;
var score = 0;

function setupGame() {
  createRandomArray();
  getPlayerInfo();
}

function createRandomArray() {
  //setup image paths
  var imagePaths = ["./images/arrow-card.jpg", "./images/circle-card.jpg", "./images/flower-card.jpg", "./images/polygon-card.jpg", "./images/square-card.jpg"]
  var count = [0,0,0,0,0];

  while(images.length < 10) {
    var randNum = Math.floor(Math.random() * imagePaths.length);

    if (count[randNum] < 2) {
      images.push(imagePaths[randNum]);
      count[randNum] = count[randNum] + 1;
    }
  }

  for (var i = 0; i < 10; i++) {
    cards.push("card" + i);
    document.getElementById(cards[i]).src = images[i];
  }

  setTimeout(setBlank, 2000);
}

function flipImage(number) {
  if (playable) {
    document.getElementById(cards[number]).src = images[number];
    //first choice
    if (limit == 0) {
      choice1 = document.getElementById(cards[number]);
      limit++;
    }
    // second choice
    else if (limit == 1) {
      choice2 = document.getElementById(cards[number]);

      if (choice1.src != choice2.src) {
        playable = false;
        setTimeout(resetChoices, 1000);
        player.attempts += 1;
        limit = 0;
        return;
      }
      player.attempts += 1;
      limit = 0;
      choice1 = null;
      choice2 = null;
      score += 1;
      if (score >= 5) {
        gameWin();
      }
    }
  }

}

function setPlayerInfo() {
  //get values from input fields
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var age = document.getElementById('age').value;

  //add values to player JSON object
  player.firstName = firstName;
  player.lastName = lastName;
  player.age = age;

  //add player info to local storage
  localStorage.setItem("playerInfo", JSON.stringify(player));


  window.location = "index.html";
}

//get player information from local storage
function getPlayerInfo() {
  var playerInformation = localStorage.getItem("playerInfo");
  player = JSON.parse(playerInformation);
}

//add blank images
function setBlank() {
  for (var i = 0; i < 10; i++) {
    cards.push("card" + i);
    document.getElementById(cards[i]).src = blankImage;
  }

  playable = true;
}


function resetChoices() {
  choice1.src = blankImage;
  choice2.src = blankImage;
  choice1 = null;
  choice2 = null;
  playable = true;
}

function gameWin() {
  localStorage.setItem("playerInfo", JSON.stringify(player));
  window.location = "win.html"
}

function winPageInfo() {
  getPlayerInfo();
  document.getElementById('name').innerHTML = "Name: " + player.firstName + " " + player.lastName;
  document.getElementById('age').innerHTML = "Age: " + player.age;
  document.getElementById('attempts').innerHTML = "Attempts " + player.attempts;
}
