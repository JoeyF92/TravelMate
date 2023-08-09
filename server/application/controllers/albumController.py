from application import db, app
from application.models import Album
from flask import request, jsonify, render_template, redirect, url_for

def index_album():
    albums = Album.query.all()
    data = [d.__dict__ for d in albums]
    for item in data:
        item.pop("_sa_instance_state", None)
    return data, 200

def create(id):
    data = request.get_json()
    title = data.get("title")
    location = data.get("location")
    description = data.get("description")
    members = data.get("members")
    date = data.get("date")
    user_id = id
    if not title or not location:
        return jsonify({"error": "Missing parameters"}), 400
    album = Album(title = title, location = location, description = description, members = members, date = date, user_id = user_id)
    db.session.add(album)
    db.session.commit()
    return jsonify({"Message": "Successfully added a new album"}), 201

def index_albums_by_user(id):
    album = Album.query.filter_by(user_id = id).first().__dict__
    album.pop("_sa_instance_state", None)
    return album

def index_album_by_id(id):
    album = Album.query.filter_by(album_id = id).first().__dict__
    album.pop("_sa_instance_state", None)
    return album

def update_album_by_id(id):
    data = request.get_json()
    album = db.session.get(Album, id)
    album.title = data.title
    album.location = data.location
    album.description = data.description
    album.members = data.members
    album.date = data.date
    db.session.commit()
    return jsonify({'message': 'Album details updated!'})

def destroy_by_id(id):
    album = db.session.get(Album, id)
    db.session.delete(album)
    db.session.commit()
    return jsonify({'message': 'Album deleted!'})
