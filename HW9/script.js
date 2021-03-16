var pokedex;

//changes color of text depending on type
(function($){
  $.fn.typeColor = function(type) {
    switch(type) {
      case "Fire":
        this.css("color", "red");
        break;
      case "Water":
        this.css("color", "blue");
        break;
      case "Grass":
        this.css("color", "green");
        break;
      case "Electric":
        this.css("color", "yellow");
        break;
      case "Ice":
        this.css("color", "aqua");
        break;
      case "Fighting":
        this.css("color", "chocolate");
        break;
      case "Poison":
        this.css("color", "darkmagenta");
        break;
      case "Ground":
        this.css("color", "brown");
        break;
      case "Flying":
        this.css("color", "cornsilk");
        break;
      case "Psychic":
        this.css("color", "deeppink");
        break;
      case "Bug":
        this.css("color", "forestgreen");
        break;
      case "Rock":
        this.css("color", "burlywood");
        break;
      case "Ghost":
        this.css("color", "darkslateblue");
        break;
      case "Dragon":
        this.css("color", "darkred");
        break;
      default:
        break;
    }
  }
}(jQuery));

//get information from json
$(function(){
  $.getJSON("pokemon.json", function(pd){
    pokedex = pd;
    getPokemon();
  });
});

function getPokemon() {
  // reset type text
  $("#pokeType").text("");

  var index = $("#index").val() - 1;
  var typeIndex = 0;
  //display pokemon name
  $("#pokeName").text(pokedex.pokemon[index].name);

  //display type of pokemon and change text color
  $.each(pokedex.pokemon[index].type, function(id, value) {
    $("#pokeType").append("<span id='type" + typeIndex + "'>" + value + "</span> ");
    $("#type" + typeIndex).typeColor(value);
    typeIndex++;
  });

  //display image of pokemon
  $("#pokeImg").attr("src", pokedex.pokemon[index].img);
}
