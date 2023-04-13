import pandas as pd
import json
import random
from datetime import datetime

# Read CSV and store columns into dataframe
df = pd.read_csv("./data/airbnb.csv", usecols = ["id","name","latitude","longitude","city","price","host_name"])

# Select randomly 50 rows in dataframe
abnb_df = df.sample(n=50)

# Add these following rows to dataframe
abnb_df['created_on'] = datetime.now()
abnb_df['updated_on'] = datetime.now()
abnb_df['updated_by'] = 'admin - khue'

# Export dataframe into json file
abnb_df.to_json('./data/airbnb.json', orient = 'records')