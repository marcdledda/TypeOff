"use strict";

let n0_preload = require("./n0_preload");

let game = n0_preload.game;
let logoLeaderboards = n0_preload.logoLeaderboards;
let xBTN = n0_preload.xBTN;
let defaultMenu = n0_preload.defaultMenu;
let infoPos;

let rankCol;
let rankGroup;
let newRank;
let rankHead;

let scoreCol;
let scoreGroup;
let newScore;
let scoreHead;

let userCol;
let userGroup;
let newUser;
let userHead;

let leaderState = {
    create: function(){
        defaultMenu = game.add.image(game.world.width*0.5, game.world.height*0.5, 'defaultMenu');
        defaultMenu.anchor.set(0.5, 0.5);

        logoLeaderboards = game.add.image(193, 18, 'logoLeaderboards');
        xBTN = game.add.button(23, 18, 'xBTN', this.exit, this);

        leaderboardFill();
    },
    exit: function(){
        game.state.start('menu');
    }
};

function leaderboardFill(){
    n0_preload.getBoardDate().then(
        (resolve) => {
            printBoard(resolve);
        },
        (reject) => {
            console.log("didn't load");
        }
    );
}

function printBoard(board){
    let arrayInput = Object.values(board);
    arrayInput.sort(function (a,b){
        return b.score - a.score;
    });
    arrayInput.unshift("Filler");
    infoPos = {between: 16, height:20};
    rankGroup = game.add.group();
    scoreGroup = game.add.group();
    userGroup = game.add.group();
    for (let i = 0; i < arrayInput.length; i++){
        let rankX = 331;
        let scoreX = 477;
        let userX = 523;
        let generalY = (i*(infoPos.between+infoPos.height)+80);
        if (i == 0){
            rankHead = game.add.text(rankX, generalY, `Rank`, { font: '20px press_start_2pregular', fill: '#000000' });
            rankHead.anchor.set(1,0);
            rankGroup.add(rankHead);
            scoreHead = game.add.text(scoreX, generalY, `Score`, { font: '20px press_start_2pregular', fill: '#000000' });
            scoreHead.anchor.set(1,0);
            scoreGroup.add(scoreHead);
            userHead = game.add.text(userX, generalY, `Name`, { font: '20px press_start_2pregular', fill: '#000000' });
            userGroup.add(userHead);
        } else {
            newRank = game.add.text(rankX, generalY, `${i}`, { font: '20px press_start_2pregular', fill: '#000000' });
            newRank.anchor.set(1,0);
            rankGroup.add(newRank);
            newScore = game.add.text(scoreX, generalY, `${arrayInput[i].score}`, { font: '20px press_start_2pregular', fill: '#000000' });
            newScore.anchor.set(1,0);
            scoreGroup.add(newScore);
            newUser = game.add.text(userX, generalY, `${arrayInput[i].name}`, { font: '20px press_start_2pregular', fill: '#000000' });
            userGroup.add(newUser);
        }
        if (i == 10) {
            break;
        }
    }
}

module.exports = {leaderState};