from flask import Flask, request, jsonify
from flask_cors import CORS
import backend
import genai
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

@app.route('/data', methods=['GET'])
def get_data():
    conn = sqlite3.connect('insurance_fraud.db')
    df = pd.read_sql('SELECT * FROM insurance', conn)
    conn.close()

    data = df.to_dict(orient='records')
    return jsonify({"data": data})

@app.route('/translate_query', methods=['POST'])
def translate_query():
    data = request.json
    query = data.get("query")
    
    # Assuming the chat function returns SQL query string
    sql_query = genai.chat(query)  # Use your chat function to convert English to SQL
    
    #conn = sqlite3.connect('insurance_fraud.db')
    #df = pd.read_sql(sql_query, conn)  # Run the SQL query
    df = pd.DataFrame(sql_query)
    #conn.close()
    
    return jsonify({"data": df.to_dict(orient='records')})

if __name__ == '__main__':
    app.run(debug=True)
