"use strict";
let firebase = require("./fb-config"),
	provider = new firebase.auth.GoogleAuthProvider(),
    currentUser = null,
    displayName = null,
    photo = null;


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

function setPhoto(val){
    photo = val;
}

function getPhoto(){
    return photo;
}

firebase.auth().onAuthStateChanged(function(user){
	if (user){
        currentUser = user.uid;
        displayName = user.displayName;
        photo = user.photoURL;
	}else{
        currentUser = null;
        displayName = null;
        photo = null;
	}
});

module.exports = {logInGoogle, logOut, setUser, getUser, setName, getName, setPhoto, getPhoto};