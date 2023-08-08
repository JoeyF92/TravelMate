from application import app, db
from flask import Blueprint
from application.controllers.userController import *

user_routes = Blueprint("user_routes", __name__)
