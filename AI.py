from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # This allows your HTML file to talk to the Python server


@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    user_text = data.get("text", "")

    blob = TextBlob(user_text)
    polarity = blob.sentiment.polarity

    if polarity > 0:
        result = "Positive 😊"
    elif polarity < 0:
        result = "Negative 😠"
    else:
        result = "Neutral 😐"

    return jsonify({"sentiment": result, "score": round(polarity, 2)})


if __name__ == '__main__':
    app.run(port=5000, debug=True)