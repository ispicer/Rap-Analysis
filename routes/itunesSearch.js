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
        results = data['results'];
        albums = [];
        albumString = '';
        async.forEach(results, function(result, callback) {
            var album_title = result['collectionName'];
            if(albumString.indexOf(album_title) === -1 && album_title !== '') {
              var album = {
                title: "",
                songs: []
              }
              albumString += album_title;
              album.title = album_title;
              albums.push(album);
            }
            callback();
          }, function(err) {
            callback(albums);
          });
        }
      }
    );
}

exports.getAlbumSongs = function(album, callback){
    album = album.replace(/ /g, "+");
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
  exports.getAlbums(artist, function(albums){
      async.forEach(albums, function(album, callback) {
        exports.getAlbumSongs(album.title, function(songs) {
           album.songs = songs;
           callback();
         });
      }, function(err) {
        console.log(albums);
      })
    });
}

exports.getArtistSongs('Kendrick Lamar', function(albums) {
  console.log(albums);
})