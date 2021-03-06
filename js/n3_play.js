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
let pAnim;

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

let enemyLifeDefault = {lv1: 6, lv2: 7, lv3: 9, lv4: 11, lv5: 13, lv6: 15, lv7: 17, lv8: 18};
let enemyATKRate = {lv1: 20000, lv2: 20000, lv3: 20000, lv4: 20000, lv5: 20000, lv6: 20000, lv7: 20000, lv8: 20000};

let Mon1;
let mon1Anim;
let lv1EnemyTxt;
let lv1EnemyLife = enemyLifeDefault.lv1;
let monsterATK;

let lv2EnemyTxt;
let lv2EnemyLife = enemyLifeDefault.lv2;
let Mon2;
let mon2Anim;
let monster2ATK;

let lv3EnemyTxt;
let lv3EnemyLife = enemyLifeDefault.lv3;
let Mon3;
let mon3Anim;
let monster3ATK;

let lv4EnemyTxt;
let lv4EnemyLife = enemyLifeDefault.lv4;
let Mon4;
let mon4Anim;
let monster4ATK;

let lv5EnemyTxt;
let lv5EnemyLife = enemyLifeDefault.lv5;
let Mon5;
let mon5Anim;
let monster5ATK;

let lv6EnemyTxt;
let lv6EnemyLife = enemyLifeDefault.lv6;
let Mon6;
let mon6Anim;
let monster6ATK;

let lv7EnemyTxt;
let lv7EnemyLife = enemyLifeDefault.lv7;
let Mon7;
let mon7Anim;
let monster7ATK;

let lv8EnemyTxt;
let lv8EnemyLife = enemyLifeDefault.lv8;
let Mon8;
let mon8Anim;
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
        playerSprite = game.add.sprite(185, 176, 'playerATK');
        pAnim = playerSprite.animations.add('pATK', [0,1,2,3,4,4,0], 10);
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
        if (wordData !== undefined){
            startLoad.destroy();
            startBTN = game.add.button(357, 382, 'startBTN', this.start);
        }
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
        playerSprite = game.add.sprite(185, 176, 'playerATK');
        pAnim = playerSprite.animations.add('pATK', [0,1,2,3,4,4,0], 10);
        pAnim.onComplete.add(transitioning, this);
        Mon1 = game.add.sprite(449, 6, 'Mon1');
        mon1Anim = Mon1.animations.add('mon1ATK', [0,1,2,3,0], 10);
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
            Mon1.animations.play('mon1ATK');
            playerLife--;
            startState.playerBar.setPercent((playerLife / 3)*100);
            playerWidth = 146;
            playerX = 256;
        } else if (playerLife == 2) {
            Mon1.animations.play('mon1ATK');
            playerLife--;
            startState.playerBar.setPercent(50);
            playerWidth = 73;
            playerX = 292.5;
        } else if(playerLife == 1) {
            Mon1.animations.play('mon1ATK');
            playerLife--;
            startState.playerBar.setPercent(0);
            clearInterval(monsterATK);
            gameOver();
        }
    }, enemyATKRate.lv1);
}

//LV 2
let start2State = {
    create: function() {
        lvTwoBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvTwoBG');
        lvTwoBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.sprite(185, 176, 'playerATK');
        pAnim = playerSprite.animations.add('pATK', [0,1,2,3,4,4,0], 10);
        pAnim.onComplete.add(transitioning, this);
        Mon2 = game.add.sprite(295, 18, 'Mon2');
        mon2Anim = Mon2.animations.add('mon2ATK', [0,1,1,1,1,2,3,3,4,4,0], 10);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);


        lv1EnemyLife = enemyLifeDefault.lv1;
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
                Mon2.animations.play('mon2ATK');
                playerLife--;
                start2State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                Mon2.animations.play('mon2ATK');
                playerLife--;
                start2State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                Mon2.animations.play('mon2ATK');
                playerLife--;
                start2State.playerBar.setPercent(0);
                clearInterval(monster2ATK);
                gameOver();
            }
        }
    }, enemyATKRate.lv2);
}

// LV 3
let start3State = {
    create: function() {
        lvThreeBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvThreeBG');
        lvThreeBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.sprite(185, 176, 'playerATK');
        pAnim = playerSprite.animations.add('pATK', [0,1,2,3,4,4,0], 10);
        pAnim.onComplete.add(transitioning, this);
        Mon3 = game.add.sprite(271, 69, 'Mon3');
        mon3Anim = Mon3.animations.add('mon3ATK', [0,1,2,3,4,0], 8);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);

        lv2EnemyLife = enemyLifeDefault.lv2;
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
                Mon3.animations.play('mon3ATK');
                playerLife--;
                start3State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                Mon3.animations.play('mon3ATK');
                playerLife--;
                start3State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                Mon3.animations.play('mon3ATK');
                playerLife--;
                start3State.playerBar.setPercent(0);
                clearInterval(monster3ATK);
                gameOver();
            }
        }
    }, enemyATKRate.lv3);
}

// LV 4
let start4State = {
    create: function() {
        lvFourBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvFourBG');
        lvFourBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.sprite(185, 176, 'playerATK');
        pAnim = playerSprite.animations.add('pATK', [0,1,2,3,4,4,0], 10);
        pAnim.onComplete.add(transitioning, this);
        Mon4 = game.add.sprite(469, 112, 'Mon4');
        mon4Anim = Mon4.animations.add('mon4ATK', [0,1,2,3,0], 8);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);

        lv3EnemyLife = enemyLifeDefault.lv3;
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
                Mon4.animations.play('mon4ATK');
                playerLife--;
                start4State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                Mon4.animations.play('mon4ATK');
                playerLife--;
                start4State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                Mon4.animations.play('mon4ATK');
                playerLife--;
                start4State.playerBar.setPercent(0);
                clearInterval(monster4ATK);
                gameOver();
            }
        }
    }, enemyATKRate.lv4);
}

// LV 5
let start5State = {
    create: function() {
        lvFiveBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvFiveBG');
        lvFiveBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.sprite(185, 176, 'playerATK');
        pAnim = playerSprite.animations.add('pATK', [0,1,2,3,4,4,0], 10);
        pAnim.onComplete.add(transitioning, this);
        Mon5 = game.add.sprite(455, 12, 'Mon5');
        mon5Anim = Mon5.animations.add('mon5ATK', [0,1,2,2,0], 5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);

        lv4EnemyLife = enemyLifeDefault.lv4;
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
                Mon5.animations.play('mon5ATK');
                playerLife--;
                start5State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                Mon5.animations.play('mon5ATK');
                playerLife--;
                start5State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                Mon5.animations.play('mon5ATK');
                playerLife--;
                start5State.playerBar.setPercent(0);
                clearInterval(monster5ATK);
                gameOver();
            }
        }
    }, enemyATKRate.lv5);
}

// LV 6
let start6State = {
    create: function() {
        lvSixBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvSixBG');
        lvSixBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.sprite(185, 176, 'playerATK');
        pAnim = playerSprite.animations.add('pATK', [0,1,2,3,4,4,0], 10);
        pAnim.onComplete.add(transitioning, this);
        Mon6 = game.add.sprite(560, 130, 'Mon6');
        mon6Anim = Mon6.animations.add('mon6ATK', [0,1,2,3,3,0], 5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);

        lv5EnemyLife = enemyLifeDefault.lv5;
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
                Mon6.animations.play('mon6ATK');
                playerLife--;
                start6State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                Mon6.animations.play('mon6ATK');
                playerLife--;
                start6State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                Mon6.animations.play('mon6ATK');
                playerLife--;
                start6State.playerBar.setPercent(0);
                clearInterval(monster6ATK);
                gameOver();
            }
        }
    }, enemyATKRate.lv6);
}

// LV 7
let start7State = {
    create: function() {
        lvSevenBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvSevenBG');
        lvSevenBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.sprite(185, 176, 'playerATK');
        pAnim = playerSprite.animations.add('pATK', [0,1,2,3,4,4,0], 10);
        pAnim.onComplete.add(transitioning, this);
        Mon7 = game.add.sprite(110, 179, 'Mon7');
        mon7Anim = Mon7.animations.add('mon7ATK', [0,1,1,2,2,2,0], 5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);

        lv6EnemyLife = enemyLifeDefault.lv6;
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
                Mon7.animations.play('mon7ATK');
                playerLife--;
                start7State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                Mon7.animations.play('mon7ATK');
                playerLife--;
                start7State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                Mon7.animations.play('mon7ATK');
                playerLife--;
                start7State.playerBar.setPercent(0);
                clearInterval(monster7ATK);
                gameOver();
            }
        }
    }, enemyATKRate.lv7);
}

// LV 8
let start8State = {
    create: function() {
        lvEightBG = game.add.image(game.world.width*0.5, game.world.height*0.5, 'lvEightBG');
        lvEightBG.anchor.set(0.5, 0.5);
        playerSprite = game.add.sprite(185, 176, 'playerATK');
        pAnim = playerSprite.animations.add('pATK', [0,1,2,3,4,4,0], 10);
        pAnim.onComplete.add(transitioning, this);
        Mon8 = game.add.sprite(220, 12, 'Mon8');
        mon8Anim = Mon8.animations.add('mon8ATK', [0,1,2,3,0], 5);
        textBar = game.add.image(0, 318, 'textBar');
        btmLeft = game.add.image(0, 403, 'btmLeft');
        btmRight = game.add.image(430, 403, 'btmRight');
        playerBG = game.add.image(101, 426, 'healthBG');
        monsterBG = game.add.image(528, 426, 'healthBG');

        pauseBTN = game.add.button(23, 18, 'pauseBTN', this.pause, this);
        pauseBTN.scale.setTo(0.534, 0.529);

        enemyConfig= {width: 219, height: 23, x: 637.5, y: 441.5, bg : {color: '#000000'}, bar: {color: '#00FF08'}, animationDuration: 200, flipped: false};
        this.enemyBar = new HealthBar(this.game, enemyConfig);

        lv7EnemyLife = enemyLifeDefault.lv7;
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
                Mon8.animations.play('mon8ATK');
                playerLife--;
                start8State.playerBar.setPercent((playerLife / 3)*100);
                playerWidth = 146;
                playerX = 256;
            } else if (playerLife == 2) {
                Mon8.animations.play('mon8ATK');
                playerLife--;
                start8State.playerBar.setPercent(50);
                playerWidth = 73;
                playerX = 292.5;
            } else if(playerLife == 1) {
                Mon8.animations.play('mon8ATK');
                playerLife--;
                start8State.playerBar.setPercent(0);
                clearInterval(monster8ATK);
                gameOver();
            }
        }
    }, enemyATKRate.lv8);
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
    } else if (lv1EnemyLife == 0 || lv2EnemyLife == 0 || lv3EnemyLife == 0 || lv4EnemyLife == 0 || lv5EnemyLife == 0 || lv6EnemyLife == 0 || lv7EnemyLife == 0 || lv8EnemyLife == 0) {
        return;
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
            playerSprite.animations.play('pATK');
            startState.enemyBar.setPercent((lv1EnemyLife / enemyLifeDefault.lv1) * 100);
        } else if (lvSet == 2) {
            lv2EnemyLife--;
            playerSprite.animations.play('pATK');
            start2State.enemyBar.setPercent((lv2EnemyLife / enemyLifeDefault.lv2) * 100);
        } else if (lvSet == 3) {
            lv3EnemyLife--;
            playerSprite.animations.play('pATK');
            start3State.enemyBar.setPercent((lv3EnemyLife / enemyLifeDefault.lv3) * 100);
        } else if (lvSet == 4) {
            lv4EnemyLife--;
            playerSprite.animations.play('pATK');
            start4State.enemyBar.setPercent((lv4EnemyLife / enemyLifeDefault.lv4) * 100);
        } else if (lvSet == 5) {
            lv5EnemyLife--;
            playerSprite.animations.play('pATK');
            start5State.enemyBar.setPercent((lv5EnemyLife / enemyLifeDefault.lv5) * 100);
        } else if (lvSet == 6) {
            lv6EnemyLife--;
            playerSprite.animations.play('pATK');
            start6State.enemyBar.setPercent((lv6EnemyLife / enemyLifeDefault.lv6) * 100);
        } else if (lvSet == 7) {
            lv7EnemyLife--;
            playerSprite.animations.play('pATK');
            start7State.enemyBar.setPercent((lv7EnemyLife / enemyLifeDefault.lv7) * 100);
        } else if (lvSet == 8) {
            lv8EnemyLife--;
            playerSprite.animations.play('pATK');
            start8State.enemyBar.setPercent((lv8EnemyLife / enemyLifeDefault.lv8) * 100);
        }


        if (lv1EnemyLife == 0) {
            lvSet = 2;
            playerSprite.animations.play('pATK');
        } else if (lv2EnemyLife == 0) {
            lvSet = 3;
            playerSprite.animations.play('pATK');
        } else if (lv3EnemyLife == 0) {
            lvSet = 4;
            playerSprite.animations.play('pATK');
        } else if (lv4EnemyLife == 0) {
            lvSet = 5;
            playerSprite.animations.play('pATK');
        } else if (lv5EnemyLife == 0) {
            lvSet = 6;
            playerSprite.animations.play('pATK');
        } else if (lv6EnemyLife == 0) {
            lvSet = 7;
            playerSprite.animations.play('pATK');
        } else if (lv7EnemyLife == 0) {
            lvSet = 8;
            playerSprite.animations.play('pATK');
        } else if (lv8EnemyLife == 0) {
            playerScore = playerScore + 1250;
            playerSprite.animations.play('pATK');
        }
        else {
            wordSetup();
        }
        playerScore = playerScore + 1250;
    }
}
// WORD PART //
///////////////

function transitioning(){
    if (lv1EnemyLife == 0) {
        game.state.start('transition');
    } else if (lv2EnemyLife == 0) {
        game.state.start('transition');
    } else if (lv3EnemyLife == 0) {
        game.state.start('transition');
    } else if (lv4EnemyLife == 0) {
        game.state.start('transition');
    } else if (lv5EnemyLife == 0) {
        game.state.start('transition');
    } else if (lv6EnemyLife == 0) {
        game.state.start('transition');
    } else if (lv7EnemyLife == 0) {
        game.state.start('transition');
    } else if (lv8EnemyLife == 0) {
        gameOver();
    }
}

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
    lv1EnemyLife = enemyLifeDefault.lv1;
    lv2EnemyLife = enemyLifeDefault.lv2;
    lv3EnemyLife = enemyLifeDefault.lv3;
    lv4EnemyLife = enemyLifeDefault.lv4;
    lv5EnemyLife = enemyLifeDefault.lv5;
    lv6EnemyLife = enemyLifeDefault.lv6;
    lv7EnemyLife = enemyLifeDefault.lv7;
    lv8EnemyLife = enemyLifeDefault.lv8;
}

// function restartEnemyHealth(){
//     lv1EnemyLife = enemyLifeDefault.lv1;
//     lv2EnemyLife = enemyLifeDefault.lv2;
//     lv3EnemyLife = enemyLifeDefault.lv3;
//     lv4EnemyLife = enemyLifeDefault.lv4;
//     lv5EnemyLife = enemyLifeDefault.lv5;
//     lv6EnemyLife = enemyLifeDefault.lv6;
//     lv7EnemyLife = enemyLifeDefault.lv7;
//     lv8EnemyLife = enemyLifeDefault.lv8;
// }

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