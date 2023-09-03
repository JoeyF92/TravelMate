from application import db
from application.controllers.itineraryController import *
from application.models.models import Itinerary

def test_generate_itinerary(client):
    data = {
        "itinerary": "test_itinerary",
        "album_id": 1
    }
    response = client.post("/itinerary/generate_itinerary")

    assert response.status_code == 200

def test_save_itinerary(client):

    assert True

def test_delete_itinerary(client):
    response = client.delete("/itinerary/delete_itinerary/1")
    assert response.status_code == 204

def test_get_itinerary(client):
    response = client.get("/itinerary/1")
    assert response.status_code == 200
