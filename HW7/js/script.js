var imageArray = [];

// create view finder class
class ViewFinder {
  constructor(title, image, description, author, year) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.author = author;
    this.year = year;
  }
}

// create image objects
var arrow = new ViewFinder("Arrow Card", "<img src='./images/arrow-card.jpg'>", "Card with an arrow icon", "Alex A. Stewart", "1995");
imageArray.push(arrow);
var circle = new ViewFinder("Circle Card", "<img src='./images/circle-card.jpg'>", "Card with a circle icon", "Alex B. Stewart", "1996");
imageArray.push(circle);
var flower = new ViewFinder("Flower Card", "<img src='./images/flower-card.jpg'>", "Card with a flower icon", "Alex C. Stewart", "1997");
imageArray.push(flower);
var polygon = new ViewFinder("Polygon Card", "<img src='./images/polygon-card.jpg'>", "Card with a polygon icon", "Alex D. Stewart", "1998");
imageArray.push(polygon);
var square = new ViewFinder("Square Card", "<img src='./images/square-card.jpg'>", "Card with a Square icon", "Alex E. Stewart", "1999");
imageArray.push(square);

// assign an image at start of page
newImage();

// display new object
function newImage() {
  // choose a new image by random number
  var randNum = Math.floor(Math.random() * 5);
  document.getElementById('title').innerHTML = imageArray[randNum].title;
  document.getElementById('img').innerHTML = imageArray[randNum].image;
  document.getElementById('desc').innerHTML = imageArray[randNum].description;
  document.getElementById('author').innerHTML = imageArray[randNum].author;
  document.getElementById('year').innerHTML = imageArray[randNum].year;
}
