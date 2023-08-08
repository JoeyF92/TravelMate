from application import app, db
from flask import Blueprint
from application.controllers.itineraryController import *

user_routes = Blueprint("itinerary_routes", __name__)
