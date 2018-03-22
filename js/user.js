"use strict";
let firebase = require("./fb-config"),
	provider = new firebase.auth.GoogleAuthProvider(),
    currentUser = null,
    displayName = null;


function logInGoogle() {
  return firebase.auth().signInWithPopup(provider);
}

function logOut(){
  return firebase.auth().signOut();
}

function setUser(val){
	currentUser = val;
}

function getUser() {
  return currentUser;
}

function setName(val){
    displayName = val;
}

function getName(){
    return displayName;
}

firebase.auth().onAuthStateChanged(function(user){
	if (user){
        currentUser = user.uid;
        displayName = user.displayName;
	}else{
        currentUser = null;
        displayName = null;
		console.log("NO USER LOGGED IN");
	}
});

module.exports = {logInGoogle, logOut, setUser, getUser, setName, getName};