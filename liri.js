require("dotenv").config();
var fs = require("fs");

// pulls api keys
var keys = require("./keys.js");

// calls necessary apis
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

//key access
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var apiCall = process.argv[2];
var apiSearch = process.argv[3];

// tweet function
function displayTweets() {
  //npm twitter documentation to display tweets
  var params = {
    screen_name: "mountainfit24",
    count: 20,
    include_rts: true,
  };

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

// spotify function
//doing stuff to display song information
function displaySpotifyData(searchItem) {
  // provides default song title if apiSearch is blank or grabs apiSearch input
  var songTitle = searchItem || apiSearch || "The-Sign";

  // var songTitle = apiSearch;
  spotify.search({ type: "track", query: songTitle }, function(error, data) {
    if (error) {
      return console.log("Error occurred: " + error);
    } else {
      // logs various data pulled from the spotify JSON object
      // console.log(data.tracks.items[0]);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
      console.log("Album name: " + data.tracks.items[0].album.name);
    }
  });
}

//omdb function
function displayMovieData() {
  var movieTitle = apiSearch;

  // var queryURL = "https://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle;
  request("https://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle, function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode === 200) {
      var apiResponse = JSON.parse(body);
      console.log("Title: " + apiResponse.Title);
      console.log("Year: " + apiResponse.Year);
      console.log("IMDB Rating: " + apiResponse.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + apiResponse.Ratings[1].Value);
      console.log("Country: " + apiResponse.Country);
      console.log("Language: " + apiResponse.Language);
      console.log("Plot: " + apiResponse.Plot);
      console.log("Actors: " + apiResponse.Actors);
    }
  });
}

//call functions by command
//tweet command
if (apiCall == "my-tweets") {
  displayTweets();
} else if (apiCall == "spotify-this-song") {
  // spotify command
  displaySpotifyData();
} else if (apiCall == "movie-this") {
  //omdb command
  displayMovieData();
} else if (apiCall == "do-what-it-says") {
  //text file command
  fs.readFile("./random.txt", "utf8", function(error, data) {
    if (error) {
      throw error;
    } else {
      console.log(data);

      var dataArray = data.split(",");
      console.log(dataArray[0]);

      var apiSearch = dataArray[1];
      if (dataArray[0] == "spotify-this-song") {
        displaySpotifyData(apiSearch);
      }
    }
  });
}
