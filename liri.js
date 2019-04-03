/* eslint-disable no-console */
/* eslint-disable no-undef */

//adding the require('dotenv') to read and set enviornment variables with dotenv package
require("dotenv").config();

//importing the key file as well as storing it as a variable
var keys = require("./keys.js");

// Load the fs package to read and write
var fs = require("fs");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

//include the spotify npm package
var Spotify = require('node-spotify-api');

//include the moment npm package
var moment = require('moment');

//calling the key for spotify from the key file.
var spotify = new Spotify(keys.spotify);

//create the following commands for 'concert-this' , 'spotify-this-song', 'movie-this', do-what-it-says'
//create the command variable for processing the commands
var command = process.argv[2];
var search  = process.argv[3];

//create a switch-case statement which will determine which function gets run.
switch (command){
case "concert-this":
concertThis();
break;

case "spotify-this-song":
SpotifyThisSong();
break;

case "movie-this":
movieThis();
break;

case "do-what-it-says":
doWhatItSays();
break;

default:
console.log("Input any of the following commands:\n\n"+"node liri.js concert-this,\n\n"+
"node liri.js spotify-this-song,\n\n"+"node liri.js movie-this,\n\n"+"node liri.js do-what-it-says");
}


function concertThis() {
    console.log("concert-this is still a work in progress");
}

function SpotifyThisSong() {
    console.log("spotify-this-song is still a work in progress");
}

function movieThis() {
    console.log("movie-this is still a work in progress");
}

function doWhatItSays(){
    console.log("do-what-it-says is still a work in progress");
}


axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
.then(function(result){
console.log(result.data);
console.log(result.status);
console.log(result.statusText);
console.log(result.headers);
console.log(result.config);
})
.catch(function(error){
    console.log(error);
});