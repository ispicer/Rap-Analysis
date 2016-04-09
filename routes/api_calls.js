http = require('http')
var searchitunes = require ('searchitunes');

// Find free Github app for iPhone in Dutch App Store
function getAlbums(artist, callback){
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

function getAlbumSongs(album, callback){
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

function getArtistSongs(artist, callback) {
    getAlbums(artist, function(response){
        results = response['results'];
        albums = [];
        albumString = '';
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
            }
        }
        callback(albums);
    });
}

getAlbumSongs('To Pimp A Butterfly', function(songs) {
  console.log(songs);
});
