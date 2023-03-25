# Retrieve data from https://www.californiahistoricallandmarks.com/landmarks

# NOTE
# This is for initial data only
# not to be run with db-populate.py

import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import hashlib
import random


# Set the URL of the page you want to scrape
url = 'https://www.californiahistoricallandmarks.com/landmarks?grid%5Bf%5D%5Bcounties.name%5D%5B%5D=San%20Francisco'

# Send a GET request to the URL and store the response
response = requests.get(url)

# Parse the HTML content of the page using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Find the table element containing the landmark data
table = soup.find('table')

landmarks = list()

# Extract the data from the table and print it out
for row in table.find_all('tr'):
    cells = row.find_all('td')
    if len(cells) == 7:
        name = cells[3].get_text().strip()
        city = cells[5].get_text().strip()
        price = random.randint(0, 150)
        created_on = datetime.now()
        updated_on = datetime.now()
        created_by = 'admin - chinmayi'
        landmark_id = hashlib.md5(f'{name}{city}'.encode('utf-8')).hexdigest()  # Generate a hash ID

        landmarks.append([landmark_id, name, city, price, created_on, updated_on, created_by])

df = pd.DataFrame(landmarks, columns=['id', 'name', 'city', 'price', 'created_on', 'updated_on', 'created_by'])

df.to_json('landmarks.json', orient = 'records')