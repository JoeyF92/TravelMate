from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import os
import bcrypt


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URL")
app.config['SECRET_KEY'] = os.environ["SECRET_KEY"]
app.config['OPENAI_API_KEY'] = os.environ.get("OPENAI_API_KEY")


db = SQLAlchemy(app)

from application.routes import *
app.register_blueprint(user_routes, url_prefix="/user")
app.register_blueprint(album_routes, url_prefix="/album")
# app.register_blueprint(bucket_routes, url_prefix="/bucket")
app.register_blueprint(content_routes, url_prefix="/content")
app.register_blueprint(itinerary_routes, url_prefix="/itinerary")
# app.register_blueprint(packing_routes, url_prefix="/packing")
app.register_blueprint(preference_routes, url_prefix="/preference")
