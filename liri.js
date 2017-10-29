	var fs = require("fs");
	var request = require("request");
	var keys = require("./keys.js");
	var twitter = require("twitter");
	var Spotify = require("node-spotify-api");
	var liriArgument = process.argv[2];


	switch (liriArgument) {
		case "tweets":
		myTweets();
		break;

		case "spotify":
		spotifyThisSong();
		break;

		case "movie":
		movieThis();
		break;

		case "do-what-it-says":
		doWhatItSays();
		break;
	}

	function myTweets () {
	var client = new twitter({
			consumer_key: '7DOXrGvIwqOi751NC516D2GN6',
  			consumer_secret: 'AzFNds3o78dotqwpwDB6QTor9KuaUfT0smwSo9clXKLrEi7Emc',
  			access_token_key: '920420506129588225-UnVqqFdSgDJWYM7SdROfuGHdxdbDCyN',
  			access_token_secret: '6oMY2WWATd7uedGCprXVuPRtOgNdDlNY0J5qhQlKmXgmO',
		});

		var twitterUsername = process.argv[3];
		if(!twitterUsername){

			twitterUsername = "MK_Wood8";
	}

	params = {screen_name: twitterUsername};
		client.get("statuses/user_timeline/", params, function(error, data, response){
			if (!error) {
				for(var i = 0; i < data.length; i++) {
					var twitterResults = 
					"@" + data[i].user.screen_name + ": " + 
					data[i].text + "\r\n" + 
					data[i].created_at + "\r\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
					console.log(twitterResults);
					
				}
			}  else {
				console.log("Error :"+ error);
				return;
			}
		});
	}

	function movieThis() {

		var movie = process.argv[3];

		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (!error && response.statusCode === 200) {
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Release Year: " + JSON.parse(body).Year);
		console.log("Rating: " + JSON.parse(body).imdbRating);
    	console.log("Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
} 		console.log("Actors: " + JSON.parse(body).Actors);
});

	}

	function spotifyThisSong() {

		var song = process.argv [3];
		var spotify = new Spotify ({
			id:'30272c8d197344939bb5db957f40f08e',
			secret: 'cc26b5b414ce4bb0b8ee80c7fe6300d7',
		});

		spotify.search({ type: 'track', query: song, limit: 5, }, function(err, data) {
  		if (!err) {

  			var songInfo = data.tracks.items;
  			for(var i = 0; i < 5; i++) {
					var spotifyResults = 
					"Artist: " + songInfo[i].artists[0].name + "\r\n" +
					"Song: " + songInfo[i].name + "\r\n" +
					"Album: " + songInfo[i].album.name + "\r\n" +
					"-------------"
					console.log(spotifyResults);
				}

  } else { 
  	console.log("error :" + err);
  	return;
  }
 
});


	};