from app.listings import bp
from app.models.listing import Listing


@bp.get('/')
def get_all_listings():
    queryset = Listing.all()
    return {"data": [q.json for q in queryset]}


@bp.get('/<int:listing_id>')
def get_listing(listing_id):
    return {"message": f"This is the Listing GET endpoint for {listing_id}"}


@bp.post('/')
def add_listing(body):
    return {"message": "This is the listing POST endpoint"}
