from flask import request
from datetime import datetime
from app.activities import bp
from app.models.activity import Activity, User as FUser
from app.models.user import User
from cassandra.cqlengine.models import _DoesNotExist

from app.models.activity import ActivityChurn


@bp.get('/')
def get_all_activities():
    queryset = Activity.all()
    return [q.json for q in queryset]


@bp.get('/<uuid:activity_id>')
def get_activities(activity_id):
    try:
        queryset = Activity.get(id=activity_id)
    except _DoesNotExist:
        return {"message": "Activity Does Not Exist"}, 400
    return queryset.json


@bp.post('/update-views')
def update_views():
    body = request.get_json()
    try:
        Activity.get(id=body['id'])
        churn = ActivityChurn.get(id=body['id'])
        churn.update(views=churn.views+1)
        return {"message": "Churn updated succesfully"}, 203
    except _DoesNotExist:
        return {"message": "No such activity"}, 400


@bp.get('/trending/<int:count>')
def get_trending_activities(count):
    viewsQueryset = [churn.json for churn in ActivityChurn.all()]
    viewsQueryset.sort(key=lambda x: x['views'], reverse=True)
    viewsQueryset = viewsQueryset[:count]
    order = {item['id']: item['views'] for item in viewsQueryset}
    print(order)
    activities = Activity.filter(id__in=list(order.keys()))
    result = [activity.json for activity in activities]
    for idx in range(len(result)):
        result[idx]['views'] = order[result[idx]['id']]
    result.sort(key=lambda x: x['views'], reverse=True)
    return result, 200


@bp.post('/')
def add_activities():
    body = request.get_json()
    if all(key in body for key in ['name', 'location', "createdBy", "price"]):
        try:
            queryset = User.get(id=body['createdBy']['id'])
            a = Activity(
                name=body['name'],
                location=body['location'],
                created_by=FUser(id=body['createdBy']["id"],
                                 name=body['createdBy']["name"]),
                price=body['price']
            )
            if 'metadata' in body and len(body['metadata']):
                a.metadata = body['metadata']
            a.save()
            ActivityChurn.create(id=a.id)
            return a.json, 201
        except _DoesNotExist:
            return {"message": "No such user exists"}, 400
    else:
        return {"message": "Bad request"}, 400


@bp.put('/<uuid:activity_id>')
def update_activity(activity_id):
    try:
        queryset = Activity.get(id=activity_id)
        body = request.get_json()
        if all(key in body for key in ['name', 'location', 'price']):
            queryset.update(price=body['price'])
            queryset.update(name=body['name'])
            queryset.update(location=body['location'])
            queryset.update(updated_on=datetime.now())
        else:
            return {"message": "Bad request"}, 400
        if 'metadata' in body:
            queryset.update(metadata=body['metadata'])
        return {"message": "Activity updated successfully", "id": activity_id}, 203
    except _DoesNotExist:
        return {"message": "Activitiy does not exist"}, 400


@bp.delete('/<uuid:activity_id>')
def delete_activity(activity_id):
    try:
        Activity.delete(Activity.get(id=activity_id))
        ActivityChurn.delete(ActivityChurn.get(id=activity_id))
    except _DoesNotExist:
        return {"message": "Activity Does not Exist"}, 400
    return {"message": "Activity Deleted"}
