"use strict";

let Phaser = require("../phaser.min.js");

console.log("main.js test");

var game = new Phaser.Game(854, 480, Phaser.CANVAS, null, {
    preload: preload, create: create, update: update
});

function preload(){
    // game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
}

function create(){

}

function update(){

}