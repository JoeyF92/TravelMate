<<<<<<< HEAD
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
=======
from application import db
# from application.models import PackingList
from flask import request, jsonify, render_template, redirect, url_for, json

#POST create the whole list
def create_packing_list(destination, user_id):
    from application.models.models import PackingList
    new_packing_list = PackingList(destination=destination, items='[]', user_id=user_id)
>>>>>>> 9d1319545ae8de092541033a08da6f595081f037
    db.session.add(new_packing_list)
    db.session.commit()

    return jsonify({'message': 'Packing list created successfully'}), 201


#GET show all items on the list
<<<<<<< HEAD
def get_all_items(user_id):
    packing_list = PackingList.query.filter_by(user_id=user_id).all()
=======
def get_all_items(list_id):
    from application.models.models import PackingList
    packing_list = PackingList.query.get(list_id)
>>>>>>> 9d1319545ae8de092541033a08da6f595081f037
    print(packing_list)
    
    data = [d.__dict__ for d in packing_list]
    for item in data:
        item.pop("_sa_instance_state", None)
    return data, 200

<<<<<<< HEAD
    
# DELETE whole list by list_id
=======
#POST add just an item
def add_item(list_id, item):
    from application.models.models import PackingList
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
    from application.models.models import PackingList
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
    
#DELETE whole list
>>>>>>> 9d1319545ae8de092541033a08da6f595081f037
def delete_packing_list(list_id):
    from application.models.models import PackingList
    packing_list = PackingList.query.get(list_id)
    if not packing_list:
        return jsonify({'message': 'Packing list not found'}), 404

    db.session.delete(packing_list)
    db.session.commit()

    return jsonify({'message': 'Packing list deleted successfully'}), 200
