from flask import request
from app.plans import bp
from datetime import datetime
from app.models.plan import Plan, Activity, Stay, User
from cassandra.cqlengine.models import _DoesNotExist


@bp.get('/')
def get_all_plans():
    queryset = Plan.all()
    return [q.json for q in queryset]


@bp.get('/<uuid:plan_id>')
def get_plan(plan_id):
    try:
        queryset = Plan.get(id=plan_id)
    except _DoesNotExist:
        return {"message": "Plan Does Not Exist"}, 400
    return queryset.json


@bp.post('/')
def add_plan():
    body = request.get_json()
    # TODO
    if 'createdBy' in body:
        p = Plan(created_by=User(
            id=body['createdBy']["id"], name=body['createdBy']["name"]))
    if body['startDate']:
        p.start_date = datetime.strptime(
            body['startDate'], '%Y-%m-%d %H:%M:%S')
    if body['endDate']:
        p.end_date = datetime.strptime(body['endDate'], '%Y-%m-%d %H:%M:%S')
    if body['location']:
        p.location = body['location']
    if body['budget']:
        p.budget = int(body['budget'])
    if body['stay']:
        p.stay = Stay(id=body['stay']["id"], name=body['stay']["name"])
    if body['activities'] and len(body['activities']):
        p.activities = []
        for act in body['activities']:
            p.activities.append(Activity(id=act["id"], name=act["name"]))
    p.save()
    return p.json, 201


@bp.delete('/<uuid:plan_id>')
def delete_plan(plan_id):
    try:
        Plan.delete(Plan.get(id=plan_id))
    except _DoesNotExist:
        return {"message": "Plan Does not Exist"}, 400
    return {"message": "Plan Deleted"}
