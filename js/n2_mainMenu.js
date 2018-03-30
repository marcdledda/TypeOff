"use strict";

let n0_preload = require("./n0_preload"),
    login = require("./user"),
    $ = require('jquery'),
    firebase = require('./fb-config');

let gameShort = n0_preload.game;
let menuIMG = n0_preload.menuIMG;
let newGameBTN = n0_preload.newGameBTN;
let myScoresBTN = n0_preload.myScoresBTN;
let followingBTN = n0_preload.followingBTN;
let leaderboardsBTN = n0_preload.leaderboardsBTN;
let logInBTN = n0_preload.logInBTN;
let logOutBTN = n0_preload.logOutBTN;
let IDjson =n0_preload.IDjson;

let menuState = {
    create: function() {
        menuIMG = gameShort.add.image(gameShort.world.width*0.5, gameShort.world.height*0.5, 'menuIMG');
        menuIMG.anchor.set(0.5, 0.5);

        newGameBTN = gameShort.add.button(347, 246, 'newGameBTN', this.newGame, this);
        myScoresBTN = gameShort.add.button(337, 291, 'myScoresBTN', this.myScores, this);
        followingBTN = gameShort.add.button(337, 336, 'followingBTN', this.following, this);
        leaderboardsBTN = gameShort.add.button(307, 381, 'leaderboardsBTN', this.leaderboards, this);

        if (login.getUser() == null){
            logInBTN = gameShort.add.button(427, 436, 'logInBTN', this.logIn, this);
            logInBTN.anchor.set(0.5, 0.5);
        } else{
            logOutBTN = gameShort.add.button(427, 436, 'logOutBTN', this.logOut, this);
            logOutBTN.anchor.set(0.5, 0.5);
        }
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
        gameShort.state.start('leaderboards');
    },
    logIn: function() {
        login.logInGoogle()
        .then((result) => {
            login.setUser(result.user.uid);
            login.setName(result.user.displayName);
            logInBTN.destroy();
            logOutBTN = gameShort.add.button(427, 436, 'logOutBTN', this.logOut, this);
            logOutBTN.anchor.set(0.5, 0.5);
            startPost();
        });
    },
    logOut: function(){
        login.logOut();
        logOutBTN.destroy();
        logInBTN = gameShort.add.button(427, 436, 'logInBTN', this.logIn, this);
        logInBTN.anchor.set(0.5, 0.5);
    }
};

function startPost(){
    let currentUser = login.getUser();
    n0_preload.checkUser(currentUser).then(
        (resolve) => {
            let array = Object.values(resolve);
            if (array.length == 0) {
                getScores();
            } else {
                for (let item in resolve){
                    IDjson = item;
                }
            }
        },
        (reject) => {
            console.log("reject");
        }
    );
}

function getScores(){
    let currentUser = login.getUser();
    n0_preload.getScoreData(currentUser).then(
        (resolve) => {
            let arrayInput = Object.values(resolve);
            if (arrayInput.length == 0){
                let noUserObj = {
                    score: 0,
                    name: login.getName(),
                    uid: login.getUser(),
                    photo: login.getPhoto()
                };
                posting(noUserObj);
            } else {
                arrayInput.sort(function (a,b){
                    return b.score - a.score;
                });
                arrayInput[0].photo = login.getPhoto();
                let userObj = arrayInput[0];
                posting(userObj);
            }
        },
        (reject) => {
            console.log("second step reject");
        }
    );
}

function posting(input){
    postUser(input).then(
        (resolve) => {
            IDjson = resolve.name;
        },
        (reject) => {
            console.log("third reject");
        }
    );
}

function postUser(user) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user.json`,
        type: 'POST',
        data: JSON.stringify(user),
        dataType: 'json'
    }).done((doneUser) => {
        return doneUser;
    });
}

function getIDjson(){
    return IDjson;
}

module.exports = {menuState, getIDjson};