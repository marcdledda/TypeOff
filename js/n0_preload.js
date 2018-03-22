"use strict";

let Phaser = require("../phaser.min.js");

var game = new Phaser.Game(854, 480, Phaser.CANVAS, null);

//default Menu
let defaultMenu;
//exit
let xBTN;
//Title Screen
let titleIMG;
//Main Menu
let menuIMG;
let newGameBTN;
let myScoresBTN;
let followingBTN;
let leaderboardsBTN;
let logInBTN;
//Play
let lvOneBG;
let pauseBTN;
let pauseScreen;
let logoPause;
let resumeBTN;
let backToTitleBTN;
let textBar;
let tutorialScreen;
let startBTN;
let enemyHeart;
let forestMonster;
let swampMonster;
let playerSprite;
let p1Heart;
let p2Heart;
let p3Heart;
let heartDamage;
let gameOver;
let gameOverBack;
//Scores
let logoScores;
//Following
let logoFollowing;
//Leaderboards
let logoLeaderboards;

let getWordData = () => {
    return new Promise ((resolve, reject) => {
        var wordData = `http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=abbreviation,proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&minCorpusCount=10000&minDictionaryCount=2&minLength=2&maxLength=8&limit=600&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;
        
        let request = new XMLHttpRequest();

        request.onload = function() {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);
            }
        };
        request.open("GET", wordData);
        request.send();
    });
};

let preloadState = {
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        //defaultMenu
        game.load.image('defaultMenu', 'js/media/defaultMenu.png');

        //exit
        game.load.image('xBTN', 'js/media/xBTN.png');

        //Title Screen
        game.load.image('titleIMG', 'js/media/titleScreen.png');

        //Main Menu
        game.load.image('menuIMG', 'js/media/mainMenu.png');
        game.load.image('newGameBTN', 'js/media/BTN_newGame.png');
        game.load.image('myScoresBTN', 'js/media/BTN_myScores.png');
        game.load.image('followingBTN', 'js/media/BTN_following.png');
        game.load.image('leaderboardsBTN', 'js/media/BTN_leaderboards.png');
        game.load.image('logInBTN', 'js/media/BTN_logIn.png');

        //Play
        game.load.image('lvOneBG', 'js/media/levelOne.png');
        game.load.image('pauseBTN', 'js/media/pauseBTN.png');
        game.load.image('pauseScreen', 'js/media/pauseScreen.png');
        game.load.image('logoPause', 'js/media/logoPause.png');
        game.load.image('resumeBTN', 'js/media/resume.png');
        game.load.image('backToTitleBTN', 'js/media/backToTitle.png');
        game.load.image('textBar', 'js/media/textBar.png');
        game.load.image('tutorialScreen', 'js/media/tutorial.png');
        game.load.image('startBTN', 'js/media/startBTN.png');
        game.load.image('heart', 'js/media/heart.png');
        game.load.image('heartDamage', 'js/media/heartDamage.png');
        game.load.image('forestMonster', 'js/media/forestMonster.png');
        game.load.image('swampMonster', 'js/media/swampMonster.png');
        game.load.image('playerSprite', 'js/media/player.png');
        game.load.image('gameOver', 'js/media/gameOver.png');
        game.load.image('gameOverBack', 'js/media/backToTitleBLK.png');

        //Leaderboards
        game.load.image('logoScores', 'js/media/logoScores.png');

        //Following
        game.load.image('logoFollowing', 'js/media/logoFollowing.png');

        //Leaderboards
        game.load.image('logoLeaderboards', 'js/media/logoLeaderboards.png');
    },

    create: function(){
        game.state.start('title');
    }
};

module.exports = {game, preloadState, titleIMG, menuIMG, getWordData, newGameBTN, myScoresBTN, followingBTN, leaderboardsBTN, logInBTN, lvOneBG, logoScores, xBTN, defaultMenu, logoFollowing, logoLeaderboards, pauseBTN, pauseScreen, logoPause, resumeBTN, backToTitleBTN, textBar, tutorialScreen, startBTN, enemyHeart, p1Heart, p2Heart, p3Heart, heartDamage, forestMonster, playerSprite, swampMonster, gameOver, gameOverBack};
