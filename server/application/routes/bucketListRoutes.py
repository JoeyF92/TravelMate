from application import app, db
from flask import Blueprint
from application.controllers.bucketListController import *

user_routes = Blueprint("bucket_routes", __name__)
