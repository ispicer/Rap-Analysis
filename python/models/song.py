class Song:
    def __init__(self, title):
        self.title = title
        self.lyrics = ""
        self.word_count = None

    def __repr__(self):
        return str({
                'lyrics': self.lyrics,
                'title': self.title
                })
