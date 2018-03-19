"use strict";
console.log("main.js test");

let Phaser = require("../phaser.min.js");
let mainMenu = require("./mainMenu.js");

let titleIMG;
let menuIMG;

var game = new Phaser.Game(854, 480, Phaser.CANVAS, null);

let loadState = {
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('titleIMG', 'js/media/ttl-scrn.png');
        game.load.image('menuIMG', 'js/media/mainMenu.png');
    },

    create: function(){
        game.state.start('title');
    }
};

let titleState = {
    create: function(){
        titleIMG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'titleIMG');
        titleIMG.anchor.set(0.5);

        game.input.onDown.add(this.change, this);
    },

    change: function(){
        game.state.start('menu');
    }
};

let menuState = {
    create: function(){
        menuIMG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'menuIMG');
        menuIMG.anchor.set(0.5, 0.5);
    }
};

// function changeScreen(){
//     console.log("click!");
// }

game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('menu', menuState);
game.state.start('load');