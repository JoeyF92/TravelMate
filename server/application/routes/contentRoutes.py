from application import db
from flask import Blueprint
from application.controllers.contentController import *

content_routes = Blueprint("content_routes", __name__)

#Get all content
@content_routes.route("/")
def get_contents():
    return index_content()

#Create content by album id
@content_routes.route("/<int:album_id>", methods=["POST"])
def create_content(album_id):
    return create(album_id)

#Get content by album id
@content_routes.route("/album/<int:album_id>")
def get_content_by_album(album_id):
    return index_content_by_album(album_id)

#Get content by content id
@content_routes.route("/<int:content_id>")
def get_content(content_id):
    return index_content(content_id)

#Update content by content id
@content_routes.route("/update/<int:content_id>", methods=["PUT"])
def update_content_by_id(content_id):
    return update_content(content_id)

#Delete content by content id
@content_routes.route("/<int:content_id>", methods=["DELETE"])
def destroy_content_by_id(content_id):
    return destroy_content(content_id)
