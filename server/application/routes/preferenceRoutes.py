from application import db
from flask import Blueprint
from application.controllers.preferenceController import *

preference_routes = Blueprint("preference_routes", __name__)
