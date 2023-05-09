from flask import request
from app.reviews import bp
from app.models.listing import Listing, User, Plan, Reviews
from cassandra.cqlengine.models import _DoesNotExist

# GET a single review by ID
@bp.get('/<int:id>')
def get_review(review_id):
    try:
        review = Review.get(id=review_id)
    except _DoesNotExist:
        return {"message": "Review Does Not Exist"}, 400
    return review.json

# GET all reviews for a particular plan
@bp.get('/plan/<int:plan_id>')
def get_reviews_for_plan(plan_id):
    reviews = Review.get(plan_id=plan_id)
    return reviews.json

# POST a new review
@bp.post('/')
def add_review():
    user_id = request.json['user_id']
    plan_id = request.json['plan_id']
    rating = request.json['rating']
    comment = request.json['comment']

    body = request.get_json()

    if all(key in body for key in ['user_id', 'plan_id', 'rating', 'comment']):
        r = Listing(user_id=body['user_id'],
                    plan_id=body['plan_id'], rating=body['rating'], created_by=User(id=body['createdBy']["id"], name=body['createdBy']["name"]))
        
    r.save()
    return r.json, 201