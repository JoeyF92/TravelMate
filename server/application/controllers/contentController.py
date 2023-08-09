from application import db, app
from application.models import Content
from flask import request, jsonify, render_template, redirect, url_for

def index_content():
    content = Content.query.all()
    data = [d.__dict__ for d in content]
    for item in data:
        item.pop("_sa_instance_state", None)
    return data, 200

def create(id):
    data = request.get_json()
    photo = data.get("photo")
    description = data.get("description")
    tags = data.get("tags")
    album_id = id
    if not description:
        return jsonify({"error": "Missing parameters"}), 400
    content = Content(photo = photo, description = description, tags = tags, album_id = album_id)
    db.session.add(content)
    db.session.commit()
    return jsonify({"Message": "Successfully added new content"}), 201

def index_content_by_album(id):
    content = Content.query.filter_by(album_id = id).all()
    data = [d.__dict__ for d in content]
    for item in data:
        item.pop("_sa_instance_state", None)
    return data, 200

def index_content(id):
    content = Content.query.filter_by(content_id = id).first().__dict__
    content.pop("_sa_instance_state", None)
    return content, 200

def update_content(id):
    data = request.get_json()
    content = db.session.get(Content, id)
    photo = data.photo or content.photo
    description = data.description or content.description
    tags = data.tags or content.tags
    db.session.commit()
    return jsonify({"message": "Content details updated!"}), 200

def destroy_content(id):
    content = db.session(Content, id)
    db.session.delete(content)
    db.session.commit()
    return jsonify({'message': 'Content deleted!'}), 204

def destroy_content_by_album(id):
    contents = index_content_by_album(id)
    for c in contents:
        content = db.session.get(Content, c.get("content_id"))
        db.session.delete(content)
    db.session.commit()
    return jsonify({'message': 'Content deleted!'}), 204
