from app.extensions import db
from datetime import datetime, date
from uuid import uuid4


class Stay(db.UserType):
    id = db.columns.UUID(required=True)
    name = db.columns.Text(required=True)

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<Plan Stay "{self.name} {self.id}">'

    def __self__(self):
        return f'<Plan Stay "{self.name} {self.id}">'


class Activity(db.UserType):
    id = db.columns.UUID(required=True)
    name = db.columns.Text(required=True)

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<Plan Activity "{self.name} {self.id}">'

    def __self__(self):
        return f'<Plan Activity "{self.name} {self.id}">'


class User(db.UserType):
    id = db.columns.UUID(required=True)
    name = db.columns.Text(required=True)

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<Plan Creator "{self.name} {self.id}">'

    def __self__(self):
        return f'<Plan Creator "{self.name} {self.id}">'


class Plan(db.Model):
    __table_name__ = "plans"

    id = db.columns.UUID(primary_key=True, default=uuid4)
    is_public = db.columns.Boolean(default=False)
    share_url = db.columns.Text()
    name = db.columns.Text()
    start_date = db.columns.DateTime()
    end_date = db.columns.DateTime()
    budget = db.columns.Integer()
    stay = db.columns.UserDefinedType(Stay)
    activities = db.columns.List(db.columns.UserDefinedType(Activity))
    created_by = db.columns.UserDefinedType(User, required=True)
    created_on = db.columns.DateTime(default=datetime.utcnow)
    updated_on = db.columns.DateTime(default=datetime.utcnow)

    @property
    def json(self):
        json_dict = dict(self)
        json_dict['activities'] = [a.json for a in self.activities]
        json_dict['stay'] = self.stay.json
        json_dict['createdBy'] = self.created_by.json
        del json_dict['created_by']
        json_dict['startDate'] = self.start_date
        del json_dict['start_date']
        json_dict['endDate'] = self.end_date
        del json_dict['end_date']
        json_dict['createdOn'] = self.created_on
        del json_dict['created_on']
        json_dict['updatedOn'] = self.updated_on
        del json_dict['updated_on']
        json_dict['isPublic'] = self.is_public
        json_dict['shareUrl'] = self.share_url
        del json_dict['is_public']
        del json_dict['share_url']
        return json_dict

    def __repr__(self):
        return f'<Plan "{self.id}">'

    def __self__(self):
        return f'<Plan "{self.id}">'


class PlanChurn(db.Model):
    __table_name__ = "plans_churn"
    id = db.columns.UUID(primary_key=True)
    views = db.columns.Counter()

    @property
    def json(self):
        return dict(self)

    def __repr__(self):
        return f'<PlanChurn "{self.id} {self.views}">'

    def __self__(self):
        return f'<PlanChurn "{self.id} {self.views}">'
