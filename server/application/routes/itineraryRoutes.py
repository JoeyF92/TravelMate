from application import app, db
from flask import Blueprint
from application.controllers.itineraryController import *

itinerary_routes = Blueprint("itinerary_routes", __name__)
