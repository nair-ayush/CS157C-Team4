from app.extensions import db
from uuid import uuid4


class User(db.Model):
    id = db.columns.UUID(primary_key=True, default=uuid4)
    username = db.columns.Text(required=True)
    name = db.columns.Text(required=True)
    password = db.columns.Text(min_length=6, required=True)

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<User "{self.name} {self.id}">'

    def __self__(self):
        return f'<User "{self.name} {self.id}">'
