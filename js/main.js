"use strict";

let Phaser = require("../phaser.min.js");

console.log("main.js test");

let BIMG;

var game = new Phaser.Game(854, 480, Phaser.CANVAS, null, {
    preload: preload, create: create, update: update
});

function preload(){
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.load.image('BIMG', 'js/media/ttl-scrn.png');
}

function create(){
    BIMG = game.add.sprite(game.world.width*0.5, game.world.height*0.5, 'BIMG');
    BIMG.anchor.set(0.5);
}

function update(){

}