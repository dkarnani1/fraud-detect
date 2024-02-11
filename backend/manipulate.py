import pandas as pd

def main():
    cols = ['months_as_customer',
            'age',
            'policy_annual_premium',
            'incident_severity',
            'total_claim_amount',
            'days_between_bind_incident',
            'fraud_reported',
            ]
    df = pd.read_csv("backend\\data_test_1.csv")[cols]
    df = df.loc[df['fraud_reported'] == 1]
    print(df.head(10))

if __name__ == '__main__':
    main()