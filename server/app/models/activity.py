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
        return f'<Activity Creator "{self.name} {self.id}">'

    def __self__(self):
        return f'<Activity Creator "{self.name} {self.id}">'


class Amenity(db.UserType):
    type = db.columns.Text()
    value = db.columns.Text()

    @property
    def json(self):
        return dict(self)

    def __repr__(self) -> str:
        return f"<Amenity {self.type}>"


class Activity(db.Model):

    __table_name__ = "activities"

    id = db.columns.UUID(primary_key=True, default=uuid4)
    name = db.columns.Text(required=True)
    location = db.columns.Text(required=True)
    price = db.columns.Float()
    # Eg., amusement park, restaurant, italian, wifi available
    metadata = db.columns.List(db.columns.Text())
    created_on = db.columns.DateTime(default=datetime.utcnow)
    created_by = db.columns.UserDefinedType(User, required=True)
    updated_on = db.columns.DateTime()

    @property
    def json(self):
        json_dict = dict(self)
        # json_dict['amenities'] = [a.json for a in self.amenities]
        json_dict['createdBy'] = self.created_by.json
        del json_dict['created_by']
        json_dict['createdOn'] = self.created_on
        del json_dict['created_on']
        json_dict['updatedOn'] = self.updated_on
        del json_dict['updated_on']
        return json_dict

    def __repr__(self):
        return f'<Activity "{self.name} {self.id}">'

    def __self__(self):
        return f'<Activity "{self.name} {self.id}">'


class ActivityChurn(db.Model):
    __table_name__ = "activities_churn"
    id = db.columns.UUID(primary_key=True)
    views = db.columns.Counter()

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<ActivityChurn "{self.id} {self.views}">'

    def __self__(self):
        return f'<ActivityChurn "{self.id} {self.views}">'
