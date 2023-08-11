from application import db
from flask import Blueprint
from application.controllers.packingListController import *

packing_routes = Blueprint("packing_routes", __name__)


@packing_routes.route('/add', methods=['POST'])
def create_packing_route():
    return create_packing_list()


@packing_routes.route('/<int:list_id>', methods=['GET'])
def get_all_list_route(list_id):
    return get_all_items(list_id)

@packing_routes.route('/<int:list_id>/add', methods=['POST'])
def add_item_route(list_id):
    return add_item_packing(list_id)



@packing_routes.route('/packinglist/<int:list_id>/delete_item', methods=['DELETE'])
def delete_item_route():
    return delete_item(list_id)

@packing_routes.route('/packinglist/<int:list_id>', methods=['DELETE'])
def delete_all_list_route():
    return delete_packing_list(list_id)


