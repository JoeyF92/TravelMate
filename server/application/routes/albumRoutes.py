# from application import db
from flask import Blueprint
from application.controllers.albumController import index_album, create, index_albums_by_user, index_album_by_id, update_album, destroy_album, index_album_by_code

album_routes = Blueprint("album_routes", __name__)

#Get all albums
@album_routes.route("/")
def get_albums():
    return index_album()

#Create an album by user id
@album_routes.route("/<int:user_id>", methods=["POST"])
def create_album(user_id):
    return create(user_id)

#Get all albums by user id
@album_routes.route("/user/<int:user_id>")
def get_albums_by_user(user_id):
    return index_albums_by_user(user_id)

#Get an album by album id
@album_routes.route("/<int:album_id>")
def get_album_by_id(album_id):
    return index_album_by_id(album_id)

#update an album by album id
@album_routes.route("/update/<int:album_id>", methods=["PUT"])
def update_album_by_id(album_id):
    return update_album(album_id)

#delete an album by album id
@album_routes.route("/<int:album_id>", methods=["DELETE"])
def destroy_album_by_id(album_id):
    return destroy_album(album_id)

#Get album by share code
@album_routes.route("/code/<int:share_code>")
def get_album_by_code(share_code):
    return index_album_by_code(share_code)
