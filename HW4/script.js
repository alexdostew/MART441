var mainText = document.getElementById("main-text");
var choiceInput = document.getElementById("choice");
var submitButton = document.getElementById("btnSubmit");
var restartButton = document.getElementById("btnRestart");

function getChoice() {
  var myChoice = choiceInput.value;

  switch(myChoice) {
    case 'north':
      mainText.innerHTML = 'You steer the boat north. You end up in violent shark infested water. The sharks destroy your boat before you can act. Your journey has come to an end.'
      showRestartButton(false);
      break;
    case 'east':
      mainText.innerHTML = 'You steer the boat east. You end up in large whirlpool. The whirlpool swallows your boat whole. Your journey has come to an end.'
      showRestartButton(false);
      break;
    case 'south':
      mainText.innerHTML = 'You steer the boat north. You see a cruise ship in the distance. You have been saved!'
      showRestartButton(true);
      break;
    case 'west':
      mainText.innerHTML = 'You steer the boat west. Ahead you see two different islands. Do you go to the &quot;left&quot; island or the &quot;right&quot; island'
      break;
    case 'left':
      mainText.innerHTML = 'You are ambushed by a violent tribe. Your journey has come to an end.'
      showRestartButton(false);
      break;
    case 'right':
      mainText.innerHTML = 'You find your way into a small village. There is a group of people up ahead. Ask for &quot;help&quot; or &quot;sneak&quot; away before you are seen?'
      break;
    case 'help':
      mainText.innerHTML = 'You ask the villagers for help. Luckily they speak english, and help you find your way back home. You have been saved!'
      showRestartButton(true);
      break;
    case 'sneak':
      mainText.innerHTML = 'You sneak away, but get lost in the jungle forever.'
      showRestartButton(false);
      break;
  }
}

function showRestartButton(win) {
  restartButton.style.display = "block";
  submitButton.style.display = "none";
  choiceInput.style.display = "none";

  if (win) {
    mainText.style.color = "lightgreen";
  } else {
    mainText.style.color = "red";
  }

}
