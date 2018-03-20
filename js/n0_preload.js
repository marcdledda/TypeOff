"use strict";

let Phaser = require("../phaser.min.js");

var game = new Phaser.Game(854, 480, Phaser.CANVAS, null);

let titleIMG;
let menuIMG;

let preloadState = {
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('titleIMG', 'js/media/titleScreen.png');
        game.load.image('menuIMG', 'js/media/mainMenu.png');
    },

    create: function(){
        game.state.start('title');
    }
};

module.exports = {game, preloadState, titleIMG, menuIMG};
