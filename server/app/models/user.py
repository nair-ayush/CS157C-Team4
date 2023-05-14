from datetime import datetime
from app.extensions import db
from uuid import uuid4


class User(db.Model):

    __table_name__ = "users"

    id = db.columns.UUID(primary_key=True, default=uuid4)
    username = db.columns.Text(primary_key=True, index=True)
    name = db.columns.Text(required=True)
    password = db.columns.Text(min_length=6, required=True)
    type = db.columns.Text(default='NORMAL')
    created_on = db.columns.DateTime(default=datetime.utcnow)
    updated_on = db.columns.DateTime()

    @property
    def json(self):
        json_dict = dict(self)
        del json_dict['password']
        json_dict['createdOn'] = self.created_on
        del json_dict['created_on']
        json_dict['updatedOn'] = self.updated_on
        del json_dict['updated_on']
        return json_dict

    def __repr__(self):
        return f'<User "{self.name} {self.id}">'

    def __self__(self):
        return f'<User "{self.name} {self.id}">'
