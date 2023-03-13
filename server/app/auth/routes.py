from app.auth import bp
from flask import request
from flask import session
from uuid import uuid4


@bp.post('/login')
def login():
    body = request.get_json()
    # TODO auth validation
    # TODO check credentials in db
    token = uuid4()
    session[str(token)] = body['username']
    return {"token": token}


@bp.post('/register')
def register():
    body = request.get_json()
    # TODO auth validation
    # TODO add credentials in db
    token = uuid4()
    session[str(token)] = body['username']
    return {"token": token}


@bp.get('/logout/<uuid:token>')
def logout(token):
    if token in session:
        session.pop(token)
    return {"message": "User logged out successfully"}
