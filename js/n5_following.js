"use strict";

let n0_preload = require("./n0_preload"),
    $ = require('jquery');

let game = n0_preload.game;
let logoFollowing = n0_preload.logoFollowing;
let xBTN = n0_preload.xBTN;
let defaultMenu = n0_preload.defaultMenu;

let followState = {
    create: function(){
        defaultMenu = game.add.image(game.world.width*0.5, game.world.height*0.5, 'defaultMenu');
        defaultMenu.anchor.set(0.5, 0.5);

        logoFollowing = game.add.image(256, 18, 'logoFollowing');
        xBTN = game.add.button(23, 18, 'xBTN', this.exit, this);
        hiding();

    },
    exit: function(){
        game.state.start('menu');
        $('#input').hide();
    },
};

function hiding(){
    var x = $('canvas').offset();
    var d = document.getElementById('input');
    d.style.position = "absolute";
    let xSet = x.left + 326;
    let ySet = x.top + 73;
    d.style.left = xSet+'px';
    d.style.top = ySet+'px';
    $('#input').show();
}

module.exports = {followState};