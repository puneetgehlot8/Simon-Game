var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var level = 0;
var userClickedPattern = [];

$(document).on("keydown", function (event) {
    if (level == 0) {
        nextSequence();
    }

});

function nextSequence() {
    userClickedPattern = [];
    $("#level-title").text("Level " + ++level);

    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeTo(100, 0.3, function () {
        $(this).fadeTo(500, 1.0);
        playSound(randomChosenColour);
    });

    // switch (randomChosenColour) {

    //     case "red":
    //         var redBtnMusic = new Audio("sounds/red.mp3");
    //         redBtnMusic.play();
    //         break;

    //     case "blue":
    //         var blueBtnMusic = new Audio("sounds/blue.mp3");
    //         blueBtnMusic.play();
    //         break;

    //     case "green":
    //         var greenBtnMusic = new Audio("sounds/green.mp3");
    //         greenBtnMusic.play();
    //         break;

    //     case "yellow":
    //         var yellowBtnMusic = new Audio("sounds/yellow.mp3");
    //         yellowBtnMusic.play();
    //         break;
    // }

}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});


function playSound(name) {
    var fadeMusic = new Audio("sounds/" + name + ".mp3");
    fadeMusic.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(gamePattern.length === userClickedPattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);
      }
  }
  else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

function startOver(){
    level = 0;
    gamePattern = [];
}