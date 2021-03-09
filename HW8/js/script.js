var imagePaths = ["./images/arrow-card.jpg", "./images/circle-card.jpg", "./images/flower-card.jpg", "./images/polygon-card.jpg", "./images/square-card.jpg"];
var index = 1;

$(function(){
  $("#text1").toggle();
  $("#circle").toggle();
  moveSquare();
  setInterval(changeImage, 3000);
  setInterval(toggleText, 5000);
});

// moves square around screen
function moveSquare() {
  $("#square").fadeIn().animate({left:250}).animate({top:400}).animate({left:50}).animate({top:300}, function() {
    moveCircle();
    $("#circle").fadeIn();
    $("#square").fadeOut();
  });
}

// moves circle  up and down
function moveCircle() {
  $("#circle").fadeIn().animate({top:50}).animate({top:400}, function() {
    moveSquare();
    $("#circle").fadeOut();
    $("#square").fadeIn();
  });
}

// switches to next image to show
function changeImage() {
  $("#image").fadeOut("slow", function(){
    $(this).attr("src", imagePaths[index]);
  }).fadeIn("slow");
  index++;
  if (index >= imagePaths.length) {
    index = 0;
  }
}

// toggles text
function toggleText() {
  $("#text1").toggle("slow", "swing");
  $("#text2").toggle("slow", "swing");
}
