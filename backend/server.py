from flask import Flask, request, jsonify
from flask_cors import CORS
import backend
import sqlite3
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['POST'])
def predict():
    input_data = request.json['data']  # Assuming data is sent in JSON under the key 'data'
    df = backend.input_to_df(input_data)  # Convert input to DataFrame
    prediction = backend.predict(df)  # Make prediction using the backend function
    json_response = jsonify({"prediction": prediction.tolist()})  # Assuming prediction is numpy array

    df.join(pd.DataFrame(prediction, columns=['fraud_reported'])).to_sql('insurance', sqlite3.connect('insurance_fraud.db'), if_exists='append', index=False)

    return json_response

if __name__ == '__main__':
    app.run(debug=True)
