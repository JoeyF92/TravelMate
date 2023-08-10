from application import app, db
from flask import Blueprint
from application.controllers.userController import *

user_routes = Blueprint("user_routes", __name__)

@user_routes.route('/register', methods=['POST'])
def create_user_route():
    print("Reached the registration route")
    return register()

@user_routes.route('/<int:user_id>', methods=['GET'])
def get_user_route(user_id):
     user = get_user_by_id(user_id)
     return user
   

@user_routes.route('/users', methods=['GET'])
def get_all_users_route():
    users=get_all_users()
    return users

@user_routes.route('/<int:user_id>', methods=['PATCH'])
def update_user_route(user_id):
    return update_user(user_id)


@user_routes.route('/<string:username>', methods=['GET'])
def get_by_username_route(username):
    return get_by_username(username)

@user_routes.route('/login', methods=['POST'])
def login_route():
    return login()

@user_routes.route('/logout', methods=['POST'])
def logout_route():
    return logout()
