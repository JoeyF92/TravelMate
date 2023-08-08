from application import db, app
from application.models import User
from flask import request, jsonify, render_template, redirect, url_for

 @app.route("/register", methods=["POST"])
def users():
    data = request.json
    new_user= User(data['first_name'], data['last_name'], data['email'], data['username'], data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':'User registered successfully!'}), 201

@app.route('/user/<user_id>', methods=['GET'])
def get_user(user_id)
    user = User.query.filter_by(user_id=user_id).first()
    return jsonify(user)

@app.route('/user/<user_id>', methods =['PATCH'])
def update_user(user_id)
    user= User.query.filter_by(user_id=user_id)
    data = request.json
    user.update(dict(first_namename=data['first_name'],last_name= data['last_name'], email= data['email'], username= data['username'],password= data['password']))
    db.session.commit()
    updatedUser= user.first()
    return jsonify({'message':'User updated!'})


    


    
    

