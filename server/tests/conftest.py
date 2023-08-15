from application import create_app
import pytest, os

@pytest.fixture()
def client():
    app = create_app("TEST")
    with app.test_client() as test_client:
        yield test_client

@pytest.fixture()
def updated_album():
    return {
        "title": "test_title",
        "location": "test_location",
        "description": "test_description",
        "members": "1,2,3"
    }
