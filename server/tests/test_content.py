from application import db
from application.models.models import Content
from application.controllers.packingListController import *
import pytest

def test_index_content(client):

    response = client.get('/')
    assert response.status_code == 200

# def test_create_content(client, db):
    
#     album_data = {
#         "name": "Test Album"
#     }
#     response = client.post("/album", json=album_data)
#     assert response.status_code == 201
#     album_id = response.json["album_id"]

    
#     content_data = {
#         "photo": "test_photo.jpg",
#         "description": "Test description",
#         "tags": ["tag1", "tag2"]
#     }

    
#     response = client.post(f"/{album_id}", json=content_data)

    
#     assert response.status_code == 201
#     assert response.json == {"Message": "Successfully added new content"}


def test_index_content_by_album(client):

    response = client.get('/album/1')
    assert response.status_code == 200

# def test_index_content(client):

#     response = client.get('/1')
#     assert response.status_code == 200






