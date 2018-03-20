"use strict";

let n0_preload = require("./n0_preload");

let gameShort = n0_preload.game;
let menuIMG = n0_preload.menuIMG;
let newGameBTN = n0_preload.newGameBTN;

let menuState = {
    create: function() {
        menuIMG = gameShort.add.image(gameShort.world.width*0.5, gameShort.world.height*0.5, 'menuIMG');
        menuIMG.anchor.set(0.5);

        newGameBTN = gameShort.add.button(347, 246, 'newGameBTN', this.newGame, this);
    },
    newGame: function() {
        // gameShort.state.start('title');
        console.log("new game!");
    }
};

module.exports = {menuState};