from flask import request
from uuid import uuid4
from datetime import datetime
from app.listings import bp
from app.models.listing import Listing, User as FUser
from app.models.user import User
from cassandra.cqlengine.models import _DoesNotExist

from app.models.listing import ListingChurn


@bp.get('/')
def get_all_listings():
    queryset = Listing.all()
    return [q.json for q in queryset]


@bp.post('/update-views')
def update_views():
    body = request.get_json()
    try:
        Listing.get(id=body['id'])
        churn = ListingChurn.get(id=body['id'])
        churn.update(views=churn.views+1)
        return {"message": "Churn updated succesfully"}, 203
    except _DoesNotExist:
        return {"message": "No such listing"}, 400


@bp.get('/trending/<int:count>')
def get_trending_listings(count):
    viewsQueryset = [churn.json for churn in ListingChurn.all()]
    viewsQueryset.sort(key=lambda x: x['views'], reverse=True)
    viewsQueryset = viewsQueryset[:count]
    order = {item['id']: item['views'] for item in viewsQueryset}
    print(order)
    listings = Listing.filter(id__in=list(order.keys()))
    result = [listing.json for listing in listings]
    for idx in range(len(result)):
        result[idx]['views'] = order[result[idx]['id']]
    result.sort(key=lambda x: x['views'], reverse=True)
    return result, 200


@bp.get('/<uuid:listing_id>')
def get_listing(listing_id):
    try:
        queryset = Listing.get(id=listing_id)
    except _DoesNotExist:
        return {"message": "Listing Does Not Exist"}, 400
    return queryset.json


@bp.post('/')
def add_listing():
    body = request.get_json()
    if all(key in body for key in ['name', 'location', "createdBy", "price", "hostName"]):
        try:
            queryset = User.get(id=body['createdBy']['id'])
            l = Listing(
                name=body['name'],
                location=body['location'],
                host_name=body["hostName"],
                host_id=str(uuid4()),
                created_by=FUser(id=body['createdBy']["id"],
                                 name=body['createdBy']["name"]),
                price=body['price']
            )
            if 'amenities' in body and len(body['amenities']):
                l.amenities = body['amenities']
            l.save()
            ListingChurn.create(id=l.id)
            return l.json, 201
        except _DoesNotExist:
            return {"message": "No such user exists"}, 400
    else:
        return {"message": "Bad request"}, 400


@bp.put('/<uuid:listing_id>')
def update_listings(listing_id):
    try:
        queryset = Listing.get(id=listing_id)
        body = request.get_json()
        if all(key in body for key in ['name', 'location', 'price', 'hostName']):
            queryset.update(price=body['price'])
            queryset.update(name=body['name'])
            queryset.update(location=body['location'])
            queryset.update(updated_on=datetime.now())
            queryset.update(host_name=body['hostName'])
            queryset.update(host_id=str(uuid4()))
        else:
            return {"message": "Bad request"}, 400
        if 'amenities' in body:
            queryset.update(amenities=body['amenities'])
        return {"message": "Listing updated successfully", "id": listing_id}, 203
    except _DoesNotExist:
        return {"message": "Listing does not exist"}, 400


@bp.delete('/<uuid:listing_id>')
def delete_listing(listing_id):
    try:
        Listing.delete(Listing.get(id=listing_id))
        ListingChurn.delete(ListingChurn.get(id=listing_id))
    except _DoesNotExist:
        return {"message": "Listing Does not Exist"}, 400
    return {"message": "Listing Deleted"}
