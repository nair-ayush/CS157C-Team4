from app import create_app
from app.extensions import db
from app.models.listing import Listing, User as FUser, ListingChurn
from app.models.activity import Activity, ActivityChurn
from app.models.plan import Plan, Stay as FStay, Activity as FActivity, PlanChurn
from app.models.user import User
from config import Config
from hashlib import sha256 as hash
from datetime import datetime, timedelta, date
from random import randint, choice, sample
import pandas as pd


def get_random_element(my_list):
    if not my_list:
        return None
    return choice(my_list)


def insert_dummy_data():
    flaskapp = create_app(config_class=Config)

    with flaskapp.app_context():

        # Users
        userAyush = User(name='Ayush Nair',
                         username='ayush@gmail.com', password=hash('123456'.encode()).hexdigest(), type='ADMIN')
        userChinmayi = User(name='Chinmayi Hegde',
                            username='chinmayi@gmail.com', password=hash('123456'.encode()).hexdigest(), type='ADMIN')
        userKhue = User(name='Khue Nguyen',
                        username='khue@gmail.com', password=hash('123456'.encode()).hexdigest(), type='ADMIN')
        userRakshit = User(name='Rakshit Gupta',
                           username='rakshit@gmail.com', password=hash('123456'.encode()).hexdigest(), type='NORMAL')
        userAyush.save()
        userChinmayi.save()
        userKhue.save()
        userRakshit.save()
        print("Ayush", userAyush.id)
        print("Chinmayi", userChinmayi.id)
        print("Khue", userKhue.id)
        print("Rakshit", userRakshit.id)
        print("Users added")

        fUserAyush = FUser(id=userAyush.id, name=userAyush.name)
        fUserChinmayi = FUser(id=userChinmayi.id, name=userChinmayi.name)
        fUserKhue = FUser(id=userKhue.id, name=userKhue.name)
        fUserRakshit = FUser(id=userRakshit.id, name=userRakshit.name)

        admins = [fUserAyush, fUserChinmayi, fUserKhue]

        # Activities
        eateriesDf = pd.read_json('data/eateries.json')
        for idx, row in eateriesDf.iterrows():
            a = Activity(
                name=row['name'],
                location="|".join(
                    [row['city'], str(row['latitude']), str(row['longitude'])]),
                price=float(randint(40, 350)),
                metadata=row['categories'].split(','),
                created_by=get_random_element(admins),
                created_on=datetime.now()
            )
            eateriesDf.at[idx, 'cql_id'] = a.id
            a.save()
            ActivityChurn.create(id=a.id)
        print("Eateries added")

        landmarksDf = pd.read_json('data/landmarks.json')
        for idx, row in landmarksDf.iterrows():
            a = Activity(
                name=row['name'],
                location="|".join(
                    [row['city'], str(row['latitude']), str(row['longitude'])]),
                price=float(randint(40, 350)),
                metadata=row['metadata'],
                created_on=datetime.now(),
                created_by=get_random_element(admins),
            )
            landmarksDf.at[idx, 'cql_id'] = a.id
            a.save()
            ActivityChurn.create(id=a.id)
        print("Landmarks added")
        outdoorDf = pd.read_json('data/outdoor_activities.json')
        cities = ["New York", "Los Angeles", "San Francisco",
                  "San Jose", "San Diego", "London"]
        for idx, row in outdoorDf.iterrows():
            a = Activity(
                name=row['name'],
                location=get_random_element(cities),
                price=float(row['price']),
                metadata=row['metadata'],
                created_on=datetime.now(),
                created_by=get_random_element(admins)
            )
            outdoorDf.at[idx, 'cql_id'] = a.id
            a.save()
            ActivityChurn.create(id=a.id)
        print("Outdoor activities added")
        # Listings
        amenities = ["Free Wi-Fi",
                     "Swimming pool",
                     "Fitness center",
                     "Spa",
                     "Hot tub",
                     "Sauna",
                     "Restaurant",
                     "Bar/Lounge",
                     "Room service",
                     "Concierge",
                     "Business center",
                     "Meeting facilities",
                     "Airport shuttle",
                     "Laundry service",
                     "Pet-friendly rooms",
                     "Non-smoking rooms",
                     "Wheelchair accessible",
                     "24-hour front desk",
                     "Luggage storage",
                     "ATM/banking services",
                     "Free breakfast",
                     "Free parking",
                     "Valet parking",
                     "Paid shuttle service"]

        listingsDf = pd.read_json('data/airbnb.json')
        for idx, row in listingsDf.iterrows():
            l = Listing(
                name=row['name'],
                location='|'.join(
                    [row['city'], str(row['latitude']), str(row['longitude'])]),
                price=float(row['price']),
                host_id=str(row['id']),
                host_name=str(row['host_name']),
                amenities=sample(amenities, 5),
                created_on=datetime.now(),
                created_by=get_random_element(admins)
            )
            listingsDf.at[idx, 'cql_id'] = l.id
            l.save()
            ListingChurn.create(id=l.id)
        print("Listings added")
        # Plans
        today = date.today()
        for i in range(6):
            stayRow = listingsDf.sample(1).reset_index()
            activities = []
            for _, row in eateriesDf.sample(3).reset_index().iterrows():
                activities.append(
                    FActivity(id=row['cql_id'], name=row['name']))
            p = Plan(
                name=f"Plan {i+1}",
                start_date=today + timedelta(days=randint(5, 9)),
                end_date=today + timedelta(days=randint(9, 15)),
                budget=2,
                stay=FStay(id=stayRow.loc[0, 'cql_id'],
                           name=stayRow.loc[0, 'name']),
                activities=activities,
                created_by=get_random_element(admins),
                created_on=datetime.now()
            )
            p.save()
            PlanChurn.create(id=p.id)
        print("Plans added")


def is_empty(table_name):
    return db.session.query(db.Model).filter_by(__table__=table_name).count() == 0


if __name__ == "__main__":

    # if db.metadata.tables:
    #     for table in db.metadata.tables.values():
    #         db.session.execute(f"TRUNCATE {table.name}")

    #         # Commit the changes to the database
    #         db.session.commit()
    #         print("All tables truncated")

    # else:
    #     print("There are no tables in the database.")

    # if is_empty('users') and is_empty('listings') and is_empty('plans') and is_empty('activities'):
    insert_dummy_data()
