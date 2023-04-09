import json
import random
from datetime import date

activities = [
    {
        "name": "Exploratorium",
        "location": [37.8016, -122.3973],
        "price": 25,
        "metadata": ["Science museum", "interactive exhibits", "family-friendly"],
        "created_on": "2023-04-09",
        "created_by": "admin-chinmayi",
        "updated_on": "2023-04-09"
    },
    {
        "name": "Castro Theatre",
        "location": [37.7624, -122.4344],
        "price": 12,
        "metadata": ["Historic theatre", "movie screenings", "independent films"],
        "created_on": "2023-04-09",
        "created_by": "admin-chinmayi",
        "updated_on": "2023-04-09"
    },
    {
        "name": "Urban Putt",
        "location": [37.7635, -122.4162],
        "price": 14,
        "metadata": ["Indoor mini-golf", "unique course designs", "bar and restaurant"],
        "created_on": "2023-04-09",
        "created_by": "admin-chinmayi",
        "updated_on": "2023-04-09"
    },
    {
        "name": "Presidio Bowling Center",
        "location": [37.7986, -122.4665],
        "price": 7,
        "metadata": ["Classic bowling alley", "affordable prices", "family-friendly"],
        "created_on": "2023-04-09",
        "created_by": "admin-chinmayi",
        "updated_on": "2023-04-09"
    },
    {
        "name": "Mission Cliffs",
        "location": [37.7654, -122.4147],
        "price": 30,
        "metadata": ["Indoor rock climbing", "bouldering", "fitness classes"],
        "created_on": "2023-04-09",
        "created_by": "admin-chinmayi",
        "updated_on": "2023-04-09"
    },
    {
        "name": "San Francisco Museum of Modern Art",
        "location": [37.7857, -122.4011],
        "price": 25,
        "metadata": ["Modern art", "contemporary exhibits", "guided tours"],
        "created_on": "2023-04-09",
        "created_by": "admin-chinmayi",
        "updated_on": "2023-04-09"
    },
    {
        "name": "18 Reasons",
        "location": [37.7532, -122.4199],
        "price": 50,
        "metadata": ["Cooking classes", "hands-on learning", "sustainable food"],
        "created_on": "2023-04-09",
        "created_by": "admin-chinmayi",
        "updated_on": "2023-04-09"
    },
        {
        "name": "Golden Gate Bridge",
        "location": ["San Francisco", 37.8199, -122.4783],
        "price": 0,
        "metadata": ["sightseeing", "outdoor", "recreational"],
    },
    {
        "name": "Golden Gate Park",
        "location": ["San Francisco", 37.7694, -122.4862],
        "price": 0,
        "metadata": ["park", "outdoor", "recreational"],
    },
    {
        "name": "Alcatraz Island",
        "location": ["San Francisco", 37.8267, -122.4233],
        "price": 40,
        "metadata": ["tourist attraction", "outdoor", "recreational"],
    },
    {
        "name": "Ocean Beach",
        "location": ["San Francisco", 37.7725, -122.5115],
        "price": 0,
        "metadata": ["beach", "outdoor", "recreational"],
    },
    {
        "name": "San Francisco Bay",
        "location": ["San Francisco", 37.7749, -122.4194],
        "price": random.randint(30, 100),
        "metadata": ["water sports", "outdoor", "recreational"],
    },
]

# Add additional attributes to each activity
for activity in activities:
    activity["created_on"] = str(date.today())
    activity["created_by"] = "admin-chinmayi"
    activity["updated_on"] = str(date.today())

# Write the data to a JSON file
with open("outdoor_activities.json", "w") as f:
    json.dump(activities, f, indent=4)