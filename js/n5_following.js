"use strict";

let n0_preload = require("./n0_preload"),
    $ = require('jquery'),
    login = require("./user");

let game = n0_preload.game;
let logoFollowing = n0_preload.logoFollowing;
let xBTN = n0_preload.xBTN;
let defaultMenu = n0_preload.defaultMenu;
let followData;
let userPhoto;
let photoPreload;

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
    console.log(arrayInput[0].photo);

    game.load.image('userIMG', `${arrayInput[0].photo}`);
    game.load.start();
    // postInfo2();
}

function postInfo2(){
    userPhoto = game.add.image(256, 103, 'userIMG');
    userPhoto.scale.setTo(0.137, 0.137);
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