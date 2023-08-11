from application import db, app
from application.models import PackingList
from flask import request, jsonify, render_template, redirect, url_for, json

#POST create the whole list
def create_packing_list(destination, user_id):
    new_packing_list = PackingList(destination=destination, items='[]', user_id=user_id)
    db.session.add(new_packing_list)
    db.session.commit()
    return jsonify({'message': 'Packing list created successfully'}), 201


#GET show all items on the list
def get_all_items(list_id):
    packing_list = PackingList.query.get(list_id)
    print(packing_list)
    if not packing_list:
        return jsonify({'message': 'Packing list not found'}), 404
    
    items_list = json.loads(packing_list.items)
    return jsonify({
        'destination': packing_list.destination,
        'items': items_list
    }), 200

#POST add just an item
def add_item(list_id, item):
    packing_list = PackingList.query.get(list_id)
    if not packing_list:
        return jsonify({'message': 'Packing list not found'}), 404

    items_list = json.loads(packing_list.items)
    items_list.append(item)
    packing_list.items = json.dumps(items_list)
    
    db.session.commit()
    return jsonify({'message': 'Item added to packing list successfully'}), 200




#DELETE indiviual items on list
def delete_item(list_id):
    data = request.json
    item = data.get('item')
    
    packing_list = PackingList.query.get(list_id)
    if not packing_list:
        return jsonify({'message': 'Packing list not found'}), 404
    
    if item in packing_list.items:
        packing_list.items.remove(item)
        db.session.commit()
        return jsonify({'message': 'Item deleted from packing list successfully'}), 200
    else:
        return jsonify({'message': 'Item not found in packing list'}), 404
    
#DELETE whoe list
def delete_packing_list(list_id):
    packing_list = PackingList.query.get(list_id)
    if not packing_list:
        return jsonify({'message': 'Packing list not found'}), 404
    
    db.session.delete(packing_list)
    db.session.commit()
    
    return jsonify({'message': 'Packing list deleted successfully'}), 200

