from application import app, db
from flask import Blueprint
from application.controllers.bucketListController import *

bucket_routes = Blueprint("bucket_routes", __name__)

@bucket_routes.route('/items', methods=['GET'])
def get_all_items_route():
    return get_all_bucket_list_items()

@bucket_routes.route('/add', methods=['POST'])
def add_item_route():
    return add_bucket_item()

@bucket_routes.route('/delete/<int:bucket_id>', methods=['DELETE'])
def delete_item_route(bucket_id):
    return delete_bucket_list_item(bucket_id)

