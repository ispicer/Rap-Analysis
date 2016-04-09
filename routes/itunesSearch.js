var http = require('http')
  searchitunes = require ('searchitunes')
  async = require('async')
  exports = module.exports = {};

// Find free Github app for iPhone in Dutch App Store
exports.getAlbums = function(artist, callback){
    artist = artist.replace(/ /g, "+");
    console.log(artist)
    searchitunes (
      {
        media: 'music',
        country: 'US',
        entity: 'song',
        term: artist,
        limit: 10
      },
      function (err, data) {
        if (err) {
          // Error
          console.log ('Search failed: %s', err.message);
        } else {
          // All good
        response = data;
        callback(response);
        }
      }
    );
}

exports.getAlbumSongs = function(album, callback){
    album = album.replace(/ /g, "+");
    console.log(album)
    searchitunes (
      {
        media: 'music',
        country: 'US',
        entity: 'song',
        term: album,
      },
      function (err, data) {
        if (err) {
          // Error
          console.log ('Search failed: %s', err.message);
        } else {
          response = data;
          results = response['results'];
          songs = [];
          songString = '';
          for(i=0; i < response['resultCount']; i++){
            var song_title = results[i]['trackName'];
            if(songString.indexOf(song_title) === -1) {
              songString += song_title;
              songs.push(song_title);
            }
          }
          callback(songs);
        }
      }
    );
}

exports.getArtistSongs = function(artist, callback) {
    exports.getAlbums(artist, function(response){
        results = response['results'];
        albums = [];
        albumString = '';
        async.series([
          function() {
            for(i=0; i < response['resultCount']; i++){
              var album = {
                  title: "",
                  songs: []
              }
              var album_title = results[i]['collectionName'];
              if(albumString.indexOf(album_title) === -1) {
                albumString += album_title;
                album.title = album_title;
                albums.push(album);
                console.log('in');
              }
            }
          },
          function() {
            for(i=0; i < albums.length; i++) {
              exports.getAlbumSongs(albums[i].title, function(songs) {
                console.log('in');
                albums.songs[i] = songs;
              });
            }
          }
        ],
        callback(albums));
    });
}