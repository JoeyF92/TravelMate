from application import db
from application.controllers.albumController import *
import pytest

def test_get_albums(client):
    response = client.get("/album/")
    assert response.status_code == 200
