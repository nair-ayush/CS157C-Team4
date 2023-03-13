from app.auth import bp
from flask import request
from flask import session
from uuid import uuid4
from hashlib import sha256 as hash

from cassandra.cqlengine.models import _DoesNotExist
from app.models.user import User


@bp.post('/login')
def login():
    body = request.get_json()
    if body['username'] and body['password']:
        try:
            queryset: User = User.get(username=body['username'])
            if queryset.password != hash(body['password'].encode()).hexdigest():
                return {"message": "Invalid Credentials"}, 400
            token = uuid4()
            session[str(token)] = body['username']
            return {"token": token, **queryset.json}
        except _DoesNotExist:
            return {"message": "Invalid Credentials"}, 400


@bp.post('/register')
def register():
    body = request.get_json()
    if all(key in body for key in ['username', 'name', 'password']):
        u = User(username=body['username'], password=hash(
            body['password'].encode()).hexdigest(), name=body['name'])
        u.save()
        token = uuid4()
        session[str(token)] = body['username']
        return {"token": token, **u.json}, 201
    else:
        return {"message": "Bad Request"}, 400


@bp.get('/logout/<uuid:token>')
def logout(token):
    if token in session:
        session.pop(token)
    return {"message": "User logged out successfully"}
