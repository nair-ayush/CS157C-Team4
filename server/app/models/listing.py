from app.extensions import db
from uuid import uuid4


class Listing(db.Model):
    id = db.columns.UUID(primary_key=True, default=uuid4)
    name = db.columns.Text(required=True)
    location = db.columns.Text(required=True)
    price = db.columns.Float(required=True)
    amenities = db.columns.List(db.columns.Text)

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<Listing "{self.name} {self.id}">'

    def __self__(self):
        return f'<Listing "{self.name} {self.id}">'
