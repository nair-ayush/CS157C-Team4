from app.extensions import db
from uuid import uuid4


class Amenity(db.UserType):
    type = db.columns.Text()
    value = db.columns.Text()

    @property
    def json(self):
        return dict(self)

    def __repr__(self) -> str:
        return f"<Amenity {self.type}>"


class Activity(db.Model):
    id = db.columns.UUID(primary_key=True, default=uuid4)
    name = db.columns.Text(required=True)
    location = db.columns.Text(required=True)
    price = db.columns.Float()
    amenities = db.columns.List(db.columns.UserDefinedType(Amenity))

    @property
    def json(self):
        json_dict = dict(self)
        json_dict['amenities'] = [a.json for a in self.amenities]
        return json_dict

    def __repr__(self):
        return f'<Activity "{self.name} {self.id}">'

    def __self__(self):
        return f'<Activity "{self.name} {self.id}">'
