from application import create_app
import pytest, os

@pytest.fixture
def create_app():
    app = create_app("TEST")

    yield app

    # del os.environ("TEST_DB_URL")
    # del os.environ("SECRET_KEY")

@pytest.fixture()
def client():
    app = create_app("TEST")
    with app.test_client() as test_client:
        yield test_client
