from application import db
from application.controllers.albumController import *
from application.models.models import Album
import pytest
from flask import g


def test_create_album(client):
    data = {
        "title": "test_title",
        "location": "test_location",
        "description": "test_description",
        "members": "1,2,3",
        "start_date": "2023-08-18 08:00:00 +0000",
        "end_date": "2023-08-19 08:00:00 +0000",
        "share_code": 100000,
        "cover_photo": ""
    }
    response = client.post("/album/1", json = data)
    assert response.status_code == 201
    
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

def test_album_by_code(client):
    response = client.get("/album/user/1")
    assert response.status_code == 200

def test_update_album(client):
    mock_album = {
        "title":"Mock Title",
        "location":"Mock Location",
        "description":"Mock Description",
        "members":"1,2,3",
        "start_date":"2023-08-18 08:00:00 +0000",
        "end_date":"2023-08-19 08:00:00 +0000",
        "share_code":100000,
        "cover_photo":"",
        "user_id":1
    }
    client.post("/album/1", json = mock_album)

    updated_data = {
        "title": "new_test_title",
        "location": "new_test_location",
        "description": "new_test_description",
        "members": "4,5,6"
    }

    response = client.put("/album/update/3", json=updated_data)
    assert response.status_code == 200

    updated_album = db.session.get(Album, 3)

    assert updated_album.title == updated_data["title"]
    assert updated_album.location == updated_data["location"]
    assert updated_album.description == updated_data["description"]
    assert updated_album.members == updated_data["members"]



# def test_update_album(client):
#     data = {
#         "title": "new_test_title",
#         "location": "new_test_location",
#         "description": "new_test_description",
#         "members": "1,2,3"
#         }
#     response = client.put("/album/update/3", json = data)
#     assert response.status_code == 200


