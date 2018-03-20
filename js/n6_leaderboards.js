"use strict";

let n0_preload = require("./n0_preload");

let game = n0_preload.game;
let logoLeaderboards = n0_preload.logoLeaderboards;
let xBTN = n0_preload.xBTN;
let defaultMenu = n0_preload.defaultMenu;

let leaderState = {
    create: function(){
        defaultMenu = game.add.image(game.world.width*0.5, game.world.height*0.5, 'defaultMenu');
        defaultMenu.anchor.set(0.5, 0.5);

        logoLeaderboards = game.add.image(256, 18, 'logoLeaderboards');
        xBTN = game.add.button(23, 18, 'xBTN', this.exit, this);
    },
    exit: function(){
        game.state.start('menu');
    }
};

module.exports = {leaderState};