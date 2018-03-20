"use strict";

let Phaser = require("../phaser.min.js");

var game = new Phaser.Game(854, 480, Phaser.CANVAS, null);

let titleIMG;
let menuIMG;
let newGameBTN;
let myScoresBTN;
let followingBTN;

let getWordData = () => {
    return new Promise ((resolve, reject) => {
        var wordData = `http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=abbreviation,proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&minCorpusCount=5000&minDictionaryCount=2&minLength=2&maxLength=8&limit=600&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;
        
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
        game.load.image('titleIMG', 'js/media/titleScreen.png');

        game.load.image('menuIMG', 'js/media/mainMenu.png');
        game.load.image('newGameBTN', 'js/media/BTN_newGame.png');
        game.load.image('myScoresBTN', 'js/media/BTN_myScores.png');
        game.load.image('followingBTN', 'js/media/BTN_following.png');
    },

    create: function(){
        game.state.start('title');
    }
};

module.exports = {game, preloadState, titleIMG, menuIMG, getWordData, newGameBTN, myScoresBTN, followingBTN};
