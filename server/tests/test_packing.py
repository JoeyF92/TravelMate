from application import db
from application.models.models import PackingList
from application.controllers.packingListController import *
import pytest

def test_get_all_items(client):

    response = client.get('/packing/1')
    assert response.status_code == 200

def test_create_packing_list(client):
    
    data = {
        'user_id': 1,
        'items': 'toiletries',
        'item_status': False
    }

    
    response = client.post('/packing/add', json=data)

    
    assert response.status_code == 201
    assert 'Packing list created successfully' in response.json['message']

    
    packing_list = PackingList.query.filter_by(user_id=1).first()
    assert packing_list is not None
    assert packing_list.items == 'toiletries'
    assert packing_list.item_status is False

# def test_delete_item(client):
#     # Create a new PackingList for testing
#     packing_list = PackingList(name='Test Packing List')
#     db.session.add(packing_list)
#     db.session.commit()

#     # Send a DELETE request to delete the PackingList
#     response = client.delete(f'/packing/1')
    
#     # Check the response
#     assert response.status_code == 200
#     assert response.json == {'message': 'Packing list deleted successfully'}

#     # Verify that the PackingList has been deleted from the database
#     deleted_packing_list = PackingList.query.get(packing_list.id)
#     assert deleted_packing_list is None

#     # Clean up - no need to delete the PackingList, as it's already deleted





def test_delete_item(client):
    
    response = client.delete(f'/packing/1')
    assert response.status_code == 404

