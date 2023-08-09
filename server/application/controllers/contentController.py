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
    content = Content(photo = photo, description = description, tags = tags, album_id = id)
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
    
    return


def destroy_content(id):

    return
