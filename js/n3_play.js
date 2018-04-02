"use strict";

let n0_preload = require("./n0_preload"),
    n2_mainMenu = require("./n2_mainMenu"),
    firebase = require('./fb-config'),
    $ = require('jquery'),
    Phaser = require("../phaser.min.js"),
    login = require("./user");
var HealthBar = require("../HealthBar.js");

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
let btmLeft;
let btmRight;
let playerBG;
let monsterBG;
let transitionTxT;
let showLV;
let hideLV;
let nothingLV;

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
let lv1EnemyLife = 2;
let enemyHeart = n0_preload.enemyHeart;
let monsterATK;

let lv2EnemyTxt;
let lv2EnemyLife = 2;
let swampMonster = n0_preload.swampMonster;
let monster2ATK;

let lv3EnemyTxt;
let lv3EnemyLife = 2;
// let swampMonster = n0_preload.swampMonster;
let monster3ATK;

let lv4EnemyTxt;
let lv4EnemyLife = 2;
// let swampMonster = n0_preload.swampMonster;
let monster4ATK;

let lv5EnemyTxt;
let lv5EnemyLife = 2;
// let swampMonster = n0_preload.swampMonster;
let monster5ATK;

let lv6EnemyTxt;
let lv6EnemyLife = 2;
// let swampMonster = n0_preload.swampMonster;
let monster6ATK;

let lv7EnemyTxt;
let lv7EnemyLife = 2;
// let swampMonster = n0_preload.swampMonster;
let monster7ATK;

let lv8EnemyTxt;
let lv8EnemyLife = 2;
// let swampMonster = n0_preload.swampMonster;
let monster8ATK;

let playerSprite = n0_preload.playerSprite;
let playerLife = 3;
let playerBar;
let playerConfig;
let p1Heart = n0_preload.p1Heart;
let p2Heart = n0_preload.p2Heart;
let p3Heart = n0_preload.p3Heart;
let heartDamage = n0_preload.heartDamage;
let playerScore = 0;

function stopTime(){
    clearInterval(monsterATK);
    clearInterval(monster2ATK);
    clearInterval(monster3ATK);
    clearInterval(monster4ATK);
    clearInterval(monster5ATK);
    clearInterval(monster6ATK);
    clearInterval(monster7ATK);
    clearInterval(monster8ATK);
}

//TRANSITIONS
let transitionState = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

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

        game.input.keyboard.addCallbacks(this, keyPress, null, null);
        game.input.onDown.add(this.pauseMenu);

        if (lv1EnemyLife == 0) {
            clearInterval(monsterATK);
        }
        if (lv2EnemyLife == 0) {
            clearInterval(monster2ATK);
        }
        if (lv3EnemyLife == 0) {
            clearInterval(monster3ATK);
        }
        if (lv4EnemyLife == 0) {
            clearInterval(monster4ATK);
        }
        if (lv5EnemyLife == 0) {
            clearInterval(monster5ATK);
        }
        if (lv6EnemyLife == 0) {
            clearInterval(monster6ATK);
        }
        if (lv7EnemyLife == 0) {
            clearInterval(monster7ATK);
        }

        this.levelShow();
    },
    pause: function() {
        game.paused = true;
        pauseScreen = game.add.image(game.world.width*0.5, game.world.height*0.5, 'pauseScreen');
        pauseScreen.anchor.set(0.5, 0.5);
        logoPause = game.add.image(330, 123, 'logoPause');
        stopTime();

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
    },
    levelShow: function(){
        transitionTxT = game.add.text(377, 112, `Level ${lvSet}`, { font: '20px press_start_2pregular', fill: '#000000' });
        transitionTxT.alpha = 0;
        showLV = game.add.tween(transitionTxT).to( { alpha: 1 }, 250, Phaser.Easing.Linear.None);
        nothingLV = game.add.tween(transitionTxT).to( { y:112 , alpha: 1 }, 1000, Phaser.Easing.Linear.None);
        hideLV = game.add.tween(transitionTxT).to( { y:137 , alpha: 0 }, 1000, Phaser.Easing.Linear.None);
        hideLV.onComplete.addOnce(function(){
            if (lvSet == 1) {
                game.state.start('start');
            } else if (lvSet == 2) {
                game.state.start('lv2');
            } else if (lvSet == 3) {
                game.state.start('lv3');
            } else if (lvSet == 4) {
                game.state.start('lv4');
            } else if (lvSet == 5) {
                game.state.start('lv5');
            } else if (lvSet == 6) {
                game.state.start('lv6');
            } else if (lvSet == 7) {
                game.state.start('lv7');
            } else if (lvSet == 8) {
                game.state.start('lv8');
            }
        },this);
        showLV.chain(nothingLV);
        nothingLV.chain(hideLV);
        showLV.start();
    }
};

//TUTORIAL PART
let playState = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        tutorialScreen = game.add.image(234, 38, 'tutorialScreen');

        pauseBTN = game.add.image(23, 18, 'pauseBTN');
        pauseBTN.scale.setTo(0.534, 0.529);
        startBTN = game.add.button(357, 382, 'startBTN', this.start, this);

        wordData();
        restart();
    },
    start: function() {
        if (wordLibrary !== undefined){
            game.state.start('transition');
        }
    }
};

//GAME PART
let startState = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv1EnemyTxt = game.add.text(581, 95, `x${lv1EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(581, 115, 'heart');
        forestMonster = game.add.image(447, 150, 'forestMonster');

        LV1mob();

        playerSprite = game.add.image(278, 247, 'playerSprite');
        playerConfig = {width: 219, height: 23, x: 219.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);

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
        stopTime();

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
                stopTime();
                game.state.start('menu');
            }
        }
    }
};

function LV1mob(){
    monsterATK = setInterval(function(){
        if (playerLife == 3) {
            playerLife--;
            startState.playerBar.setPercent((playerLife / 3)*100);
            p1Heart.loadTexture('heartDamage');
        } else if (playerLife == 2) {
            playerLife--;
            p2Heart.loadTexture('heartDamage');
            startState.playerBar.setPercent((playerLife / 3)*100);
        } else if(playerLife == 1) {
            playerLife--;
            p3Heart.loadTexture('heartDamage');
            startState.playerBar.setPercent((playerLife / 3)*100);
            clearInterval(monsterATK);
            gameOver();
        }
    }, 10000);
}

//LV 2
let start2State = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv2EnemyTxt = game.add.text(507, 96, `x${lv2EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(507, 116, 'heart');
        swampMonster = game.add.image(547, 60, 'swampMonster');

        lv1EnemyLife = 2;
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
        stopTime();

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
                stopTime();
                game.state.start('menu');
            }
        }
    }
};

function LV2mob(){
    monster2ATK = setInterval(function(){
        if (lv2EnemyLife == 0) {
            clearInterval(monster2ATK);
        } else {
            if (playerLife == 3) {
                playerLife--;
                p1Heart.loadTexture('heartDamage');
            } else if (playerLife == 2) {
                playerLife--;
                p2Heart.loadTexture('heartDamage');
            } else if(playerLife == 1) {
                playerLife--;
                p3Heart.loadTexture('heartDamage');
                clearInterval(monster2ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 3
let start3State = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv3EnemyTxt = game.add.text(507, 96, `x${lv3EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(507, 116, 'heart');
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv2EnemyLife = 2;
        LV3mob();

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
        stopTime();

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
                stopTime();
                game.state.start('menu');
            }
        }
    }
};

function LV3mob(){
    monster3ATK = setInterval(function(){
        if (lv3EnemyLife == 0) {
            clearInterval(monster3ATK);
        } else {
            if (playerLife == 3) {
                playerLife--;
                p1Heart.loadTexture('heartDamage');
            } else if (playerLife == 2) {
                playerLife--;
                p2Heart.loadTexture('heartDamage');
            } else if(playerLife == 1) {
                playerLife--;
                p3Heart.loadTexture('heartDamage');
                clearInterval(monster3ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 4
let start4State = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv4EnemyTxt = game.add.text(507, 96, `x${lv4EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(507, 116, 'heart');
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv3EnemyLife = 2;
        LV4mob();

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
        stopTime();

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
                stopTime();
                game.state.start('menu');
            }
        }
    }
};

function LV4mob(){
    monster4ATK = setInterval(function(){
        if (lv4EnemyLife == 0) {
            clearInterval(monster4ATK);
        } else {
            if (playerLife == 3) {
                playerLife--;
                p1Heart.loadTexture('heartDamage');
            } else if (playerLife == 2) {
                playerLife--;
                p2Heart.loadTexture('heartDamage');
            } else if(playerLife == 1) {
                playerLife--;
                p3Heart.loadTexture('heartDamage');
                clearInterval(monster4ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 5
let start5State = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv5EnemyTxt = game.add.text(507, 96, `x${lv5EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(507, 116, 'heart');
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv4EnemyLife = 2;
        LV5mob();

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
        stopTime();

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
                stopTime();
                game.state.start('menu');
            }
        }
    }
};

function LV5mob(){
    monster5ATK = setInterval(function(){
        if (lv5EnemyLife == 0) {
            clearInterval(monster5ATK);
        } else {
            if (playerLife == 3) {
                playerLife--;
                p1Heart.loadTexture('heartDamage');
            } else if (playerLife == 2) {
                playerLife--;
                p2Heart.loadTexture('heartDamage');
            } else if(playerLife == 1) {
                playerLife--;
                p3Heart.loadTexture('heartDamage');
                clearInterval(monster5ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 6
let start6State = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv6EnemyTxt = game.add.text(507, 96, `x${lv6EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(507, 116, 'heart');
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv5EnemyLife = 2;
        LV6mob();

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
        stopTime();

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
                stopTime();
                game.state.start('menu');
            }
        }
    }
};

function LV6mob(){
    monster6ATK = setInterval(function(){
        if (lv6EnemyLife == 0) {
            clearInterval(monster6ATK);
        } else {
            if (playerLife == 3) {
                playerLife--;
                p1Heart.loadTexture('heartDamage');
            } else if (playerLife == 2) {
                playerLife--;
                p2Heart.loadTexture('heartDamage');
            } else if(playerLife == 1) {
                playerLife--;
                p3Heart.loadTexture('heartDamage');
                clearInterval(monster6ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 7
let start7State = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv7EnemyTxt = game.add.text(507, 96, `x${lv7EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(507, 116, 'heart');
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv6EnemyLife = 2;
        LV7mob();

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
        stopTime();

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
                stopTime();
                game.state.start('menu');
            }
        }
    }
};

function LV7mob(){
    monster7ATK = setInterval(function(){
        if (lv7EnemyLife == 0) {
            clearInterval(monster7ATK);
        } else {
            if (playerLife == 3) {
                playerLife--;
                p1Heart.loadTexture('heartDamage');
            } else if (playerLife == 2) {
                playerLife--;
                p2Heart.loadTexture('heartDamage');
            } else if(playerLife == 1) {
                playerLife--;
                p3Heart.loadTexture('heartDamage');
                clearInterval(monster7ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 8
let start8State = {
    create: function() {
        lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
        lvOneBG.anchor.set(0.5, 0.5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        lv8EnemyTxt = game.add.text(507, 96, `x${lv8EnemyLife}`, { font: '20px press_start_2pregular', fill: '#FF0000' });
        enemyHeart = game.add.image(507, 116, 'heart');
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv7EnemyLife = 2;
        LV8mob();

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
        stopTime();

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
                stopTime();
                game.state.start('menu');
            }
        }
    }
};

function LV8mob(){
    monster8ATK = setInterval(function(){
        if (lv8EnemyLife == 0) {
            clearInterval(monster8ATK);
        } else {
            if (playerLife == 3) {
                playerLife--;
                p1Heart.loadTexture('heartDamage');
            } else if (playerLife == 2) {
                playerLife--;
                p2Heart.loadTexture('heartDamage');
            } else if(playerLife == 1) {
                playerLife--;
                p3Heart.loadTexture('heartDamage');
                clearInterval(monster8ATK);
                gameOver();
            }
        }
    }, 10000);
}

///////////////
// WORD PART //
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

function random(){
    let random = game.rnd.integerInRange(0, 600);
    let preWord = wordLibrary[random].word;
    word = preWord.toLowerCase();
}

function keyPress(e){
    if (e.key == 'Escape' && game.paused == false){
        startState.pause();
    }
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
        } else if (lvSet == 3) {
            lv3EnemyLife--;
            lv3EnemyTxt.setText(`x${lv3EnemyLife}`);
        } else if (lvSet == 4) {
            lv4EnemyLife--;
            lv4EnemyTxt.setText(`x${lv4EnemyLife}`);
        } else if (lvSet == 5) {
            lv5EnemyLife--;
            lv5EnemyTxt.setText(`x${lv5EnemyLife}`);
        } else if (lvSet == 6) {
            lv6EnemyLife--;
            lv6EnemyTxt.setText(`x${lv6EnemyLife}`);
        } else if (lvSet == 7) {
            lv7EnemyLife--;
            lv7EnemyTxt.setText(`x${lv7EnemyLife}`);
        } else if (lvSet == 8) {
            lv8EnemyLife--;
            lv8EnemyTxt.setText(`x${lv8EnemyLife}`);
        }


        if (lv1EnemyLife == 0) {
            lvSet = 2;
            game.state.start('transition');
        } else if (lv2EnemyLife == 0) {
            lvSet = 3;
            game.state.start('transition');
        } else if (lv3EnemyLife == 0) {
            lvSet = 4;
            game.state.start('transition');
        } else if (lv4EnemyLife == 0) {
            lvSet = 5;
            game.state.start('transition');
        } else if (lv5EnemyLife == 0) {
            lvSet = 6;
            game.state.start('transition');
        } else if (lv6EnemyLife == 0) {
            lvSet = 7;
            game.state.start('transition');
        } else if (lv7EnemyLife == 0) {
            lvSet = 8;
            game.state.start('transition');
        } else if (lv8EnemyLife == 0) {
            playerScore = playerScore + 452;
            gameOver();
        }
        else {
            wordSetup();
        }
        playerScore = playerScore + 452;
    }
}
// WORD PART //
///////////////

function gameOver(){
    pauseScreen = game.add.image(game.world.width*0.5, game.world.height*0.5, 'pauseScreen');
    pauseScreen.anchor.set(0.5, 0.5);
    gameOverScreen = game.add.image(game.world.width*0.5, game.world.height*0.5, 'gameOver');
    gameOverScreen.anchor.set(0.5, 0.5);
    gameOverScoreTxT = game.add.text(427, 193, `Score: ${playerScore}`, { font: '20px press_start_2pregular', fill: '#000000' });
    gameOverScoreTxT.anchor.set(0.5, 0.5);
    gameOverLevelTxt = game.add.text(427, 240, `Level Reached: ${lvSet}`, { font: '20px press_start_2pregular', fill: '#000000' });
    gameOverLevelTxt.anchor.set(0.5, 0.5);

    gameOverBack = game.add.button(298, 393, 'gameOverBack', backing);
    stopTime();
    postScore();
}

function backing(){
    game.state.start('menu');
}

function restart(){
    playerScore = 0;
    playerLife = 3;
    lvSet = 1;
    lv1EnemyLife = 2;
    lv2EnemyLife = 2;
    lv3EnemyLife = 2;
    lv4EnemyLife = 2;
    lv5EnemyLife = 2;
    lv6EnemyLife = 2;
    lv7EnemyLife = 2;
    lv8EnemyLife = 2;
}

function postScore(){
    let scoreObj = buildScore();
    addScore(scoreObj).then(
        (resolve) => {
            if (login.getUser() !== null){
                replaceHiScore();
            }
            console.log('post!');
        }
    );
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

function replaceHiScore(){
    let currentUser = login.getUser();
    n0_preload.getScoreData(currentUser).then(
        (resolve) => {
            let arrayInput = Object.values(resolve);
            arrayInput.sort(function (a,b){
                return b.score - a.score;
            });
            arrayInput[0].photo = login.getPhoto();
            let userObj = arrayInput[0];
            replaceHiScoreTwo(userObj);
        }
    );
}

function replaceHiScoreTwo(userObj){
    let IDjson = n2_mainMenu.getIDjson();
    editUser(userObj, IDjson).then(
        (resolve) => {
            console.log("k");
        }
    );
}

function editUser(data, user) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user/${user}.json`,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json'
    }).done((userData) => {
        return userData;
    });
}

module.exports = {playState, startState, start2State, transitionState, start3State, start4State, start5State, start6State, start7State, start8State};