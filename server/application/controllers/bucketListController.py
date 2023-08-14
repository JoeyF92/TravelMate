from application import db
# from application.models import BucketList
from flask import request, jsonify, render_template, redirect, url_for


#GET
def get_all_bucket_list_items():
    from application.models.models import BucketList
    items = BucketList.query.all()

    item_list = []
    for item in items:
        item_data = {
            'bucket_id': item.bucket_id,
            'destination': item.destination,
            'description': item.description,
            'user_id': item.user_id
        }
        item_list.append(item_data)

    return jsonify(item_list), 200

#POST
def add_bucket_item():
    from application.models.models import BucketList
    data = request.json

    new_item = BucketList(
        destination=data.get('destination'),
        description=data.get('description'),
        user_id=data.get('user_id')
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify({'message': 'Bucket list item added successfully'}), 201

#DELETE
def delete_bucket_list_item(bucket_id):
    from application.models.models import BucketList
    item = BucketList.query.get(bucket_id)

    if item is None:
        return jsonify({'message': 'Bucket list item not found'}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({'message': 'Bucket list item deleted successfully'}), 200
