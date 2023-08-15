from application import db
# from application.models import PackingList
from flask import request, jsonify, render_template, redirect, url_for
import json

#POST create the whole list
def create_packing_list():
    from application.models.models import PackingList
    data = request.json

    user_id = data.get('user_id')
    items = data.get('items')
    item_status = data.get('item_status')

    new_packing_list = PackingList( items=items, item_status=item_status, user_id=user_id)
    db.session.add(new_packing_list)
    db.session.commit()

    return jsonify({'message': 'Packing list created successfully'}), 201


#GET show all items on the list
def get_all_items(user_id):
    from application.models.models import PackingList
    packing_list = PackingList.query.filter_by(user_id=user_id).all()
# def get_all_items(list_id):
#     from application.models.models import PackingList
    data = [d.__dict__ for d in packing_list]
    for item in data:
        item.pop("_sa_instance_state", None)
    return data, 200

def update_packing(list_id):
    from application.models.models import PackingList
    data = request.json
    new_items = data.get('items')
    new_item_status = data.get('item_status')

    packing_list = PackingList.query.get(list_id)
    if not packing_list:
        return jsonify({'message': 'Packing list not found'}), 404

    if new_items is not None:
        packing_list.items = new_items
    if new_item_status is not None:
        packing_list.item_status = new_item_status

    db.session.commit()

    return jsonify({'message': 'Packing list updated successfully'}), 200

    
# DELETE item by list_id
def delete_item(list_id):
    from application.models.models import PackingList
    packing_list = PackingList.query.get(list_id)
    if not packing_list:
        return jsonify({'message': 'Packing list not found'}), 404

    db.session.delete(packing_list)
    db.session.commit()

    return jsonify({'message': 'Packing list deleted successfully'}), 200
