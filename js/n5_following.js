"use strict";

let n0_preload = require("./n0_preload"),
    $ = require('jquery'),
    firebase = require('./fb-config'),
    login = require("./user");

let game = n0_preload.game;
let logoFollowing = n0_preload.logoFollowing;
let xBTN = n0_preload.xBTN;
let defaultMenu = n0_preload.defaultMenu;
let friendBTN;
let searchQuestion = false;
let friendQuestion = true;
let friendPress = 0;

let friendData;
let friendID = [];
let friendName;
let friendNameTxT;
let friendScore;
let friendScoreTxT;
let friendF_UF;
let friendF_UFBTN;

let followBTN;
let unfollowBTN;
let searchData;
let followData;
let searchUsername;
let searchHiScore;
let followIDjson;
let followCheck;
var search;
let searchAmount = 0;

let followState = {
    create: function(){
        defaultMenu = game.add.image(game.world.width*0.5, game.world.height*0.5, 'defaultMenu');
        defaultMenu.anchor.set(0.5, 0.5);

        game.load.onFileComplete.add(postInfo2, this);

        friendBTN = game.add.button(276, 70, 'friends', friend, this);

        logoFollowing = game.add.image(256, 18, 'logoFollowing');
        xBTN = game.add.button(23, 18, 'xBTN', this.exit, this);

        showInput();
        game.input.keyboard.addCallbacks(this, keyPress, null, null);
    },
    exit: function(){
        game.state.start('menu');
        $('#input').hide();
        followCheck = undefined;
        searchQuestion = false;
        friendQuestion = true;
        searchAmount = 0;
    },
};

function friend(){
    let currentUser = login.getUser();
    checkFollow(currentUser).then(
        (resolve) => {
            friendPress++;
            for (let item in resolve) {
                friendID.push(`${item}`);
            }
            buildFriends(resolve);
        }
    );
}

function buildFriends(input){
    if (friendPress >= 2){
        friendName.destroy();
        friendScore.destroy();
        friendF_UF.destroy();
    }
    if (searchQuestion == true) {
        searchUsername.destroy();
        searchHiScore.destroy();
        if (followCheck == true) {
            unfollowBTN.destroy();
        } else if (followCheck !== true) {
            followBTN.destroy();
        }
        searchQuestion = false;
        friendQuestion = true;
    }
    let arrayInput = Object.values(input);
    friendData = arrayInput;
    printFriends();
}

function printFriends(){
    friendName = game.add.group();
    friendScore = game.add.group();
    friendF_UF = game.add.group();
    for (let i = 0; i < friendData.length; i++){
        let friendY = (i*(86)+111);
        friendNameTxT = game.add.text(341, friendY, `${friendData[i].followName}`, { font: '20px press_start_2pregular', fill: '#000000' });
        friendName.add(friendNameTxT);
        let scoreY = (i*(86)+145);
        friendScoreTxT = game.add.text(341, scoreY, `Highscore:${friendData[i].followScore}`, { font: '20px press_start_2pregular', fill: '#000000' });
        friendScore.add(friendScoreTxT);
        let btnX = friendNameTxT.width + 356;
        let btnY = (i*(86)+116);
        friendF_UFBTN = game.add.button(btnX, btnY, 'unfollow', ufFriend);
        friendF_UF.add(friendF_UFBTN);
    }
}

function ufFriend(e){
    if (e.y == 116) {
        let theID  = friendID[0];
        deleteFollow(theID).then(
            (resolve) => {
                e.destroy();
                friendF_UFBTN = game.add.button(e.x, e.y, 'follow', fFriend);
                friendF_UF.add(friendF_UFBTN);
            }
        );
    }
    else if (e.y == 202) {
        let theID  = friendID[1];
        deleteFollow(theID).then(
            (resolve) => {
                e.destroy();
                friendF_UFBTN = game.add.button(e.x, e.y, 'follow', fFriend);
                friendF_UF.add(friendF_UFBTN);
            }
        );
    } else if (e.y == 288) {
        let theID  = friendID[2];
        deleteFollow(theID).then(
            (resolve) => {
                e.destroy();
                friendF_UFBTN = game.add.button(e.x, e.y, 'follow', fFriend);
                friendF_UF.add(friendF_UFBTN);
            }
        );
    } else if (e.y == 374) {
        let theID  = friendID[3];
        deleteFollow(theID).then(
            (resolve) => {
                e.destroy();
                friendF_UFBTN = game.add.button(e.x, e.y, 'follow', fFriend);
                friendF_UF.add(friendF_UFBTN);
            }
        );
    }
}

function fFriend(e){
    if (e.y == 116) {
        let followObj = friendData[0];
        followFB(followObj).then(
            (resolve) => {
                e.destroy();
                friendF_UFBTN = game.add.button(e.x, e.y, 'unfollow', ufFriend);
                friendF_UF.add(friendF_UFBTN);
            }
        );
    } else if (e.y == 202) {
        let followObj = friendData[1];
        followFB(followObj).then(
            (resolve) => {
                e.destroy();
                friendF_UFBTN = game.add.button(e.x, e.y, 'unfollow', ufFriend);
                friendF_UF.add(friendF_UFBTN);
            }
        );
    } else if (e.y == 288) {
        let followObj = friendData[2];
        followFB(followObj).then(
            (resolve) => {
                e.destroy();
                friendF_UFBTN = game.add.button(e.x, e.y, 'unfollow', ufFriend);
                friendF_UF.add(friendF_UFBTN);
            }
        );
    } else if (e.y == 374) {
        let followObj = friendData[3];
        followFB(followObj).then(
            (resolve) => {
                e.destroy();
                friendF_UFBTN = game.add.button(e.x, e.y, 'unfollow', ufFriend);
                friendF_UF.add(friendF_UFBTN);
            }
        );
    }   
}

function keyPress(e){
    if (login.getUser() !== null && e.which === 13 || e.keyCode == 13){
        search = document.getElementById('input').value;
        if (search !== "" && search !== login.getName()) {
            n0_preload.searchUser(search).then(
                (resolve) => {
                    postInfo(resolve);
                }
            );
        }
    }
}

function postInfo(input){
    let arrayInput = Object.values(input);
    searchData = arrayInput;
    followData = arrayInput;

    // if (friendQuestion == true) {
    //     friendName.destroy();
    //     friendScore.destroy();
    //     friendF_UF.destroy();
    // }

    searchQuestion = true;
    friendQuestion = false;
    
    if (searchAmount >= 1) {
        searchUsername.destroy();
        searchHiScore.destroy();
        if (followCheck == true) {
            unfollowBTN.destroy();
        } else if (followCheck !== true) {
            followBTN.destroy();
        }
    }
    searchAmount++;
    postInfo2();
}

function postInfo2(){
    searchUsername = game.add.text(341, 111, `${searchData[0].name}`, { font: '20px press_start_2pregular', fill: '#000000' });
    searchHiScore = game.add.text(341, 145, `Highscore:${searchData[0].score}`, { font: '20px press_start_2pregular', fill: '#000000' });
    setButton();
}

function followUser(){
    let followObj = buildFollow();
    followFB(followObj).then(
        (resolve) => {
            followBTN.destroy();
            followCheck = true;
            let followX = searchUsername.width + 356;
            unfollowBTN = game.add.button(followX, 116, 'unfollow', unfollowUser);
        }
    );
}

function buildFollow(){
    let followObj = {
        followScore: followData[0].score,
        followName: followData[0].name,
        followPhoto: followData[0].photo,
        name: login.getName(),
        uid: login.getUser()
    };
    return followObj;
}

function followFB(follow){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/followers.json`,
        type: 'POST',
        data: JSON.stringify(follow),
        dataType: 'json'
    }).done((doneFollow) => {
        return doneFollow;
    });
}

function unfollowUser(){
    let theID = getID();
    deleteFollow(theID).then(
        (resolve) => {
            unfollowBTN.destroy();
            followCheck = false;
            let followX = searchUsername.width + 356;
            followBTN = game.add.button(followX, 116, 'follow', followUser);
        }
    );
}

function getID(){
    return followIDjson;
}

function deleteFollow(input) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/followers/${input}.json`,
        type: 'DELETE'
    }).done((data) => {
        return data;
    });
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

function setButton(){
    let currentUser = login.getUser();
    checkFollow(currentUser).then(
        (resolve) => {
            checkUser(resolve);
        }
    );
}

function checkUser(input){
    let arrayInput = Object.values(input);
    let i = 0;
    let j = 0;
    for (let item in arrayInput) {
        let fullItem = arrayInput[item];
        if (fullItem.followName == search){
            followCheck = true;
            break;
        } else {
            i++;
        }
        if (fullItem.followName !== search){
            followCheck = false;
        } 
    }

    for (let item2 in input){
        followIDjson = item2;
        if (j == i){
            break;
        } else {
            j++;
        }
    }

    if (followCheck == true){
        let followX = searchUsername.width + 356;
        unfollowBTN = game.add.button(followX, 116, 'unfollow', unfollowUser);   
    } else {
        let followX = searchUsername.width + 356;
        followBTN = game.add.button(followX, 116, 'follow', followUser);
    }
}

let checkFollow = (input) => {
    return new Promise ((resolve, reject) => {
        var FB = `${firebase.getFBsettings().databaseURL}/followers.json?orderBy="uid"&equalTo="${input}"`;
        
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

module.exports = {followState};