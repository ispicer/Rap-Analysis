class Album:
    def __init__(self, title):
        self.title = title
        self.songs = []

    def addSong(self, song):
        self.songs.append(song)

    def __repr__(self):
        return self.title
