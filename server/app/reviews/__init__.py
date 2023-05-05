from flask import Blueprint

bp = Blueprint('reviews', __name__)

from app.users import routes  # nopep8
