from application import db
from application.controllers.itineraryController import *
from application.models.models import Itinerary

def test_generate_itinerary(client):

    assert True

def test_save_itinerary(client):

    assert True

def test_delete_itinerary(client):

    assert True

def test_get_itinerary(client):
    response = client.get("/itinerary/1")
    assert response.status_code == 200
