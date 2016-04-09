var genius = require('rapgenius-js')
	itunes = require('./itunesSearch.js')

itunes.getArtistSongs('Kendrick Lamar', function(albums) {
	console.log(albums);
});