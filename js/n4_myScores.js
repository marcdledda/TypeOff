"use strict";

let n0_preload = require("./n0_preload"),
    login = require("./user");

let game = n0_preload.game;
let logoScores = n0_preload.logoScores;
let xBTN = n0_preload.xBTN;
let defaultMenu = n0_preload.defaultMenu;
let scoreTxt = n0_preload.scoreTxT;
let scoreGroup = n0_preload.scoreGroup;
let scoreInfo = n0_preload.scoreInfo;
let newScore = n0_preload.newScore;

let scoreState = {
    create: function() {
        defaultMenu = game.add.image(game.world.width*0.5, game.world.height*0.5, 'defaultMenu');
        defaultMenu.anchor.set(0.5, 0.5);

        logoScores = game.add.image(256, 18, 'logoScores');
        xBTN = game.add.button(23, 18, 'xBTN', this.exit, this);
        if (login.getUser() !== null){
            scoreFill();
        }
    },
    exit: function() {
        game.state.start('menu');
    }
};

function scoreFill() {
    let currentUser = login.getUser();
    n0_preload.getScoreData(currentUser).then(
        (resolve) => {
            printScores(resolve);
        },
        (reject) => {
            console.log("didn't load");
        }
    );
}

function printScores(scores){
    let arrayInput = Object.values(scores);
    arrayInput.sort(function (a,b){
        return b.score - a.score;
    });
    scoreTxt = game.add.text(477, 85, `Scores`, { font: '20px press_start_2pregular', fill: '#000000' });
    scoreTxt.anchor.set(1,0);
    scoreInfo = {between: 16, height:20};
    scoreGroup = game.add.group();
    for (let i = 0; i < arrayInput.length; i++){
        let scoreX = 477;
        let scoreY = ((i*(scoreInfo.height+scoreInfo.between))+121);
        newScore = game.add.text(scoreX, scoreY, `${arrayInput[i].score}`, { font: '20px press_start_2pregular', fill: '#000000' });
        newScore.anchor.set(1,0);
        scoreGroup.add(newScore);
        if (i === 9) {
            break;
        } 
    }
}

module.exports = {scoreState};