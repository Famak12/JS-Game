var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress( function() {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  };
});

$(".btn").click( function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  makeSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {nextSequence()}, 1000);}
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press Any Key to Restart!");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
};

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);



  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  makeSound(randomChosenColour);
  animatePress(randomChosenColour);

};

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

 function makeSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
 };

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

};
