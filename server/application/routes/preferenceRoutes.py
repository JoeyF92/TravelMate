from application import db
from flask import Blueprint
from application.controllers.preferenceController import *

preference_routes = Blueprint("preference_routes", __name__)

#Create preference
@preference_routes.route("/create/<int:user_id>", methods=["POST"])
def create_preference_route(user_id):
    return create_preference(user_id)

#Get preference by user id
@preference_routes.route("/user/<int:user_id>", methods=['GET'])
def get_preference_by_user_id(user_id):
    return index_preference_by_user_id(user_id)

#Update preference by id
@preference_routes.route("/update/<int:preference_id>", methods=['PATCH'])
def update_preference_by_id(preference_id):
    return update_preference(preference_id)

#Delete a preference by id
@preference_routes.route("/<int:preference_id>", methods=['DELETE'])
def destroy_preference_by_id(preference_id):
    return destroy_preference(preference_id)
