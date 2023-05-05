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

    __table_name__ = "listings"
    
    id = db.columns.UUID(primary_key=True, default=uuid4)
    name = db.columns.Text(required=True)
    location = db.columns.Text(required=True)
    price = db.columns.Float(required=True)
    host_id = db.columns.Text(required=True)
    host_name = db.columns.Text(required=True)
    amenities = db.columns.List(db.columns.Text)
    created_on = db.columns.DateTime(default=datetime.utcnow)
    created_by = db.columns.UserDefinedType(User, required=True)
    updated_on = db.columns.DateTime()

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

    def __repr__(self):
        return f'<Listing "{self.name} {self.id}">'

    def __self__(self):
        return f'<Listing "{self.name} {self.id}">'
