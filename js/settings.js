"use strict";

var gamesApp = gamesApp || {};

gamesApp.settings = {

    setPlayerName: function(name) {
        sessionStorage.playerName = name;
    },
    getPlayerName: function() {
        return sessionStorage.playerName || "";
    },

    getNumofImages: function() {
        return parseInt(sessionStorage.numImages) || 24;
    },

    setNumOfImages: function(number) {
        sessionStorage.numImages = number || 24;
    },
};