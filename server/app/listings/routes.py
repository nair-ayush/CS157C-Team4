from flask import request
from app.listings import bp
from app.models.listing import Listing
from cassandra.cqlengine.models import _DoesNotExist


@bp.get('/')
def get_all_listings():
    queryset = Listing.all()
    return [q.json for q in queryset]


@bp.get('/<int:listing_id>')
def get_listing(listing_id):
    try:
        queryset = Listing.get(id=listing_id)
    except _DoesNotExist:
        return {"message": "Listing Does Not Exist"}, 400
    return queryset.json


@bp.post('/')
def add_listing(body):
    body = request.get_json()

    if all(key in body for key in ['name', 'location', 'price']):
        l = Listing(name=body['name'],
                    location=body['location'], price=body['price'])
    if body['amenities'] and len(body['amenities']):
        l.amenities = body['amenities']
    l.save()
    return l.json, 201


@bp.delete('/<uuid:listing_id>')
def delete_listing(listing_id):
    try:
        Listing.delete(Listing.get(id=listing_id))
    except _DoesNotExist:
        return {"message": "Listing Does not Exist"}, 400
    return {"message": "Listing Deleted"}
