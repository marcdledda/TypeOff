"use strict";

let n0_preload = require("./n0_preload"),
    firebase = require('./fb-config'),
    $ = require('jquery'),
    login = require("./user");

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

let gameOverScreen = n0_preload.gameOverScreen;
let gameOverScoreTxT;
let gameOverLevelTxt;
let gameOverBack = n0_preload.gameOverBack;

let bmd;
let wordLibrary;
let word = "alba";
let correct = [];
let rndNum;
let lvSet = 1;

let forestMonster = n0_preload.forestMonster;
let lv1EnemyTxt;
let lv1EnemyLife = 5;
let enemyHeart = n0_preload.enemyHeart;
let monsterATK;

let lv2EnemyTxt;
let lv2EnemyLife = 6;
let swampMonster = n0_preload.swampMonster;
let monster2ATK;

let playerSprite = n0_preload.playerSprite;
let playerLife = 3;
let p1Heart = n0_preload.p1Heart;
let p2Heart = n0_preload.p2Heart;
let p3Heart = n0_preload.p3Heart;
let heartDamage = n0_preload.heartDamage;
let playerScore = 0;

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
        restart();
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

        lv1EnemyTxt = game.add.text(581, 95, `x${lv1EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(581, 115, 'heart');
        forestMonster = game.add.image(447, 150, 'forestMonster');

        LV1mob();

        playerSprite = game.add.image(278, 247, 'playerSprite');
        p1Heart = game.add.image(241, 206, 'heart');
        p2Heart = game.add.image(281, 206, 'heart');
        p3Heart = game.add.image(318, 206, 'heart');
        
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
    bmd.cls();
    var x = 0;
    let checker = 0;

    // console.log("get start", correct[0].substr(0,1));
    // console.log("get status", correct[0].slice(1,2));

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
        checker = 0;
        bmd.cls();
        if (lvSet == 1){
            lv1EnemyLife--;
            lv1EnemyTxt.setText(`x${lv1EnemyLife}`);
        } else if (lvSet == 2) {
            lv2EnemyLife--;
            lv2EnemyTxt.setText(`x${lv2EnemyLife}`);
        }
        if (lv1EnemyLife == 0) {
            game.state.start('lv2');
        } else if (lv2EnemyLife == 0) {
            playerScore = playerScore + 1013;
            gameOver();
        } else {
            wordSetup();
        }
        playerScore = playerScore + 1013;
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

function LV1mob(){
    monsterATK = setInterval(function(){
        if (playerLife == 3) {
            playerLife--;
            p1Heart.loadTexture('heartDamage');
            console.log('mon1 atk!');
        } else if (playerLife == 2) {
            playerLife--;
            p2Heart.loadTexture('heartDamage');
            console.log('mon1 atk!');
        } else if(playerLife == 1) {
            playerLife--;
            p3Heart.loadTexture('heartDamage');
            clearInterval(monsterATK);
            console.log('game over || score: ' + playerScore);
            gameOver();
        }
    }, 10000);
}

let start2State = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        lvSet = 2;

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv2EnemyTxt = game.add.text(507, 96, `x${lv2EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(507, 116, 'heart');
        swampMonster = game.add.image(547, 60, 'swampMonster');

        clearInterval(monsterATK);
        lv1EnemyLife = 5;
        LV2mob();

        playerSprite = game.add.image(278, 247, 'playerSprite');
        if (playerLife == 3){
            p1Heart = game.add.image(241, 206, 'heart');
            p2Heart = game.add.image(281, 206, 'heart');
            p3Heart = game.add.image(318, 206, 'heart');
        } else if (playerLife == 2){
            p1Heart = game.add.image(241, 206, 'heartDamage');
            p2Heart = game.add.image(281, 206, 'heart');
            p3Heart = game.add.image(318, 206, 'heart');
        } else if (playerLife == 1){
            p1Heart = game.add.image(241, 206, 'heartDamage');
            p2Heart = game.add.image(281, 206, 'heartDamage');
            p3Heart = game.add.image(318, 206, 'heart');
        }
        
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

function LV2mob(){
    monster2ATK = setInterval(function(){
        if (lv2EnemyLife == 0) {
            clearInterval(monster2ATK);
            console.log("monster defeated");
        } else {
            if (playerLife == 3) {
                playerLife--;
                p1Heart.loadTexture('heartDamage');
                console.log('mon2 atk!');
            } else if (playerLife == 2) {
                playerLife--;
                p2Heart.loadTexture('heartDamage');
                console.log('mon2 atk!');
            } else if(playerLife == 1) {
                playerLife--;
                p3Heart.loadTexture('heartDamage');
                clearInterval(monster2ATK);
                console.log('game over || score: ' + playerScore);
                gameOver();
            }
        }
    }, 10000);
}

function gameOver(){
    clearInterval(monster2ATK);
    pauseScreen = game.add.image(game.world.width*0.5, game.world.height*0.5, 'pauseScreen');
    pauseScreen.anchor.set(0.5, 0.5);
    gameOverScreen = game.add.image(game.world.width*0.5, game.world.height*0.5, 'gameOver');
    gameOverScreen.anchor.set(0.5, 0.5);
    gameOverScoreTxT = game.add.text(427, 193, `Score: ${playerScore}`, { font: '20px press_start_2pregular', fill: '#000000' });
    gameOverScoreTxT.anchor.set(0.5, 0.5);
    gameOverLevelTxt = game.add.text(427, 240, `Level Reached: ${lvSet}`, { font: '20px press_start_2pregular', fill: '#000000' });
    gameOverLevelTxt.anchor.set(0.5, 0.5);

    gameOverBack = game.add.button(298, 393, 'gameOverBack', backing);
    postScore();
}

function backing(){
    game.state.start('menu');
}

function restart(){
    playerScore = 0;
    playerLife = 3;
    lvSet = 1;
    lv1EnemyLife = 5;
    lv2EnemyLife = 6;
}

function postScore(){
    let scoreObj = buildScore();
    addScore(scoreObj).then(
        (resolve) => {
            console.log('post!');
        });
}

function buildScore(){
    let scoreObj = {
        score: playerScore,
        name: login.getName() ? `${login.getName()}` : "Guest",
        uid: login.getUser() ? `${login.getUser()}` : "UIDguest"
    };
    return scoreObj;
}

function addScore(score){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/scores.json`,
        type: 'POST',
        data: JSON.stringify(score),
        dataType: 'json'
    }).done((doneScore) => {
        return doneScore;
    });
}

module.exports = {playState, startState, start2State};