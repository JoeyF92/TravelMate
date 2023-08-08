from application import app, db
from flask import Blueprint
from application.controllers.albumController import *

user_routes = Blueprint("album_routes", __name__)
