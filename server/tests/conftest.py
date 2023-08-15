from application import create_app
import pytest, os

# @pytest.fixture
# def create_app():
#     return create_app("TEST")

@pytest.fixture()
def client():
    app = create_app("TEST")
    with app.test_client() as test_client:
        yield test_client

