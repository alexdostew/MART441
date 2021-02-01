function choosePath(choice) {
  var choice1 = document.getElementById('choice1').innerHTML;
  var choice2 = document.getElementById('choice2').innerHTML;
  if (choice == 0 && choice1 === 'Left Door') {
    document.getElementById('main-text').innerHTML = "You opened the left door. Inside you see a red door. Enter the red door or go back?";
    document.getElementById('choice1').innerHTML = "Red door";
    document.getElementById('choice2').innerHTML = "Go back";
    document.getElementById('door-image').src = "./images/red-door.png";
  } else if(choice == 0 && choice1 === 'Red door') {
    document.getElementById('main-text').innerHTML = "You opened the Red door. You enter the room and the door locks behind you, trapping you forever.";
    document.getElementById('choice1').style.display = "none";
    document.getElementById('choice2').innerHTML = "Restart";
  } else if(choice == 1 && choice2 === 'Restart') {
    console.log('restart');
    window.location.reload();
  } else if(choice == 1 && choice2 === 'Go back') {
    document.getElementById('main-text').innerHTML = "You went back. There are two doors on either side of you. Will you enter the left door, or the right door?";
    document.getElementById('choice1').innerHTML = "Left Door";
    document.getElementById('choice2').innerHTML = "Right Door";
    document.getElementById('door-image').src = "./images/door.png";
  } else if (choice == 1 && choice2 === 'Right Door') {
    document.getElementById('main-text').innerHTML = "You opened the right door. Inside you see a blue door. Enter the blue door or go back?";
    document.getElementById('choice1').innerHTML = "Blue door";
    document.getElementById('choice2').innerHTML = "Go back";
    document.getElementById('door-image').src = "./images/blue-door.png";
  } else if(choice == 0 && choice1 === 'Blue door') {
    document.getElementById('main-text').innerHTML = "You opened the Blue door. You found your way out!";
    document.getElementById('choice1').style.display = "none";
    document.getElementById('choice2').innerHTML = "Restart";
  } else if(choice == 1 && choice2 === 'Restart') {
    console.log('restart');
    window.location.reload();
  }
}
