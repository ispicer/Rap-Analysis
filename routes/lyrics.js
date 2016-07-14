var genius = require('node-genius')
	geniusClient = new genius('1WQ7RuuaI46ugNZqq4YJC5hiOYp7SHFdJ6qyVgRP7cEMsXii-Rw1jrTHl1V6gex-');
	itunes = require('./itunesSearch.js')
	async = require('async')
	request = require("request")
	cheerio = require("cheerio")


exports.getLyrics = function() {
	itunes.getArtistProjects('Kendrick Lamar', function(albums) {
		console.log(albums);
	})
}

var songNumber = function(artistName, songName) {
	geniusClient.search("Kendrick Lamar Alright", function (error, results) {
		var index = results.search("id"); //Finds the index of a song id
		var sub = results.substr(index, 12); //Returns the approximate area that the id should be in
		var id = sub.replace(/\D/g,''); //Removes all non-digits
		console.log(id);
	});
}

/*geniusClient.getSong('722278', 'dom', function(err, resp) {
	if(!err) {
		console.log(resp);
	} else {
		console.log(err);
	}
})*/

geniusClient.getMe(function(err, account){
	if(!err) {
		console.log(account);
	} else {
		console.log(err);
	}
})



/*request("http://genius.com/songs/722278", function(err, resp, html) {
	if(!err) {
		var $ = cheerio.load(html);

		$('.lyrics').filter(function(){
			var song = {
				production: [],
				lyrics: []
			}
			var data = $(this);
			var allLines = data.find('p').children('a');
			async.forEach(allLines, function(lyricsBatch, callback) {
            var lyrics = lyricsBatch.children
            for(var i=0; i<lyrics.length; i++) {
            	lyric = lyrics[i].data;
            	song.lyrics.push(lyric);
            }
            callback();
          }, function(err) {
            for(var i=0; i<song.length; i++) {
            	if(song[i] == undefined) {
            		song.splice(i, 1);
            	} else if(song[i].contains('[Produced by')) {
            		producer = 
            	}
            }
            console.log(song[0]);
          });
		})
	} else {
		console.log(err);
	}
})*/