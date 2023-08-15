from application import db
from application.controllers.albumController import *
import pytest
from flask import g

def test_get_albums(client):
    response = client.get("/album/")
    assert response.status_code == 200

def test_get_album_by_user(client):
    response = client.get("/album/user/1")
    assert response.status_code == 200

def test_get_album_by_id(client):
    response = client.get("/album/1")
    assert response.status_code == 200

def test_album_by_user(client):
    response = client.get("/album/user/1")
    assert response.status_code == 200

def test_update_album(client):
    data = {
        "title": "test_title",
        "location": "test_location",
        "description": "test_description",
        "members": "1,2,3"
        }
    response = client.put("/album/update/2", json = data)
    assert response.status_code == 200
