from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import bcrypt



load_dotenv()

db = SQLAlchemy()


# app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URL")
# app.config['SECRET_KEY'] = os.environ["SECRET_KEY"]
# app.config['OPENAI_API_KEY'] = os.environ.get("OPENAI_API_KEY")


def create_app(env=None):
    app = Flask(__name__)

    if env == 'TEST':
        # If the environment is set to 'TEST', configure the app for testing.
        app.config['TESTING'] = True
        app.config["DEBUG"] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("TEST_DB_URL")
        app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
        app.config['OPENAI_API_KEY'] = os.environ.get("OPENAI_API_KEY")
        url = os.getenv("TEST_DB_URL")
        if 'postgresql' not in url:
            url.replace("postgres","postgresql")
    else:
        # If the environment is not 'TEST', configure the app for regular use.
        app.config["TESTING"] = False
        app.config["DEBUG"] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URL')
        app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
        app.config['OPENAI_API_KEY'] = os.environ.get("OPENAI_API_KEY")
        url = os.getenv("DB_URL")
        if 'postgresql' not in url:
            url.replace("postgres","postgresql")


    db.init_app(app)

    CORS(app)

    from application.routes import user_routes, album_routes, bucket_routes, content_routes, itinerary_routes, packing_routes, preference_routes

    app.register_blueprint(user_routes, url_prefix="/user")
    app.register_blueprint(album_routes, url_prefix="/album")
    # app.register_blueprint(bucket_routes, url_prefix="/bucket")
    app.register_blueprint(content_routes, url_prefix="/content")
    app.register_blueprint(itinerary_routes, url_prefix="/itinerary")
    # app.register_blueprint(packing_routes, url_prefix="/packing")
    app.register_blueprint(preference_routes, url_prefix="/preference")

    return app
