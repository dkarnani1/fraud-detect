import pickle
import os

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import accuracy_score, confusion_matrix

def main():
    model = train()
    #with open('model.pkl', 'wb') as f:
        #pickle.dump(model, f)

# Convert Input to DataFrame
def input_to_df(input):
    # Assuming input is a list of lists where each sub-list is a row
    cols = ['months_as_customer', 'age', 'policy_annual_premium', 'incident_severity', 'total_claim_amount', 'days_between_bind_incident']
    df = pd.DataFrame(input, columns=cols, index=[0])
    return df


def predict(input_data):
    #try:
    #    model = pickle.load(open("backend\\model.pkl", "rb"))
    #except (OSError, IOError) as e:
    #    model = train()
    #    with open('backend\\model.pkl', 'wb') as f:
    #        pickle.dump(model, f)
    model = train()
    pred = model.predict(input_data)
    return pred

# Training Function
def train():
    cols = ['months_as_customer',
            'age',
            'policy_annual_premium',
            'incident_severity',
            'total_claim_amount',
            'days_between_bind_incident',
            'fraud_reported',
            ]
    df_train = pd.read_csv("backend\\data_train_1.csv")[cols]
    X_train = df_train.drop('fraud_reported', axis=1)
    y_train = df_train['fraud_reported']
    df_test = pd.read_csv("backend\\data_test_1.csv")[cols]
    X_test = df_test.drop('fraud_reported', axis=1)
    y_test = df_test['fraud_reported']

    num_df = X_train[['months_as_customer',
                      'age',
                      'policy_annual_premium',
                      'total_claim_amount',
                      'days_between_bind_incident',
                      ]]

    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(num_df)
    scaled_num_df = pd.DataFrame(data = scaled_data, columns = num_df.columns, index = X_train.index)
    
    X_train.drop(columns = scaled_num_df.columns, inplace = True)
    X_train = pd.concat([scaled_num_df, X_train], axis = 1)
    X_test = X_test[X_train.columns]

    dtc = DecisionTreeClassifier()
    dtc.fit(X_train, y_train)

    grid_params = {
        'criterion' : ['gini', 'entropy'],
        'max_depth' : [3, 5, 7, 10],
        'min_samples_split' : range(2, 10, 1),
        'min_samples_leaf' : range(2, 10, 1)
    }
    grid_search = GridSearchCV(dtc, grid_params, cv = 5, n_jobs = -1, verbose = 1)
    grid_search.fit(X_train, y_train)
    dtc = grid_search.best_estimator_

    y_pred = dtc.predict(X_test)

    dtc_test_acc = accuracy_score(y_test, y_pred)
    #print(f"Test accuracy of Decision Tree is : {dtc_test_acc}")
    #print(f"Confusion Matrix of Decision Tree is : \n{confusion_matrix(y_test, y_pred)}")

    #for i,row in enumerate(y_pred):
    #    if row == 1:
    #        print(df_test.iloc[[i]])
    #print(dtc.predict(X_test.iloc[[286]]))
    #print(dtc.predict(X_test.iloc[[297]]))

    return dtc

if __name__ == '__main__':
    main()