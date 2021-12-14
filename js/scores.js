"use strict";

var gamesApp = gamesApp || {};

if(!sessionStorage.scores){
    sessionStorage.scores={};
}

var scoreStore = {};

scoreStore.getHighScore = function() {
        return sessionStorage.highScore;
}

scoreStore.setHighScore = function(newScore){
    var prevHigh = scoreStore.getHighScore();
    if(!prevHigh || prevHigh < newScore){
        sessionStorage.highScore = newScore;
    }
}

gamesApp.scores = (function(){
    var selection = 0, correctSel = 0, currentScore = 100;

    var updateHighScoreDisplay = function(){
        var highScore = scoreStore.getHighScore();
        $("#high_score").text(highScore?"High score: "+ highScore+"%":""); 
    }
    updateHighScoreDisplay();
    return {
        incrementMove: function(){
            selection++;
        },
        correctMove: function(){
            correctSel++;
        },
        isGameFinished: function() {
            if(correctSel === gamesApp.settings.getNumofImages()){
                scoreStore.setHighScore(currentScore);
                updateHighScoreDisplay();
                return true;
            }
            return false;
        },
        updateScore: function(){
            if(selection){
                currentScore = Math.floor(correctSel/selection*100);
                $("#correct").text("Correct: "+currentScore+"%");
            }else {
                currentScore= 100;
                $("#correct").text("");
            }
        }
    }
})();