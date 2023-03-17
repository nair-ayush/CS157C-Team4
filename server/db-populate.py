from app import create_app
from app.extensions import db
from app.models.listing import Listing, User as FUser
from app.models.activity import Activity, Amenity
from app.models.user import User
from config import Config
from hashlib import sha256 as hash


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
        Listing.create(name='Hotel De Anza',
                       location='432 14th Street', price=140, amenities=['WiFi', 'Laundry', 'Parking', 'Wheelchair-Accessible'], created_by=foreignKey)
        Listing.create(name='Ritz Cali',
                       location='5200 Kallfried Street', price=3242, amenities=['WiFi', 'Laundry', 'Parking', 'Wheelchair-Accessible'], created_by=foreignKey)
        Listing.create(name='Sheraton San Francisco',
                       location='324 Almaden Blvd.', price=2000, amenities=['WiFi', 'Laundry', 'Parking', 'Wheelchair-Accessible'], created_by=foreignKey)

        # Activities
        Activity.create(name='Wonder Wheel',
                        location='500 Kallfried Street', price=20, created_by=foreignKey)
        Activity.create(name='Skeleton Gorge Hike',
                        location='30 Almaden Blvd.', created_by=foreignKey)
        a = Activity(name='Caps Bar and Lounge',
                     location='4324 1th Street', created_by=foreignKey)
        a.amenities = [Amenity(type='Cuisine', value='Continental, Italian'), Amenity(
            type='Vibe', value='Party')]
        a.save()


if __name__ == "__main__":
    insert_dummy_data()
