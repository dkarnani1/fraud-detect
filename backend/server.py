from flask import Flask, request
from flask_cors import CORS
import jsonify
import backend

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['POST'])
def predict():
    input_data = request.json['data']  # Assuming data is sent in JSON under the key 'data'
    print(input_data)
    df = backend.input_to_df(input_data)  # Convert input to DataFrame
    prediction = backend.predict(df)  # Make prediction using the backend function
    return jsonify({"prediction": prediction.tolist()})  # Assuming prediction is numpy array

if __name__ == '__main__':
    app.run(debug=True)
