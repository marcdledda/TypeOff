"use strict";

let Phaser = require("../phaser.min.js"),
    n0_preload = require('./n0_preload'),
    n1_titleScreen = require('./n1_titleScreen'),
    n2_mainMenu = require('./n2_mainMenu'),
    n3_play = require('./n3_play'),
    n4_myScores = require('./n4_myScores'),
    n5_following = require('./n5_following'),
    n6_leaderboards = require('./n6_leaderboards');

let gameShort = n0_preload.game;

gameShort.state.add('preload', n0_preload.preloadState);
gameShort.state.add('title', n1_titleScreen.titleState);
gameShort.state.add('menu', n2_mainMenu.menuState);
gameShort.state.add('play', n3_play.playState);
    gameShort.state.add('start', n3_play.startState);
gameShort.state.add('scores', n4_myScores.scoreState);
gameShort.state.add('following', n5_following.followState);
gameShort.state.add('leaderboards', n6_leaderboards.leaderState);

gameShort.state.start('preload');