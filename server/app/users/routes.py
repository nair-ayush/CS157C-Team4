from app.models.user import User
from app.users import bp


@bp.get('/')
def get_all_users():
    queryset = User.all()
    return {"data": [q.json for q in queryset]}


@bp.get('/<int:user_id>')
def get_user(user_id):
    return {"message": f"This is the User GET endpoint for {user_id}"}


@bp.post('/')
def add_user(body):
    return {"message": "This is the User POST endpoint"}
