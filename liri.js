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
//uses input after command to search parameter with + to fill spaces
var search = process.argv.slice(3).join("+");
//global search log variable to take search and remove the + from spaces and display to user
var searchLog = process.argv.slice(3);

//create a switch-case statement which will determine which function gets run.
function liriCalls(command, searchInput) {
    switch (command) {
        case "concert-this":
            concertThis(searchInput);
            break;

        case "spotify-this-song":
            SpotifyThisSong(searchInput);
            break;

        case "movie-this":
            movieThis(searchInput);
            break;

        case "do-what-it-says":
            doWhatItSays(searchInput);
            break;

        default:
            console.log("Input any of the following commands:\n\n" +
                "node liri.js concert-this,\n\n" +
                "node liri.js spotify-this-song,\n\n" +
                "node liri.js movie-this,\n\n" +
                "node liri.js do-what-it-says");
    }
}

//this function is using the axios npm package to get data from bands in town using event end point.
function concertThis(artists) {
    axios.get("https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp")
        .then(function (result) {

            //creating a handle for events array for result.data
            let events = result.data;
            for (let i = 0; i < events.length; i++) {

                let eventDate = events[i].datetime;


                console.log("\n========================\n");
                console.log("Venue: " + events[i].venue.name);
                console.log("Date: " + moment(eventDate).format("MM/DD/YYYY"));
                console.log("Location: " + events[i].venue.city +
                    ", " + events[i].venue.region + " " +
                    events[i].venue.country);
            }
            console.log("\n==========end result===========\n");
        })
        .catch(function (error) {
            console.log(error);
        });
}

function SpotifyThisSong(songName) {
    if (songName === "") {
        songName = "the+sign+ace+of+base";
    }

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let songInfo = data.tracks.items;

        for (let i = 0; i < 5; i++) {
            console.log("Artist: " + songInfo[i].artists[0].name);
            console.log("Song: " + songInfo[i].name);
            console.log("Preview link: " + songInfo[i].external_urls.spotify);
            console.log("Album: " + songInfo[i].album.name);
        }
    });
}


function movieThis(movieName) {
    if (movieName === "") {
        movieName = "mr+nobody";
    }

    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy";
    axios.get(queryUrl)
        .then(function (movieData) {


            let movie = movieData.data;

            console.log("\n=============OMDB Results===========\n");
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("Imdb Rating: " + movie.imdbRating);
            console.log(movie.Ratings[1].Source + " Rating: " + movie.Ratings[1].Value);
            console.log("Country: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors/tress: " + movie.Actors);
            console.log("\n==========end result===========\n");

        })
        .catch(function (error) {
            console.log(error);
        });
}

function doWhatItSays() {
    console.log("do-what-it-says is still a work in progress");
}

liriCalls(command, search);
