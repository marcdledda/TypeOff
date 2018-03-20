"use strict";

let n0_preload = require("./n0_preload");

let game = n0_preload.game;
let lvOneBG = n0_preload.lvOneBG;

let playState = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);

        game.input.onDown.add(this.change);
    },
    change: function() {
        game.state.start('menu');
    }
};

module.exports = {playState};