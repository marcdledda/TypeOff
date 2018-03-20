"use strict";

let Phaser = require("../phaser.min.js"),
    n0_preload = require('./n0_preload'),
    n1_titleScreen = require('./n1_titleScreen'),
    n2_mainMenu = require('./n2_mainMenu');

let gameShort = n0_preload.game;

gameShort.state.add('preload', n0_preload.preloadState);
gameShort.state.add('title', n1_titleScreen.titleState);
gameShort.state.add('menu', n2_mainMenu.menuState);

gameShort.state.start('preload');