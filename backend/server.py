# Filename - server.py

# Import flask
from flask import Flask
import backend

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/data')
def predict():

    # Returning an api for showing in  reactjs
    return {
        "prediction":"0.4",
        }
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)