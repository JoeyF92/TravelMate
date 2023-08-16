from application import db
from application.models.models import PackingList
from application.controllers.packingListController import *
import pytest

def test_get_all_items(client):
    # Create some example packing lists for testing
    # packing_list1 = PackingList(items="item1, item2", user_id=1)
    # packing_list2 = PackingList(items="item3, item4", user_id=1)
    # db.session.add_all([packing_list1, packing_list2])
    # db.session.commit()

    response = client.get('/packing/1')
    assert response.status_code == 200

def test_create_packing_list(client):
    # Create a test JSON data for the request
    data = {
        'user_id': 1,
        'items': 'clothing',
        'item_status': False
    }

    # Send a POST request with the test data
    response = client.post('/packing/add', json=data)

    # Check the response status code and content
    assert response.status_code == 201
    assert 'Packing list created successfully' in response.json['message']

    # Check that the packing list was added to the database
    packing_list = PackingList.query.filter_by(user_id=1).first()
    assert packing_list is not None
    assert packing_list.items == 'clothing'
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
    # Create a test packing list item
    

    # Send a DELETE request to delete the packing list item
    response = client.delete(f'/packing/1')

    # Check the response status code and content
    assert response.status_code == 200
    assert 'Packing list deleted successfully' in response.json['message']

    # Check that the packing list item was deleted from the database
    deleted_packing_list = PackingList.query.get(packing_list.list_id)
    assert deleted_packing_list is None


