require("dotenv").config();
var fs = require("fs");

// pulls api keys
var keys = require("./keys.js");

// calls necessary apis
var Twitter = require("twitter");

//key access
var client = new Twitter(keys.twitter);

//display  tweets
if ((process.argv[2] = "my-tweets")) {
  function displayTweets() {
    //npm twitter documentation to display tweets
    var params = { screen_name: "mountainfit24", count: 20 };
    client.get("statuses/user_timeline", params, function(
      error,
      tweets,
      response
    ) {
      if (!error) {
        console.log(tweets);
      }
    });
  }
  displayTweets();
}
