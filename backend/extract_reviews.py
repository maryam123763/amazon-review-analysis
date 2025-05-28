import pandas as pd
from pymongo import MongoClient

# MongoDB connect karo
client = MongoClient('mongodb://localhost:27017/')
db = client['userdb']

# Collections
reviews_collection = db['reviews']
bias_collection = db['cluster-lable']

# Reviews Data
reviews_data = list(reviews_collection.find({}, {'reviewer id': 1, 'reviewText': 1, '_id': 0}))
bias_data = list(bias_collection.find({}, {'reviewer id': 1, 'Bias status': 1, '_id': 0}))

# Convert to DataFrames
reviews_df = pd.DataFrame(reviews_data)
bias_df = pd.DataFrame(bias_data)

# Merge dono tables 'reviewer id' ke base pe
merged_df = pd.merge(reviews_df, bias_df, on='reviewer id')

# Final dataframe mein sirf yeh columns rakho
final_df = merged_df[['reviewText', 'Bias status']]

# CSV save karo
final_df.to_csv('reviews_dataset.csv', index=False)

print("✅ Dataset ready hogaya as 'reviews_dataset.csv'")
