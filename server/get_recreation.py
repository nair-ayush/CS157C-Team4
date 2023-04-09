# Generate random data for recreational activities

# NOTE
# This is for initial data only
# not to be run with db-populate.py

import json
import random
from datetime import date

activities = [
    {
        "name": "Exploratorium",
        "location": [37.8016, -122.3973],
        "price": 25,
        "metadata": ["indoor","Science museum", "interactive exhibits", "family-friendly"]
    },
    {
        "name": "Castro Theatre",
        "location": [37.7624, -122.4344],
        "price": 12,
        "metadata": ["indoor","Historic theatre", "movie screenings", "independent films"]
    },
    {
        "name": "Urban Putt",
        "location": [37.7635, -122.4162],
        "price": 14,
        "metadata": ["Indoor mini-golf", "unique course designs", "bar and restaurant"]
    },
    {
        "name": "Presidio Bowling Center",
        "location": [37.7986, -122.4665],
        "price": 7,
        "metadata": ["indoor","Classic bowling alley", "affordable prices", "family-friendly"]
    },
    {
        "name": "Mission Cliffs",
        "location": [37.7654, -122.4147],
        "price": 30,
        "metadata": ["Indoor rock climbing", "bouldering", "fitness classes"]
    },
    {
        "name": "San Francisco Museum of Modern Art",
        "location": [37.7857, -122.4011],
        "price": 25,
        "metadata": ["indoor","Modern art", "contemporary exhibits", "guided tours"]
    },
    {
        "name": "18 Reasons",
        "location": [37.7532, -122.4199],
        "price": 50,
        "metadata": ["indoor","Cooking classes", "hands-on learning", "sustainable food"],
    },
        {
        "name": "Golden Gate Bridge",
        "location": ["San Francisco", 37.8199, -122.4783],
        "price": 0,
        "metadata": ["indoor","sightseeing", "outdoor", "recreational"],
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
        {
        "name": "Japanese Tea Garden",
        "location": ["San Francisco", 37.7702, -122.4700],
        "price": 12,
        "metadata": ["garden", "outdoor", "recreational"],
    },
    {
        "name": "Pier 39",
        "location": ["San Francisco", 37.8087, -122.4098],
        "price": 0,
        "metadata": ["tourist attraction", "outdoor", "recreational"],
    },
    {
        "name": "de Young Museum",
        "location": ["San Francisco", 37.7715, -122.4687],
        "price": 15,
        "metadata": ["museum", "art", "outdoor", "recreational"],
    },
    {
        "name": "Painted Ladies",
        "location": ["San Francisco", 37.7764, -122.4329],
        "price": 0,
        "metadata": ["sightseeing", "outdoor", "recreational"],
    },
    {
        "name": "Dolores Park",
        "location": ["San Francisco", 37.7597, -122.4266],
        "price": 0,
        "metadata": ["park", "outdoor", "recreational"],
    },
     {
        "name": "California Academy of Sciences",
        "location": ["San Francisco", 37.7699, -122.4661],
        "price": 40,
        "metadata": ["museum", "science", "indoor", "recreational"],
    },
    {
        "name": "Yerba Buena Ice Skating Center",
        "location": ["San Francisco", 37.7853, -122.4011],
        "price": 20,
        "metadata": ["skating", "indoor", "recreational"],
    },
    {
        "name": "Emporium SF",
        "location": ["San Francisco", 37.7832, -122.4091],
        "price": random.randint(20, 50),
        "metadata": ["arcade", "indoor", "recreational"],
    },
]

# Add additional attributes to each activity
for activity in activities:
    activity["created_on"] = str(date.today())
    activity["created_by"] = "admin-chinmayi"
    activity["updated_on"] = str(date.today())

# Write the data to a JSON file
with open("data/outdoor_activities.json", "w") as f:
    json.dump(activities, f, indent=4)