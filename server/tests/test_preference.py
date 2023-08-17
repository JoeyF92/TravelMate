from application import db
from application.controllers.preferenceController import *
from application.models.models import Preference

def test_create_preference(client):
    data = {
        "first_name": "test",
        "last_name": "test",
        "email": "email@email.com",
        "username": "test",
        "password": "test",
        "profile_pic": ""
    }
    client.post("/user/register")
    data = {
        "foods": "test1,test2",
        "hobbies": "test3,test4",
        "other": "test5,test6"
    }
    response = client.post("/preference/6")
    assert response.status_code == 201

def test_get_preference_by_user(client):
    response = client.get("/preference/user/1")
    assert response.status_code == 200

def test_get_preference_by_album(client):
    response = client.get("/preference/album/1")
    assert response.status_code == 200

def test_update_preference(client):
    data = {
        "foods": "test1,test2",
        "hobbies": "test3,test4",
        "other": "test5,test6"
    }
    response = client.patch("/preference/update/1")
    assert response.status_code == 200

def test_delete_preference(client):
    response = client.delete("/preference/2")
    assert response.status_code == 204
