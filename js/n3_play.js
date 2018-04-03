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
let lvTwoBG;
let lvThreeBG;
let lvFourBG;
let lvFiveBG;
let lvSixBG;
let lvSevenBG;
let lvEightBG;
let pauseBTN = n0_preload.pauseBTN;
let pauseScreen = n0_preload.pauseScreen;
let logoPause = n0_preload.logoPause;
let resumeBTN = n0_preload.resumeBTN;
let backToTitleBTN = n0_preload.backToTitleBTN;
let textBar = n0_preload.textBar;
let tutorialScreen = n0_preload.tutorialScreen;
let startBTN = n0_preload.startBTN;
let startLoad;
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
let enemyBar;
let enemyConfig;

let forestMonster = n0_preload.forestMonster;
let lv1EnemyTxt;
let lv1EnemyLife = 2;
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
let playerWidth = 219;
let playerX = 219.5;
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
        if (lvSet == 1) {
            lvOneBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvOneBG');
            lvOneBG.anchor.set(0.5, 0.5);
        } else if (lvSet == 2) {
            lvTwoBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvTwoBG');
            lvTwoBG.anchor.set(0.5, 0.5);
        } else if (lvSet == 3) {
            lvThreeBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvThreeBG');
            lvThreeBG.anchor.set(0.5, 0.5);
        } else if (lvSet == 4) {
            lvFourBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvFourBG');
            lvFourBG.anchor.set(0.5, 0.5);
        } else if (lvSet == 5) {
            lvFiveBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvFiveBG');
            lvFiveBG.anchor.set(0.5, 0.5);
        } else if (lvSet == 6) {
            lvSixBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvSixBG');
            lvSixBG.anchor.set(0.5, 0.5);
        } else if (lvSet == 7) {
            lvSevenBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvSevenBG');
            lvSevenBG.anchor.set(0.5, 0.5);
        } else if (lvSet == 8) {
            lvEightBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvEightBG');
            lvEightBG.anchor.set(0.5, 0.5);
        }
        playerSprite = game.add.image(178, 186, 'playerSprite');
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        playerConfig = {width: playerWidth, height: 23, x: playerX, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 0, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);

        game.input.keyboard.addCallbacks(this, keyPress, null, null);
        game.input.onDown.add(this.pauseMenu);

        stopTime();

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
        transitionTxT = game.add.image(427, 116, `lv${lvSet}`);
        transitionTxT.anchor.set(0.5, 0.5);
        transitionTxT.alpha = 0;
        showLV = game.add.tween(transitionTxT).to( { alpha: 1 }, 250, Phaser.Easing.Linear.None);
        nothingLV = game.add.tween(transitionTxT).to( { y:116 , alpha: 1 }, 1000, Phaser.Easing.Linear.None);
        hideLV = game.add.tween(transitionTxT).to( { y:141 , alpha: 0 }, 1000, Phaser.Easing.Linear.None);
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
        startLoad = game.add.image(357, 382, 'startLoad');

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
        playerSprite = game.add.image(178, 186, 'playerSprite');
        forestMonster = game.add.image(427, 48, 'forestMonster');
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);

        LV1mob();
        
        playerConfig = {width: 219, height: 23, x: 219.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);
        
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
            playerWidth = 146;
            playerX = 256;
        } else if (playerLife == 2) {
            playerLife--;
            startState.playerBar.setPercent(50);
            playerWidth = 73;
            playerX = 292.5;
        } else if(playerLife == 1) {
            playerLife--;
            startState.playerBar.setPercent(0);
            clearInterval(monsterATK);
            gameOver();
        }
    }, 10000);
}

//LV 2
let start2State = {
    create: function() {
        lvTwoBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvTwoBG');
        lvTwoBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.image(178, 186, 'playerSprite');
        swampMonster = game.add.image(427, 18, 'swampMonster');
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);


        lv1EnemyLife = 2;
        LV2mob();

        playerConfig = {width: playerWidth, height: 23, x: playerX, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 0, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);
        
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
                start2State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                playerLife--;
                start2State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                playerLife--;
                start2State.playerBar.setPercent(0);
                clearInterval(monster2ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 3
let start3State = {
    create: function() {
        lvThreeBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvThreeBG');
        lvThreeBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.image(178, 186, 'playerSprite');
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv2EnemyLife = 2;
        LV3mob();

        playerConfig = {width: playerWidth, height: 23, x: playerX, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 0, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);
        
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
                start3State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                playerLife--;
                start3State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                playerLife--;
                start3State.playerBar.setPercent(0);
                clearInterval(monster3ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 4
let start4State = {
    create: function() {
        lvFourBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvFourBG');
        lvFourBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.image(178, 186, 'playerSprite');
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv3EnemyLife = 2;
        LV4mob();

        playerConfig = {width: playerWidth, height: 23, x: playerX, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 0, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);
        
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
                start4State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                playerLife--;
                start4State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                playerLife--;
                start4State.playerBar.setPercent(0);
                clearInterval(monster4ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 5
let start5State = {
    create: function() {
        lvFiveBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvFiveBG');
        lvFiveBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.image(178, 186, 'playerSprite');
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv4EnemyLife = 2;
        LV5mob();

        playerConfig = {width: playerWidth, height: 23, x: playerX, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 0, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);
        
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
                start5State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                playerLife--;
                start5State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                playerLife--;
                start5State.playerBar.setPercent(0);
                clearInterval(monster5ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 6
let start6State = {
    create: function() {
        lvSixBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvSixBG');
        lvSixBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.image(178, 186, 'playerSprite');
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv5EnemyLife = 2;
        LV6mob();

        playerConfig = {width: playerWidth, height: 23, x: playerX, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 0, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);
        
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
                start6State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                playerLife--;
                start6State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                playerLife--;
                start6State.playerBar.setPercent(0);
                clearInterval(monster6ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 7
let start7State = {
    create: function() {
        lvSevenBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvSevenBG');
        lvSevenBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.image(178, 186, 'playerSprite');
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv6EnemyLife = 2;
        LV7mob();

        playerConfig = {width: playerWidth, height: 23, x: playerX, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 0, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);
        
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
                start7State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                playerLife--;
                start7State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                playerLife--;
                start7State.playerBar.setPercent(0);
                clearInterval(monster7ATK);
                gameOver();
            }
        }
    }, 10000);
}

// LV 8
let start8State = {
    create: function() {
        lvEightBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvEightBG');
        lvEightBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.image(178, 186, 'playerSprite');
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);
        // swampMonster = game.add.image(547, 60, 'swampMonster');

        lv7EnemyLife = 2;
        LV8mob();

        playerConfig = {width: playerWidth, height: 23, x: playerX, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 0, flipped: true};
        this.playerBar = new HealthBar(this.game, playerConfig);
        
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
                start8State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                playerLife--;
                start8State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                playerLife--;
                start8State.playerBar.setPercent(0);
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
                startLoad.destroy();
                startBTN = game.add.button(357, 382, 'startBTN', playState.start);
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
            startState.enemyBar.setPercent((lv1EnemyLife / 2) * 100);
        } else if (lvSet == 2) {
            lv2EnemyLife--;
            start2State.enemyBar.setPercent((lv2EnemyLife / 2) * 100);
        } else if (lvSet == 3) {
            lv3EnemyLife--;
            start3State.enemyBar.setPercent((lv3EnemyLife / 2) * 100);
        } else if (lvSet == 4) {
            lv4EnemyLife--;
            start4State.enemyBar.setPercent((lv4EnemyLife / 2) * 100);
        } else if (lvSet == 5) {
            lv5EnemyLife--;
            start5State.enemyBar.setPercent((lv5EnemyLife / 2) * 100);
        } else if (lvSet == 6) {
            lv6EnemyLife--;
            start6State.enemyBar.setPercent((lv6EnemyLife / 2) * 100);
        } else if (lvSet == 7) {
            lv7EnemyLife--;
            start7State.enemyBar.setPercent((lv7EnemyLife / 2) * 100);
        } else if (lvSet == 8) {
            lv8EnemyLife--;
            start8State.enemyBar.setPercent((lv8EnemyLife / 2) * 100);
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