from application import app, db
from flask import Blueprint
from application.controllers.contentController import *

user_routes = Blueprint("content_routes", __name__)
