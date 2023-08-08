from application import app, db
from flask import Blueprint
from application.controllers.albumController import *

album_routes = Blueprint("album_routes", __name__)
