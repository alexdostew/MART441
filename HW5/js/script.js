var cards = [];
var blankImage = "./images/blank-card.jpg";
var images = [];

// add blank images
for (var i = 0; i < 10; i++) {
  cards.push("card" + i);
  document.getElementById(cards[i]).src = blankImage;
}

function createRandomArray() {
  var imagePaths = ["./images/arrow-card.jpg", "./images/circle-card.jpg", "./images/flower-card.jpg", "./images/polygon-card.jpg", "./images/square-card.jpg"]
  var count = [0,0,0,0,0];

  while(images.length < 10) {
    var randNum = Math.floor(Math.random() * imagePaths.length);

    if (count[randNum] < 2) {
      images.push(imagePaths[randNum]);
      count[randNum] = count[randNum] + 1;
    }
  }
}

function flipImage(number) {
  document.getElementById(cards[number]).src = images[number];
}
