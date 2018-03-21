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
let tutorialScreen = n0_preload.tutorialScreen;
let startBTN = n0_preload.startBTN;

let bmd;
let wordLibrary;
let word = "word";

let playState = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        tutorialScreen = game.add.image(234, 38, 'tutorialScreen');

        pauseBTN = game.add.image(23, 18, 'pauseBTN');
        pauseBTN.scale.setTo(0.534, 0.529);
        startBTN = game.add.button(357, 382, 'startBTN', this.start, this);

        wordData();
    },
    start: function() {
        if (wordLibrary !== undefined){
            game.state.start('start');
        }
    }
};

let startState = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        //words
        bmd = game.make.bitmapData(game.width, game.height);
        bmd.context.font = '25px press_start_2pregular';
        bmd.context.fillStyle = '#ffffff';
        bmd.context.fillText(word, 25, 25);
        bmd.addToWorld();

        game.input.keyboard.addCallbacks(this, keyPress, null, null);
        game.input.onDown.add(this.pauseMenu);
    },
    pause: function() {
        game.paused = true;
        pauseScreen = game.add.image(game.world.width*0.5, game.world.height*0.5, 'pauseScreen');
        pauseScreen.anchor.set(0.5, 0.5);
        logoPause = game.add.image(330, 123, 'logoPause');

        resumeBTN = game.add.image(352, 277, 'resumeBTN');
        backToTitleBTN = game.add.image(265, 336, 'backToTitleBTN');
    },
    pauseMenu: function(event){
        if (game.paused){
            if(event.x > 352 && event.x < 502 && event.y > 277 && event.y < 302){
                pauseScreen.destroy();
                logoPause.destroy();
                resumeBTN.destroy();
                backToTitleBTN.destroy();
                game.paused = false;
            }
            if(event.x > 265 && event.x < 590 && event.y > 336 && event.y < 361){
                game.paused = false;
                game.state.start('menu');
            }
        }
    }
};

function keyPress(e){
    console.log("pressed", e.key);
}

function wordData() {
    if (wordLibrary == undefined){
        n0_preload.getWordData().then(
            (resolve) => {
                wordLibrary = resolve;
                console.log(wordLibrary);
                console.log("random word", wordLibrary[0].word);
            },
            (reject) => {
                console.log("didn't load!");
            }
        );
    }
}

module.exports = {playState, startState};