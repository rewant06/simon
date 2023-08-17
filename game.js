var buttonColours= ["red","blue","green","yellow"];

var gamePattern = [];

var userClickPattern = [];

var started = false;
var level = 0;



$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level"+level);
    nextSequence();
    started = true;
  }
});




$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePrss(userChosenColour);

  checkAnswer(userClickPattern.length-1);

});





function nextSequence()
{
  userClickPattern = [];

  level ++;
  $("#level-title").text("Level"+level);

var randomNumber = Math.floor(Math.random()*4);

 var randomChosenColour = buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);

 $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

 playSound(randomChosenColour)
}






function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}






function animatePrss(currentColour){

  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel){
  
  if(gamePattern[currentLevel] === userClickPattern[currentLevel])
{
  
  if(userClickPattern.length===gamePattern.length)
  {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
  else
  {
    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Retart");

    setTimeout(function() {
      $("body").romoveClass("game-over");
    }, 200);

    
    startOver();
  }


}



function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

