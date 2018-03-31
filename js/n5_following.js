"use strict";

let n0_preload = require("./n0_preload"),
    $ = require('jquery'),
    login = require("./user");

let game = n0_preload.game;
let logoFollowing = n0_preload.logoFollowing;
let xBTN = n0_preload.xBTN;
let defaultMenu = n0_preload.defaultMenu;
let followBTN;
let unfollowBTN;
let searchData;
let followData;
let userPhoto;
let photoPreload;
let searchUsername;
let searchHiScore;

let followState = {
    create: function(){
        defaultMenu = game.add.image(game.world.width*0.5, game.world.height*0.5, 'defaultMenu');
        defaultMenu.anchor.set(0.5, 0.5);

        game.load.onFileComplete.add(postInfo2, this);

        logoFollowing = game.add.image(256, 18, 'logoFollowing');
        xBTN = game.add.button(23, 18, 'xBTN', this.exit, this);

        showInput();
        game.input.keyboard.addCallbacks(this, keyPress, null, null);
    },
    exit: function(){
        game.state.start('menu');
        $('#input').hide();
    },
};

function keyPress(e){
    if (login.getUser() !== null && e.which === 13 || e.keyCode == 13){
        var search = document.getElementById('input').value;
        if (search !== "") {
            n0_preload.searchUser(search).then(
                (resolve) => {
                    postInfo(resolve);
                }
            );
        }
    }
}

function postInfo(input){
    console.log(input);
    let arrayInput = Object.values(input);
    console.log(arrayInput);
    searchData = arrayInput;

    game.load.image('userIMG', `${arrayInput[0].photo}`);
    game.load.start();
}

function postInfo2(){
    userPhoto = game.add.image(256, 103, 'userIMG');
    userPhoto.scale.setTo(0.137, 0.137);
    searchUsername = game.add.text(341, 111, `${searchData[0].name}`, { font: '20px press_start_2pregular', fill: '#000000' });
    searchHiScore = game.add.text(341, 145, `Highscore:${searchData[0].score}`, { font: '20px press_start_2pregular', fill: '#000000' });
    let followX = searchUsername.width + 356;
    followBTN = game.add.button(followX, 116, 'follow', followUser);
}

function followUser(){
    console.log("followed!");
}

function showInput(){
    var x = $('canvas').offset();
    var d = document.getElementById('input');
    d.style.position = "absolute";
    let xSet = x.left + 326;
    let ySet = x.top + 73;
    d.style.left = xSet+'px';
    d.style.top = ySet+'px';
    $('#input').show();
}

module.exports = {followState};