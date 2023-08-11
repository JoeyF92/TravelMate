from application import db, app, bcrypt
from datetime import datetime

app.app_context().push()

class User(db.Model):
    __tablename__ = "user"
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    token = db.relationship('Token', backref='user')
    preference = db.relationship('Preference', backref='user')
    bucketlist = db.relationship('BucketList', backref='user')
    packinglist = db.relationship('PackingList', backref='user')
    album = db.relationship('Album', backref='user')

    def __init__(self, first_name, last_name, email, username, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.username = username
        self.password = password

class Token(db.Model):
    __tablename__ = "token"
    token_id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))

    def __init__(self, token, user_id):
        self.token = token
        self.user_id = user_id

class Preference(db.Model):
    __tablename__ = "preference"
    preference_id = db.Column(db.Integer, primary_key=True)
    foods = db.Column(db.String(100))
    hobbies = db.Column(db.String(100))
    other = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))

    def __init__(self, foods, hobbies, other, user_id):
        self.foods = foods
        self.hobbies = hobbies
        self.other = other
        self.user_id = user_id

class BucketList(db.Model):
    __tablename__ = "bucketlist"
    bucket_id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))

    def __init__(self, destination, description, user_id):
        self.destination = destination
        self.description = description
        self.user_id = user_id

class PackingList(db.Model):
    __tablename__ = "packinglist"
    list_id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(100), nullable=False)
    items = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))

    def __init__(self, destination, items, user_id):
        self.destination = destination
        self.items = items
        self.user_id = user_id

class Album(db.Model):
    __tablename__ = "album"
    album_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    members = db.Column(db.String(50))
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    share_code = db.Column(db.Integer, nullable=False)
    cover_photo = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))
    
    content = db.relationship('Content', backref='album')
    itinerary = db.relationship('Itinerary', backref='album')

    def __init__(self, title, location, description, members, start_date, end_date, share_code, cover_photo, user_id):
        self.title = title
        self.location = location
        self.description = description
        self.members = members
        self.start_date = start_date
        self.end_date = end_date
        self.share_code = share_code
        self.cover_photo = cover_photo
        self.user_id = user_id

class Content(db.Model):
    __tablename__ = "content"
    content_id = db.Column(db.Integer, primary_key=True)
    photo = db.Column(db.String(200))
    description = db.Column(db.String(200))
    tags = db.Column(db.String(50))
    album_id = db.Column(db.Integer, db.ForeignKey("album.album_id"))

    def __init__(self, photo, description, tags, album_id):
        self.photo = photo
        self.description = description
        self.tags = tags
        self.album_id = album_id

class Itinerary(db.Model):
    __tablename__ = "itinerary"
    itinerary_id = db.Column(db.Integer, primary_key=True)
    itinerary = db.Column(db.String, nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey("album.album_id"))

    def __init__(self, itinerary, album_id):
        self.itinerary = itinerary
        self.album_id = album_id
