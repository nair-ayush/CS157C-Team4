from datetime import datetime
from app.extensions import db
from uuid import uuid4


class User(db.UserType):
    id = db.columns.UUID(required=True)
    name = db.columns.Text(required=True)

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<Listing Creator "{self.name} {self.id}">'

    def __self__(self):
        return f'<Listing Creator "{self.name} {self.id}">'


class Listing(db.Model):
    id = db.columns.UUID(primary_key=True, default=uuid4)
    name = db.columns.Text(required=True)
    location = db.columns.Text(required=True)
    price = db.columns.Float(required=True)
    amenities = db.columns.List(db.columns.Text)
    created_on = db.columns.DateTime(default=datetime.utcnow)
    created_by = db.columns.UserDefinedType(User, required=True)
    updated_on = db.columns.DateTime()

    @property
    def json(self):
        json_dict = dict(self)
        json_dict['createdBy'] = self.createdBy.json
        return json_dict

    def __repr__(self):
        return f'<Listing "{self.name} {self.id}">'

    def __self__(self):
        return f'<Listing "{self.name} {self.id}">'
