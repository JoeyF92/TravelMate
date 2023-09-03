from application import db
from application.controllers.albumController import *
from application.models.models import Album

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

def test_get_album_by_code(client):
    response = client.get("/album/code/123457")
    assert response.status_code == 200

def test_delete_album(client):
    response = client.delete("/album/1")
    assert response.status_code == 204

def test_update_album(client):
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
    client.post("/album/2", json = data)
    updated_data = {
        "title": "new_test_title",
        "location": "new_test_location",
        "description": "new_test_description",
        "members": "4,5,6"
    }
    response = client.put("/album/update/2", json=updated_data)
    assert response.status_code == 200

    updated_album = db.session.get(Album, 2)
    db.session.close()

    assert updated_album.title == updated_data["title"]
    assert updated_album.location == updated_data["location"]
    assert updated_album.description == updated_data["description"]
    assert updated_album.members == updated_data["members"]


