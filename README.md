# CS157C-Team4

Faculty: Prof. Mike Wu
## Team Members
- Ayush Nair
- Khue Do Anh Nguyen (updated a change)
- Chinmayi Lokeshwar Hegde

## Notes

### ui

1.  Landing (A)
    - Search button goes to create plan page which is autofilled
2.  Sign in (A)
3.  Sign Up (A)
4.  Dashboard (C)
    <!-- - My Reviews  -->
    - Saved Plans (container)
    - Past Trips (container)
    - My Plans (container)
    - Create Plan (button)
      - LHS will have items for plan (CRUD)
      - RHS will have map
5.  Explore (C)
    - Tabulated windows
      - Listings
      - Events/Landmarks/Restaurants
6.  Admin Screen (K)
    - Tabulated windows for listings/events (CRUD)
7.  Account (K)
    - Profile details (CRUD)
8.  Plan page (particular ID) (K)
    - details
    - ratings/feedback
    - map
    - Links to 4.2 and 1

### backend

FLASK API

1. /login POST
2. /register POST
3. /user
   - /profile GET
   - /saved-plans
   - /my-plans
4. /search POST
5. /listings GET filter -> location
6. /events GET filter -> location
7. /admin
   - /users GET, POST, DELETE, PATCH/POST
   - /listings GET, POST, DELETE, PATCH/POST
   - /events GET, POST, DELETE, PATCH/POST
8. /plan
   - /<:id> GET
   - /<:id> DELETE
   - /<:id> POST - update a plan
   - / POST - create new plan

budget category code to be determined in API

### db

1. Users table:
   user_id (primary key)
   name
   email
   password

2. Plans table:
   plan_id (primary key)
   created by user_id (foreign key to Users table)
   saved by users
   destination
   start_date
   end_date

3. Events/Places:
   place_id
   name
   price(?)
   type
   metadata - cuisine, parking, wheelchair, etc.
   lat/long

4. Accommodations table:
   accommodation_id (primary key)
   name
   location
   price
   amenities (complex datatype - metadata) (room type, ac yes/no, wifi, etc.)

5. Reviews table:
   review_id (primary key)
   user_id (foreign key to Users table)
   plan_id (foreign key to Plan table)
   rating
   comment
