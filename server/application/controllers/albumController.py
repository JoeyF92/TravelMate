from application import db
from flask import request, jsonify, render_template, redirect, url_for
from random import randint

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
    db.session.close()
    return jsonify({"Message": "Successfully added a new album"}), 201

def index_albums_by_user(id):
    from application.models.models import Album
    album_list = []
    data = []
    albums, status_code = index_album()
    for album in albums:
        members = album["members"].split(",")
        if str(id) in members:
            album_list.extend(str(album["album_id"]))

    for album_id in album_list:
        print(album_id)
        album, status_code = index_album_by_id(album_id)
        data.append(album)
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

    if 'title' in data:
        album.title = data['title']
    if 'location' in data:
        album.location = data['location']
    if 'description' in data:
        album.description = data['description']
    if 'members' in data:
        album.members = data['members']
    if 'start_date' in data:
        album.start_date = data['start_date']
    if 'end_date' in data:
        album.end_date = data['end_date']
    if 'cover_photo' in data:
        album.cover_photo = data['cover_photo']
    db.session.commit()
    db.session.close()
    return jsonify({'message': 'Album details updated!'}), 200

#Deletes the content in the album before deleting the album itself
def destroy_album(id):
    from application.models.models import Album, Content
    from .contentController import destroy_content_by_album, index_content_by_album
    album = db.session.get(Album, id)
    content, status_code = index_content_by_album(id)
    if content:
        destroy_content_by_album(id)
    db.session.delete(album)
    db.session.commit()
    db.session.close()
    return jsonify({'message': 'Album deleted!'}), 204

def index_album_by_code(code):
    from application.models.models import Album
    album = Album.query.filter_by(share_code = code).first().__dict__
    album.pop("_sa_instance_state", None)
    return album, 200
