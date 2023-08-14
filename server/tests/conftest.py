from application import create_app
import pytest, os

@pytest.fixture
def create_app():
    app = create_app("TEST")

    yield app

    # del os.environ("TEST_DB_URL")
    # del os.environ("SECRET_KEY")
