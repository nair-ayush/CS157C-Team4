from app.extensions import db
from datetime import datetime
from uuid import uuid4

class User(db.UserType):
    id = db.columns.UUID(required=True)
    name = db.columns.Text(required=True)

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<Review Creator "{self.name} {self.id}">'

    def __self__(self):
        return f'<Review Creator "{self.name} {self.id}">'

class Plan(db.UserType):
    id = db.columns.UUID(required=True)
    name = db.columns.Text(required=True)

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<Plan "{self.name} {self.id}">'

    def __self__(self):
        return f'<Plan "{self.name} {self.id}">'

class Review(db.Model):

    __tablename__ = 'reviews'

    review_id = db.columns.UUID(primary_key=True, default=uuid4)
    user_id = db.columns.UserDefinedType(User, required=True)
    plan_id = db.columns.UserDefinedType(Plan, required=True)
    rating = db.columns(db.Integer)
    comment = db.columns(db.String(255))

    user = db.relationship('users', backref='reviews')
    plan = db.relationship('plans', backref='reviews')

    def __repr__(self):
        return f"<Review(review_id='{self.review_id}', rating='{self.rating}', comment='{self.comment}')>"

    @property
    def json(self):
        json_dict = dict(self)
        json_dict['createdBy'] = self.created_by.json
        del json_dict['created_by']
        json_dict['updatedBy'] = self.updated_by.json if self.updated_by else None
        del json_dict['updated_by']
        json_dict['createdOn'] = self.created_on
        del json_dict['created_on']
        json_dict['updatedOn'] = self.updated_on
        del json_dict['updated_on']
        return json_dict