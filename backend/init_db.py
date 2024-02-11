# Make database
import sqlite3
conn = sqlite3.connect('insurance_fraud.db')
conn.execute('''
    CREATE TABLE IF NOT EXISTS insurance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        months_as_customer INTEGER,
        age INTEGER,
        policy_annual_premium INTEGER,
        incident_severity TEXT,
        total_claim_amount INTEGER,
        days_between_bind_incident INTEGER,
        fraud_reported INTEGER
    )
''')
conn.commit()
conn.close()