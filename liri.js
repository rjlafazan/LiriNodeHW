require("dotenv").config();
var fs = require("fs");

// pulls api keys
var keys = require("keys.js");

// calls necessary apis
var Twitter = require("twitter");

//key access
var client = new Twitter(keys.twitter);

// Twitter node module shows to grab keys like this... save this for later
// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });

//display  tweets
if ((process.argv[2] = "my-tweets")) {
  function displayTweets() {}
}
