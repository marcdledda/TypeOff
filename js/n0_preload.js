"use strict";

let Phaser = require("../phaser.min.js"),
    firebase = require('./fb-config');

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
let logOutBTN;
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
let playerSprite;
let p1Heart;
let p2Heart;
let p3Heart;
let heartDamage;
let gameOver;
let gameOverBack;
//Scores
let logoScores;
let scoreTxT;
let scoreGroup;
let scoreInfo;
let newScore;
//Following
let logoFollowing;
let IDjson;
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

let getScoreData = (input) => {
    return new Promise ((resolve, reject) => {
        var FB = `${firebase.getFBsettings().databaseURL}/scores.json?orderBy="uid"&equalTo="${input}"`;
        
        let request = new XMLHttpRequest();

        request.onload = function() {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);
            }
        };
        request.open("GET", FB);
        request.send();
    });
};

let getBoardDate = () => {
    return new Promise ((resolve, reject) => {
        var FB = `${firebase.getFBsettings().databaseURL}/scores.json`;
        
        let request = new XMLHttpRequest();

        request.onload = function() {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);
            }
        };
        request.open("GET", FB);
        request.send();
    });
};

let checkUser = (input) => {
    return new Promise ((resolve, reject) => {
        var FB = `${firebase.getFBsettings().databaseURL}/user.json?orderBy="uid"&equalTo="${input}"`;
        
        let request = new XMLHttpRequest();

        request.onload = function() {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);
            }
        };
        request.open("GET", FB);
        request.send();
    });
};

let searchUser = (input) => {
    return new Promise ((resolve, reject) => {
        var FB = `${firebase.getFBsettings().databaseURL}/user.json?orderBy="name"&equalTo="${input}"`;
        
        let request = new XMLHttpRequest();

        request.onload = function() {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);
            }
        };
        request.open("GET", FB);
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
        game.load.image('logOutBTN', 'js/media/BTN_logOut.png');

        //Play
        game.load.image('lvOneBG', 'js/media/levelOne.png');
        game.load.image('lvTwoBG', 'js/media/levelTwo.png');
        game.load.image('lvThreeBG', 'js/media/levelThree.png');
        game.load.image('lvFourBG', 'js/media/levelFour.png');
        game.load.image('lvFiveBG', 'js/media/levelFive.png');
        game.load.image('lvSixBG', 'js/media/levelSix.png');
        game.load.image('lvSevenBG', 'js/media/levelSeven.png');
        game.load.image('lvEightBG', 'js/media/levelEight.png');
        game.load.image('lv1', 'js/media/lv1.png');
        game.load.image('lv2', 'js/media/lv2.png');
        game.load.image('lv3', 'js/media/lv3.png');
        game.load.image('lv4', 'js/media/lv4.png');
        game.load.image('lv5', 'js/media/lv5.png');
        game.load.image('lv6', 'js/media/lv6.png');
        game.load.image('lv7', 'js/media/lv7.png');
        game.load.image('lv8', 'js/media/lv8.png');
        game.load.image('pauseBTN', 'js/media/pauseBTN.png');
        game.load.image('pauseScreen', 'js/media/pauseScreen.png');
        game.load.image('logoPause', 'js/media/logoPause.png');
        game.load.image('resumeBTN', 'js/media/resume.png');
        game.load.image('backToTitleBTN', 'js/media/backToTitle.png');
        game.load.image('textBar', 'js/media/textBar.png');
        game.load.image('btmLeft', 'js/media/btmLeft.png');
        game.load.image('btmRight', 'js/media/btmRight.png');
        game.load.image('tutorialScreen', 'js/media/tutorial.png');
        game.load.image('startLoad', 'js/media/startLoad.png');
        game.load.image('startBTN', 'js/media/startBTN.png');
        game.load.image('healthBG', 'js/media/healthBG.png');
        game.load.spritesheet('Mon1', 'js/media/1Mon.png', 387, 386, 4);
        game.load.spritesheet('Mon2', 'js/media/2Mon.png', 558, 386, 5);
        game.load.spritesheet('Mon3', 'js/media/3Mon.png', 579, 312, 5);
        game.load.spritesheet('Mon4', 'js/media/4Mon.png', 314, 256, 4);
        game.load.spritesheet('Mon5', 'js/media/5Mon.png', 362, 306, 3);
        game.load.image('Mon6', 'js/media/6Mon.png');
        game.load.image('Mon7', 'js/media/7Mon.png');
        game.load.spritesheet('Mon8', 'js/media/8Mon.png', 659, 354, 4);
        game.load.image('playerSprite', 'js/media/player.png');
        game.load.spritesheet('playerATK', 'js/media/playerATK.png', 299, 186, 5);
        game.load.image('gameOver', 'js/media/gameOver.png');
        game.load.image('gameOverBack', 'js/media/backToTitleBLK.png');

        //Leaderboards
        game.load.image('logoScores', 'js/media/logoScores.png');

        //Following
        game.load.image('logoFollowing', 'js/media/logoFollowing.png');
        game.load.image('follow', 'js/media/BTN_follow.png');
        game.load.image('unfollow', 'js/media/BTN_unfollow.png');
        game.load.image('friends', 'js/media/BTN_friends.png');

        //Leaderboards
        game.load.image('logoLeaderboards', 'js/media/logoLeaderboards.png');
    },

    create: function(){
        game.state.start('title');
    }
};

module.exports = {game, preloadState, titleIMG, menuIMG, getWordData, newGameBTN, myScoresBTN, followingBTN, leaderboardsBTN, logInBTN, lvOneBG, logoScores, xBTN, defaultMenu, logoFollowing, logoLeaderboards, pauseBTN, pauseScreen, logoPause, resumeBTN, backToTitleBTN, textBar, tutorialScreen, startBTN, p1Heart, p2Heart, p3Heart, heartDamage, playerSprite, gameOver, gameOverBack, logOutBTN, scoreTxT, getScoreData, scoreGroup, scoreInfo, newScore, getBoardDate, checkUser, IDjson, searchUser};
