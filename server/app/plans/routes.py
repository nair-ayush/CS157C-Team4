from flask import request
from app.plans import bp
from datetime import datetime
from app.models.user import User
from app.models.listing import Listing
from app.models.activity import Activity
from app.models.plan import Plan, Activity as FActivity, Stay as FStay, User as FUser
from cassandra.cqlengine.models import _DoesNotExist

from app.models.plan import PlanChurn

from app.extensions import db


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


@bp.post('/update-views')
def update_views():
    body = request.get_json()
    try:
        Plan.get(id=body['id'])
        churn = PlanChurn.get(id=body['id'])
        churn.update(views=churn.views+1)
        return {"message": "Churn updated succesfully"}, 203
    except _DoesNotExist:
        return {"message": "No such plan"}, 400


@bp.get('/trending/<int:count>')
def get_trending_plans(count):
    viewsQueryset = [churn.json for churn in PlanChurn.all()]
    viewsQueryset.sort(key=lambda x: x['views'], reverse=True)
    viewsQueryset = viewsQueryset[:count]
    order = {item['id']: item['views'] for item in viewsQueryset}
    print(order)
    plans = Plan.filter(id__in=list(order.keys()))
    result = [plan.json for plan in plans]
    for idx in range(len(result)):
        result[idx]['views'] = order[result[idx]['id']]
    result.sort(key=lambda x: x['views'], reverse=True)
    return result, 200


@bp.post('/')
def add_plan():
    body = request.get_json()
    if all(key in body for key in ['createdBy', 'name']):
        try:
            queryset = User.get(id=body['createdBy']['id'])
            p = Plan(
                name=body['name'],
                created_by=FUser(id=body['createdBy']
                                 ['id'], name=body['createdBy']['name'])
            )
            if 'budget' in body:
                p.budget = body['budget']
            date_format = "%a, %d %b %Y %H:%M:%S %Z"
            if 'startDate' in body:
                p.start_date = datetime.strptime(
                    body['startDate'], date_format)
            if 'endDate' in body:
                p.end_date = datetime.strptime(body['endDate'], date_format)
            if 'stay' in body:
                try:
                    queryset = Listing.get(id=body['stay']['id'])
                    p.stay = FStay(id=body['stay']['id'],
                                   name=body['stay']['name'])
                except _DoesNotExist:
                    return {"message": "No such listings exists"}, 400
            if 'activities' in body and len(body['activities']):
                a = []
                for act in body['activities']:
                    try:
                        queryset = Activity.get(id=act['id'])
                        a.append(FActivity(id=act['id'], name=act['name']))
                    except _DoesNotExist:
                        return {"message": f"Activity with ID {act['id']} does not exist"}, 400
                p.activities = a
            p.save()
            PlanChurn.create(id=p.id)
            return p.json, 201
        except _DoesNotExist:
            return {"message": "No such user exists"}, 400


@bp.put('<uuid:plan_id>')
def update_plan(plan_id):
    try:
        queryset = Plan.get(id=plan_id)
        body = request.get_json()
        if all(key in body for key in ['name', 'budget', 'startDate', 'endDate', 'stay', 'activities']):
            queryset.update(name=body['name'])
            queryset.update(budget=body['budget'])
            date_format = "%a, %d %b %Y %H:%M:%S %Z"
            queryset.update(start_date=datetime.strptime(
                body['startDate'], date_format))
            queryset.update(end_date=datetime.strptime(
                body['endDate'], date_format))
            try:
                Listing.get(id=body['stay']['id'])
                queryset.update(stay=FStay(
                    id=body['stay']['id'], name=body['stay']['name']))
            except _DoesNotExist:
                return {"message": "No such listings exists"}, 400
            new_activities = []
            if len(body['activities']):
                for act in body['activities']:
                    try:
                        Activity.get(id=act['id'])
                        new_activities.append(
                            FActivity(id=act['id'], name=act['name']))
                    except _DoesNotExist:
                        return {"message": f"No activity with ID {act['id']} exists"}, 400
            else:
                new_activities = []
            queryset.update(activities=new_activities)
            return {"message": "Plan updated successfully", "id": plan_id}, 203
        else:
            return {"message": "Bad Request"}, 400
    except _DoesNotExist:
        return {"message": "No such plan exists"}, 400


@bp.delete('/<uuid:plan_id>')
def delete_plan(plan_id):
    try:
        Plan.delete(Plan.get(id=plan_id))
        PlanChurn.delete(PlanChurn.get(id=plan_id))
    except _DoesNotExist:
        return {"message": "Plan Does not Exist"}, 400
    return {"message": "Plan Deleted"}
