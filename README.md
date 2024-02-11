# Fraud Detection App for Insurance Claim Companies

We help detect fraudulent insurance claims with our special form!

The development of our fraudulent insurance claims detection project involved a comprehensive ideation and implementation process, leveraging a combination of machine learning, database management, and web development technologies. Our project utilized Python and SQLite for modeling and storing insurance data. We used Machine Learning libraries such as Scikit-learn for preprocessing data. We performed model training with decision tree and random forest classifiers, and hyperparameter tuning using GridSearchCV. 

We then used Pandas and NumPy to facilitate efficient data processing and manipulation tasks, while Pickle enabled seamless loading of pre-trained models to classify fraud without repeated training. 

To enhance user accessibility, we integrated Langchain, allowing insurance employees to execute SQL queries effortlessly through natural language prompts, without having to rely on a tech team.

The frontend interface was developed using React, providing a user-friendly experience, while Flask served as the backend controller, handling requests, processing data, and returning predictions. This approach ensured a robust and efficient solution for detecting fraudulent insurance claims, benefiting both insurance companies and policyholders alike.

To install, follow these steps:  
git clone https://github.com/dkarnani1/fraud-detect.git  
cd fraud-detect  
npm install  
npm start  
