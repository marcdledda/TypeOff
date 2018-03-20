"use strict";

let n0_preload = require("./n0_preload");

let gameShort = n0_preload.game;
let titleIMG = n0_preload.titleIMG;
let newGameBTN = n0_preload.newGameBTN;

let titleState = {
    create: function() {
        titleIMG = gameShort.add.image(gameShort.world.width*0.5, gameShort.world.height*0.5, 'titleIMG');
        titleIMG.anchor.set(0.5);

        gameShort.input.onDown.add(this.change);
    },
    change: function() {
        gameShort.state.start('menu');
    }
};

module.exports = {titleState};