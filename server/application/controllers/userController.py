from application import db, bcrypt
# from application.models import User, Token
from flask import request, jsonify, render_template, redirect, url_for
import os 
import jwt
from uuid import uuid4

#  @app.route("/register", methods=["POST"])
def register():
    from application.models.models import User
    #  return "<p>Hi!<p>"

    data = request.json
    password = data.get('password').encode('utf-8')
    salt = bcrypt.gensalt(rounds=10)
    hashed_password = bcrypt.hashpw(password, salt).decode('utf-8')
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        username=data['username'],
        password= hashed_password,
        profile_pic=""
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':'User registered successfully!'}), 201

def get_all_users():
    from application.models.models import User
    users = User.query.all()

    user_list = []
    for user in users:
        user_data = {
            'user_id': user.user_id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'username': user.username,
            'profile_pic': user.profile_pic
        }
        user_list.append(user_data)

    return jsonify(user_list), 200

# @app.route('/user/<user_id>', methods=['GET'])
def get_user_by_id(user_id):
    from application.models.models import User
    user = User.query.get(user_id)

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    user_data = {
        'user_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'username': user.username,
        'profile_pic': user.profile_pic
    }

    return jsonify(user_data), 200

# @app.route('/user/<user_id>', methods =['PATCH'])
def update_user(user_id):
    from application.models.models import User
    data = request.get_json()
    user = db.session.get(User, id)

    if 'first_name' in data:
        user.title = data['first_name']
    if 'last_name' in data:
        user.location = data['last_name']
    if 'email' in data:
        user.description = data['email']
    if 'username' in data:
        user.members = data['username']
    if 'password' in data:
        user.start_date = data['password']
    if 'profile_pic' in data:
        user.end_date = data['profile_pic']
    
    # db.session.commit()
    # db.session.close()
    # from application.models.models import User
    # user= User.query.filter_by(user_id=user_id)
    # data = request.json
    # user.update(dict(first_name=data['first_name'],last_name= data['last_name'], email= data['email'], username= data['username'],password= data['password']))
    # db.session.commit()
    # updatedUser= user.first()
    return jsonify({'message':'User updated!'}), 200

def get_by_username(username):
    from application.models.models import User
    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    user_data = {
        'user_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'username': user.username,
        'password':user.password,
        'profile_pic': user.profile_pic
    }

    return jsonify(user_data), 200

def login():
    from application.models.models import User
    data = request.json

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    check_password =bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))
    print(check_password)

    if not user or not check_password:
        return jsonify({'message': 'Invalid username or password'}), 401 
    new_token = create_token(user.user_id)
    
    return jsonify({'message': 'Login successful', 'token': new_token.token, 'user_id': user.user_id, 'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name}), 200


def create_token(id):
    from application.models.models import Token
    token = uuid4()
    if not id or not token:
        return jsonify({'message': 'Missing parameters'})
    newToken = Token(user_id=id, token=token)
    db.session.add(newToken)
    db.session.commit()
    return newToken


def logout():
    from application.models.models import Token
    data = request.json
    token_value = data.get('token')

    token = Token.query.filter_by(token=token_value).first()

    if token:
        db.session.delete(token)
        db.session.commit()

        token_data = token.__dict__.copy()
        token_data.pop('_sa_instance_state', None)

        return jsonify(token_data), 200
    else:
        return jsonify({'message': 'Token not found'}), 404


def index_content_by_user(user_id):
    from application.models.models import Content
    from .albumController import index_album
    from .contentController import index_content_by_album

    albums, status_code = index_album()
    members_list = []
    album_list = []
    content_list = []
    filtered_content_list = []

    for album in albums:
        members = album["members"].split(',')
        if str(user_id) in members:
            album_list.extend(str(album["album_id"]))
        
    for id in album_list:
        contents, status_code = index_content_by_album(id)
        content_list.extend(contents)

    for content in content_list:
        if content["photo"] != "":
            filtered_content_list.append(content)

    return filtered_content_list

