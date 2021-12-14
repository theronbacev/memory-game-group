"use strict";

$(document).ready(() => {
    let settings = gamesApp.settings;

   $("#num_cards").val(settings.getNumofImages()* 2);
   
    var name;
    name = settings.getPlayerName();
    $("#player_name").val(name);
    
    if (name!==""){
      $("#player").text("Player:" + name);
    }
    $("#save_settings").click(() => {
        const playerName = $("#player_name").val();
        const numberOfImages =  $("#num_cards").val();
    
        // save settings
        settings.setPlayerName(playerName);
        settings.setNumOfImages(numberOfImages/2);
    
        window.location.reload();
      });
      
  });