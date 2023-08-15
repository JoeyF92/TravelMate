import json
import pytest
from application import create_app, db
from application.models.models import BucketList
from application.controllers.bucketListController import add_bucket_item, delete_bucket_list_item

def app():
    app = create_app(env='TEST')
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()
        
def test_add_bucket_item(app):
    client = app.test_client()
    data = {
        'destination': 'New Destination',
        'description': 'New Description',
        'user_id': 1
    }
    response = client.post('/bucket-list', json=data)
    assert response.status_code == 201
    assert 'message' in response.json
    assert response.json['message'] == 'Bucket list item added successfully'

def test_delete_bucket_list_item(app):
    with app.app_context():
        item = BucketList(destination='Test Destination', description='Test Description', user_id=1)
        db.session.add(item)
        db.session.commit()

        client = app.test_client()
        response = client.delete(f'/bucket-list/{item.bucket_id}')
        assert response.status_code == 200
        assert 'message' in response.json
        assert response.json['message'] == 'Bucket list item deleted successfully'
        assert BucketList.query.get(item.bucket_id) is None
