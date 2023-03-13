from flask import request
from app.activities import bp
from app.models.activity import Activity, Amenity
from cassandra.cqlengine.models import _DoesNotExist


@bp.get('/')
def get_all_activities():
    queryset = Activity.all()
    return [q.json for q in queryset]


@bp.get('/<int:activity_id>')
def get_activities(activity_id):
    try:
        queryset = Activity.get(id=activity_id)
    except _DoesNotExist:
        return {"message": "Activity Does Not Exist"}, 400
    return queryset.json


@bp.post('/')
def add_activities():
    body = request.get_json()
    if all(key in body for key in ['name', 'location']):
        a = Activity(name=body['name'], location=body['location'])
    if body['price']:
        a.price = body['price']
    if body['amenities'] and len(body['amenities']):
        a.amenities = [Amenity(type=a['type'], value=a['value'])
                       for a in body['amenities']]
    a.save()
    return a.json, 201


@bp.delete('/<uuid:activity_id>')
def delete_activity(activity_id):
    try:
        Activity.delete(Activity.get(id=activity_id))
    except _DoesNotExist:
        return {"message": "Activity Does not Exist"}, 400
    return {"message": "Activity Deleted"}