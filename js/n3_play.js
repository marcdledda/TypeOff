"use strict";

let n0_preload = require("./n0_preload");

let game = n0_preload.game;
let lvOneBG = n0_preload.lvOneBG;
let pauseBTN = n0_preload.pauseBTN;
let pauseScreen = n0_preload.pauseScreen;
let logoPause = n0_preload.logoPause;
let resumeBTN = n0_preload.resumeBTN;
let backToTitleBTN = n0_preload.backToTitleBTN;
let textBar = n0_preload.textBar;

let wordLibrary;

let playState = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        wordData();
    },
    pause: function() {
        game.state.start('pause');
    }
};

let pauseState = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        pauseScreen = game.add.image(game.world.width*0.5, game.world.height*0.5, 'pauseScreen');
        pauseScreen.anchor.set(0.5, 0.5);
        logoPause = game.add.image(330, 123, 'logoPause');

        resumeBTN = game.add.button(352, 277, 'resumeBTN', this.resume, this);
        backToTitleBTN = game.add.button(265, 336, 'backToTitleBTN', this.back, this);
    },
    resume: function(){
        game.state.start('play');
    },
    back: function(){
        game.state.start('menu');
    }
};

function wordData() {
    if (wordLibrary == undefined){
        n0_preload.getWordData().then(
            (resolve) => {
                wordLibrary = resolve;
            },
            (reject) => {
                console.log("didn't load!");
            }
        );
    }
}

module.exports = {playState, pauseState};