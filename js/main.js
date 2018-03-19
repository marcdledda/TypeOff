"use strict";
console.log("main.js test");

let Phaser = require("../phaser.min.js");
let mainMenu = require("./mainMenu.js");

let titleIMG;

var game = new Phaser.Game(854, 480, Phaser.CANVAS, null);

let titleState = {
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('titleIMG', 'js/media/ttl-scrn.png');
    },

    create: function(){
        titleIMG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'titleIMG');
        titleIMG.anchor.set(0.5);
    }
};

game.state.add('title', titleState);
game.state.start('title');