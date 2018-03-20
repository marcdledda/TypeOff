"use strict";

let n0_preload = require("./n0_preload");

let gameShort = n0_preload.game;
let menuIMG = n0_preload.menuIMG;

let menuState = {
    create: function() {
        menuIMG = gameShort.add.image(gameShort.world.width*0.5, gameShort.world.height*0.5, 'menuIMG');
        menuIMG.anchor.set(0.5);
    }
};

module.exports = {menuState};