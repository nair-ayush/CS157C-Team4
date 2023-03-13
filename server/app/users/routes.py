from flask import request
from app.models.user import User
from app.users import bp

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


@bp.delete('/<uuid:user_id>')
def delete_user(user_id):
    try:
        User.delete(User.get(id=user_id))
    except _DoesNotExist:
        return {"message": "User Does not Exist"}, 400
    return {"message": "User Deleted"}
