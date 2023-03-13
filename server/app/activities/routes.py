from app.activities import bp
from app.models.activity import Activity


@bp.get('/')
def get_all_activities():
    queryset = Activity.all()
    return {"data": [q.json for q in queryset]}


@bp.get('/<int:activity_id>')
def get_activities(activity_id):
    return {"message": f"This is the activities GET endpoint for {activity_id}"}


@bp.post('/')
def add_activities(body):
    return {"message": "This is the activities POST endpoint"}
