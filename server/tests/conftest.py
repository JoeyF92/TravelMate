from application import create_app, db
import pytest, os


@pytest.fixture()
def client():
    app = create_app("TEST")

    # with app.app_context():
    #         db.create_all()

    with app.test_client() as client:
        yield client
    
    # with app.app_context():
    #      db.session.remove()
    #      db.drop_all()


