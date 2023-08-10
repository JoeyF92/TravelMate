from application import db, app, bcrypt
from application.models import User, Token
from flask import request, jsonify, render_template, redirect, url_for
import os 
import jwt
from uuid import uuid4

#  @app.route("/register", methods=["POST"])
def register():
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
        password= hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':'User registered successfully!'}), 201

def get_all_users():
    users = User.query.all()

    user_list = []
    for user in users:
        user_data = {
            'user_id': user.user_id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'username': user.username
        }
        user_list.append(user_data)

    return jsonify(user_list), 200

# @app.route('/user/<user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    user_data = {
        'user_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'username': user.username
    }

    return jsonify(user_data), 200

# @app.route('/user/<user_id>', methods =['PATCH'])
def update_user(user_id):
    user= User.query.filter_by(user_id=user_id)
    data = request.json
    user.update(dict(first_name=data['first_name'],last_name= data['last_name'], email= data['email'], username= data['username'],password= data['password']))
    db.session.commit()
    updatedUser= user.first()
    return jsonify({'message':'User updated!'})

def get_by_username(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    user_data = {
        'user_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'username': user.username,
        'password':user.password
    }

    return jsonify(user_data), 200

def login():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    check_password =bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))
    print(check_password)

    if not user or not check_password:
        return jsonify({'message': 'Invalid username or password'}), 401 
    new_token = create_token(user.user_id)
    
    # token_payload = {'user_id': user.user_id}
    # secret_key = os.environ["SECRET_KEY"]
    # token = jwt.encode(token_payload, secret_key, algorithm='HS256')
    # # Store the token in the database
    # new_token = Token(token=token, user_id=user.user_id)
    # db.session.add(new_token)
    # db.session.commit()
    return jsonify({'message': 'Login successful', 'token': new_token.token, 'user_id': user.user_id, 'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name}), 200


def create_token(id):
    token = uuid4()
    if not id or not token:
        return jsonify({'message': 'Missing parameters'})
    newToken = Token(user_id=id, token=token)
    db.session.add(newToken)
    db.session.commit()
    return newToken

# def logout():
#     data = request.json
#     token = data.get('token')

#     if not token:
#         return jsonify({'message': 'Token missing in request'}), 400

#     token_record = Token.query.filter_by(token=token).first()

#     if not token_record:
#         return jsonify({'message': 'Token not found'}), 404

#     db.session.delete(token_record)
#     db.session.commit()

def logout():
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




    


    
    

