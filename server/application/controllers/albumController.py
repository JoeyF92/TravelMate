from application import db
# from application.models import Album
from flask import request, jsonify, render_template, redirect, url_for
from random import randint
# from .contentController import destroy_content_by_album

def index_album():
    #   return "<p>Hi!<p>"
    from application.models.models import Album
    albums = Album.query.all()
    data = [d.__dict__ for d in albums]
    for item in data:
        item.pop("_sa_instance_state", None)
    return data, 200

def create(id):
    from application.models.models import Album
    data = request.get_json()
    title = data.get("title")
    location = data.get("location")
    description = data.get("description")
    members = data.get("members")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    share_code = randint(100000, 999999)
    cover_photo = data.get("cover_photo")
    user_id = id
    if not title or not location:
        return jsonify({"error": "Missing parameters"}), 400
    album = Album(title = title, location = location, description = description, members = members, start_date = start_date, end_date = end_date, share_code = share_code,cover_photo = cover_photo, user_id = user_id)
    db.session.add(album)
    db.session.commit()
    return jsonify({"Message": "Successfully added a new album"}), 201

def index_albums_by_user(id):
    from application.models.models import Album
    albums = Album.query.filter_by(user_id = id).all()
    data = [d.__dict__ for d in albums]
    for item in data:
        item.pop("_sa_instance_state", None)
    return data, 200

def index_album_by_id(id):
    from application.models.models import Album
    album = Album.query.filter_by(album_id = id).first().__dict__
    album.pop("_sa_instance_state", None)
    return album, 200

def update_album(id):
    from application.models.models import Album
    data = request.get_json()
    album = db.session.get(Album, id)
    album.title = data.title or album.title
    album.location = data.location or album.location
    album.description = data.description or album.description
    album.members = data.members or album.members
    album.start_date = data.start_date or album.start_date
    album.end_date = data.end_date or album.end_date
    album.cover_photo = data.cover_photo or album.cover_photo
    db.session.commit()
    return jsonify({'message': 'Album details updated!'}), 200

#Deletes the content in the album before deleting the album itself
def destroy_album(id):
    from application.models.models import Album
    from .contentController import destroy_content_by_album
    album = db.session.get(Album, id)
    destroy_content_by_album(id)
    db.session.delete(album)
    db.session.commit()
    return jsonify({'message': 'Album deleted!'}), 204

def index_album_by_code(code):
    from application.models.models import Album
    album = Album.query.filter_by(share_code = code).first().__dict__
    album.pop("_sa_instance_state", None)
    return album, 200
