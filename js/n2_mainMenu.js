"use strict";

let n0_preload = require("./n0_preload");

let gameShort = n0_preload.game;
let menuIMG = n0_preload.menuIMG;
let newGameBTN = n0_preload.newGameBTN;
let myScoresBTN = n0_preload.myScoresBTN;
let followingBTN = n0_preload.followingBTN;
let leaderboardsBTN = n0_preload.leaderboardsBTN;
let logInBTN = n0_preload.logInBTN;

let menuState = {
    create: function() {
        menuIMG = gameShort.add.image(gameShort.world.width*0.5, gameShort.world.height*0.5, 'menuIMG');
        menuIMG.anchor.set(0.5, 0.5);

        newGameBTN = gameShort.add.button(347, 246, 'newGameBTN', this.newGame, this);
        myScoresBTN = gameShort.add.button(337, 291, 'myScoresBTN', this.myScores, this);
        followingBTN = gameShort.add.button(337, 336, 'followingBTN', this.following, this);
        leaderboardsBTN = gameShort.add.button(307, 381, 'leaderboardsBTN', this.leaderboards, this);
        logInBTN = gameShort.add.button(367, 426, 'logInBTN', this.logIn, this);
    },
    newGame: function() {
        gameShort.state.start('play');
    },
    myScores: function() {
        gameShort.state.start('scores');
    },
    following: function() {
        gameShort.state.start('following');
    },
    leaderboards: function (){
        console.log("leaderboards!");
    },
    logIn: function() {
        console.log("log in!");
    }
};

module.exports = {menuState};