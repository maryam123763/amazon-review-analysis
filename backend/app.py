from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load model aur vectorizer
with open('review_classifier.pkl', 'rb') as f:
    model = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    review = data['review']

    review_vec = vectorizer.transform([review])
    prediction = model.predict(review_vec)

    return jsonify({'biased': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
