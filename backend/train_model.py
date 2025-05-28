import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

# Dataset load karo
df = pd.read_csv('reviews_dataset.csv')

# Input aur labels
X = df['reviewText']
y = df['Bias status']

# Vectorization
vectorizer = TfidfVectorizer(stop_words='english')
X_vec = vectorizer.fit_transform(X)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X_vec, y, test_size=0.2, random_state=42)

# Model Train
model = LogisticRegression()
model.fit(X_train, y_train)

# Save model
with open('review_classifier.pkl', 'wb') as f:
    pickle.dump(model, f)

# Save vectorizer
with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)

print("✅ Model aur vectorizer save hogaye!")
