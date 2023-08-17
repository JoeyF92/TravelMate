from application import create_app, db
import pytest, os
from create_test_db import delete_database, create_database, add_entries


@pytest.fixture()
def client():
    app = create_app("TEST")
    delete_database()
    create_database()
    add_entries()

    with app.test_client() as client:
        yield client
    
    # with app.app_context():
    #      db.session.remove()
    #      db.drop_all()


