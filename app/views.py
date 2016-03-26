import os
import config
import requests
import itunes
import json
import nltk
import pdb

from flask import Flask
from album import Album
from song import Song

app = Flask(__name__)
app.debug= True

@app.route("/")
def test():
    return "Welcome to the API!"

@app.route("/<artist>")
def get_data(artist):
    try:
        itunes_artist = itunes.search_artist(artist)[0]
    except IndexError:
        return "Artist Not Found B"

    albums = itunes_artist.get_albums()
    total = sum([len(a.get_tracks()) for a in albums])
    j=0
    res = [] 
    for i in xrange(len(albums)):
        if(i > 5):
            break;
        a = Album(albums[i].get_name())

        for song in (albums[i].get_tracks()):
            print str((j*100)/total) + "%"
            s = Song(song.get_name().split("(")[0])

            req_url = config.song_baseUrl + itunes_artist.get_name() + "/" + s.title
            r = requests.get(req_url)
            s.lyrics = r.json()['lyric']
            a.addSong(s)
            j += 1
        res.append(a)
    
    all_text = ""
    for album in res:
        for song in album.songs:
            all_text += song.lyrics

    pdb.set_trace()
    return str(res)


if __name__ == "__main__":
    app.run()
