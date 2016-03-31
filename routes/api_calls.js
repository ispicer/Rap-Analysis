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
          // All good
        response = data;
        results = response['results'];
        for(i=0; i < response['resultCount']; i++){
            var song_title = results[i]['trackName'];
            //console.log(song_title)
          }
        }
      }
    );
}

function getArtistSongs(artist, callback) {
    getAlbums(artist, function(response){
        results = response['results'];
        albums = []
        for(i=0; i < response['resultCount']; i++){
            var album = {
                title: "",
                songs: []
            }
            var album_title = results[i]['collectionName'];
            album.title = album_title;
            albums.push(album);
        }
        //console.log(albums)
    });
}

getArtistSongs("Kendrick Lamar", console.log)
