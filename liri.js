require("dotenv").config();
var fs = require("fs");

// pulls api keys
var keys = require("./keys.js");

// calls necessary apis
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

//key access
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//display  tweets
if (process.argv[2] == "my-tweets") {
  function displayTweets() {
    //npm twitter documentation to display tweets
    var params = { screen_name: "mountainfit24", count: 20, include_rts: true };

    client.get("statuses/user_timeline", params, function(
      error,
      tweets,
      response
    ) {
      if (error) {
        throw error;
      } else {
        // loops through the tweets count and displays date created and text only
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].created_at + " " + tweets[i].text + " ");
        }
        // console.log(tweets);
      }
    });
  }
  displayTweets();
}

if (process.argv[2] == "spotify-this-song") {
  //doing stuff to display song information
  function displaySpotifyData() {
    var songTitle = process.argv[3];
    spotify.search({ type: "track", query: songTitle }, function(error, data) {
      if (error) {
        return console.log("Error occurred: " + error);
      } else {
        console.log(data.tracks.items[0].name);
      }
    });
  }
  displaySpotifyData();
}
