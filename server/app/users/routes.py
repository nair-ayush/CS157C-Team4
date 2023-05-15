from flask import request
from datetime import datetime
from app.models.user import User
from app.users import bp
from hashlib import sha256 as hash

from cassandra.cqlengine.models import _DoesNotExist


@bp.get('/')
def get_all_users():
    queryset = User.all()
    return [q.json for q in queryset]


@bp.get('/<uuid:user_id>')
def get_user(user_id):
    try:
        queryset = User.get(id=user_id)
    except _DoesNotExist:
        return {"message": "User Does not Exist"}, 400
    return queryset.json


@bp.put('/<uuid:user_id>')
def update_user(user_id):
    try:
        queryset = User.get(id=user_id)
        body = request.get_json()
        if all(key in body for key in ['name', 'password']):
            queryset.update(name=body['name'])
            queryset.update(password=hash(
                body['password'].encode()).hexdigest()
            )
            queryset.update(updated_on=datetime.now())
            return {"message": "User updated successfully", "id": user_id}, 203
        else:
            return {"message": "Bad Request"}, 400
    except _DoesNotExist:
        return {"message": "User does not exist"}, 400


@bp.delete('/<uuid:user_id>')
def delete_user(user_id):
    try:
        User.delete(User.get(id=user_id))
    except _DoesNotExist:
        return {"message": "User Does not Exist"}, 400
    return {"message": "User Deleted"}
