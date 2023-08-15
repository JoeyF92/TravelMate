from application import db, app
from application.models import PackingList
from flask import request, jsonify, render_template, redirect, url_for
import json

#POST create the whole list
def create_packing_list():
    data = request.json

    user_id = data.get('user_id')
    items = data.get('items')

    new_packing_list = PackingList( items=items, user_id=user_id)
    db.session.add(new_packing_list)
    db.session.commit()

    return jsonify({'message': 'Packing list created successfully'}), 201


#GET show all items on the list
def get_all_items(user_id):
    packing_list = PackingList.query.filter_by(user_id=user_id).all()
    print(packing_list)
    
    data = [d.__dict__ for d in packing_list]
    for item in data:
        item.pop("_sa_instance_state", None)
    return data, 200

    
# DELETE whole list by list_id
def delete_packing_list(list_id):
    packing_list = PackingList.query.get(list_id)
    if not packing_list:
        return jsonify({'message': 'Packing list not found'}), 404

    db.session.delete(packing_list)
    db.session.commit()

    return jsonify({'message': 'Packing list deleted successfully'}), 200
