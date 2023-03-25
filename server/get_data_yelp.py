# Retrieve data from the Yelp dataset

# NOTE
# This is not to be run with db-populate.py

# Data in JSON format, downloaded from Yelp Academic Dataset (Kaggle)

import json
import pandas as pd

# Load the JSON data into a dictionary
with open('yelp_academic_dataset_business.json', 'r') as r:
    response = r.read()
    response = response.replace('\n', '')
    response = response.replace('}{', '},{')
    response = "[" + response + "]"
    data = json.loads(response)

# Create a pandas DataFrame from the list of dictionaries
df = pd.DataFrame(data)

# Removing irrelevant columns

df.drop(['postal_code', 'stars', 'review_count', 'is_open', 'hours', 'state'], inplace = True, axis = 1)
df.drop(['attributes'], inplace = True, axis = 1) #TODO Data model discussion


# Filtering 50 Random Restaurants

sf_df = df[df['categories'].str.contains('Restaurant', na=False)].sample(n = 50)
sf_df['created_on'] = datetime.now()
sf_df['updated_on'] = datetime.now()
sf_df['updated_by'] = 'admin - chinmayi'

# Very few rows had San Francisco data (especially restaurants). Hence, creating sample data
sf_df['city'] = 'San Francisco'