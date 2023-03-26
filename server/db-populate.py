from app import create_app
from app.extensions import db
from app.models.listing import Listing, User as FUser
from app.models.activity import Activity, Amenity
from app.models.plan import Plan, Stay as FStay, Activity as FActivity
from app.models.user import User
from config import Config
from hashlib import sha256 as hash
from datetime import datetime


def insert_dummy_data():
    flaskapp = create_app(config_class=Config)

    with flaskapp.app_context():


    
        # Users
        u = User(name='Ayush Nair',
                 username='ayush@gmail.com', password=hash('123456'.encode()).hexdigest(), type='ADMIN')
        u.save()
        User.create(name='Chinmayi Hegde',
                    username='chinmayi@gmail.com', password=hash('123456'.encode()).hexdigest(), type='ADMIN')
        User.create(name='Khue Nguyen',
                    username='khue@gmail.com', password=hash('123456'.encode()).hexdigest(), type='ADMIN')

        foreignKey = FUser(id=u.id, name=u.name)


        # Listings
        l = Listing(name='Hotel De Anza',
                    location='432 14th Street', price=140, amenities=['WiFi', 'Laundry', 'Parking', 'Wheelchair-Accessible'], created_by=foreignKey)
        l.save()
        Listing.create(name='Ritz Cali',
                       location='5200 Kallfried Street', price=3242, amenities=['WiFi', 'Laundry', 'Parking', 'Wheelchair-Accessible'], created_by=foreignKey)
        Listing.create(name='Sheraton San Francisco',
                       location='324 Almaden Blvd.', price=2000, amenities=['WiFi', 'Laundry', 'Parking', 'Wheelchair-Accessible'], created_by=foreignKey)

        # Activities


        Activity.create(name='Wonder Wheel',
                        location='500 Kallfried Street', price=20, created_by=foreignKey)
        a1 = Activity(name='Skeleton Gorge Hike',
                      location='30 Almaden Blvd.', created_by=foreignKey)
        a2 = Activity(name='Caps Bar and Lounge',
                      location='4324 1th Street', created_by=foreignKey)
        a2.amenities = [Amenity(type='Cuisine', value='Continental, Italian'), Amenity(
            type='Vibe', value='Party')]
        a1.save()
        a2.save()

            # Plans 
        foreignListing = FStay(id=l.id, name=l.name)
        foreignA1 = FActivity(id=a1.id, name=a1.name)
        foreignA2 = FActivity(id=a2.id, name=a2.name)
        p1 = Plan(location="San Francisco", budget=1, created_by=foreignKey)
        p1.start_date = datetime(2023, 3, 17)
        p1.end_date = datetime(2023, 3, 19)
        p1.stay = foreignListing
        p1.activities = [foreignA1]

        p2 = Plan(location="San Francisco", budget=3, created_by=foreignKey)
        p2.start_date = datetime(2023, 3, 20)
        p2.end_date = datetime(2023, 3, 29)
        p2.stay = foreignListing
        p2.activities = [foreignA1, foreignA2]
        p1.save()
        p2.save()


def is_empty(table_name):
    return db.session.query(db.Model).filter_by(__table__=table_name).count() == 0

if __name__ == "__main__":

    if db.metadata.tables:
            for table in db.metadata.tables.values():
            db.session.execute(f"TRUNCATE {table.name}")

            # Commit the changes to the database
            db.session.commit()
            print("All tables truncated")

    else:
        print("There are no tables in the database.")

        
    if is_empty('users') and is_empty('listings') and is_empty('plans') and is_empty('activities'):
        insert_dummy_data()
