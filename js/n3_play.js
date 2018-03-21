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

let num = 2;
let bmd;
let wordLibrary;
let word = "alba";
let correct = [];
let rndNum;
let lv1EnemyTxt;
let lv1EnemyLife = 19;
let enemyHeart = n0_preload.enemyHeart;

//TUTORIAL PART
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

//GAME PART
let startState = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv1EnemyTxt = game.add.text(481, 185, 'x19', { font: '25px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(481, 210, 'enemyHeart');
        //Temp Scale
        enemyHeart.scale.setTo(5.538, 5.545);
        
        wordSetup();

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

function random(){
    let random = game.rnd.integerInRange(0, 600);
    let preWord = wordLibrary[random].word;
    word = preWord.toLowerCase();
}

function wordSetup(){
    random();
    for (let i = 0; i < word.length; i++){
        correct[i] = word[i] + `n${i}`;
    }
    let txtWidth;
    bmd = game.make.bitmapData(game.width, game.height);
    bmd.context.font = '25px press_start_2pregular';
    bmd.context.fillStyle = '#ffffff';
    bmd.context.fillText(word, 0, 25);
    txtWidth = ((game.world.width) / 2) - ((bmd.context.measureText(word).width) / 2);
    bmd.addToWorld(txtWidth, 352, 0, 0);
}

function keyPress(e){
    console.log("press");
    bmd.cls();
    var x = 0;
    // console.log("get start", correct[0].substr(0,1));
    // console.log("get status", correct[0].slice(1,2));
    let checker = 0;

    for (let i = 0; i < word.length; i++){
        var letter = word.charAt(i);
        let j;

        if (i == 0){
            j = 1;
        } else {
            j = i;
        }

        if (e.key === letter){
            if (correct[i].slice(1,2) == "n" && correct[i-1] === undefined || correct[j-1].slice(1,2) !== "n"){
                correct[i] = correct[i].substr(0,1) + `y${i}`;
            }
        }
        if (correct[i].slice(1,2) == "y"){
            bmd.context.fillStyle = "#00ff00";
            checker++;
        } else {
            bmd.context.fillStyle = "#ffffff";
        }
        bmd.context.fillText(letter, x, 25);

        x += bmd.context.measureText(letter).width;
    }

    if (checker == word.length) {
        bmd.cls();
        lv1EnemyLife--;
        lv1EnemyTxt.setText(`x${lv1EnemyLife}`);
        wordSetup();
    }
}

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

module.exports = {playState, startState};