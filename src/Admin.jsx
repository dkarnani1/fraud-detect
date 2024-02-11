import React, { useEffect, useState } from 'react';

function Admin() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');

    // Function to fetch data
    const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:5000/data'); // Adjust the endpoint as needed
        const newData = await response.json();
        setData(newData.data);
    };

    // New function to handle the submission of English queries
    const handleQuerySubmit = async () => {
        const response = await fetch('http://127.0.0.1:5000/translate_query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        const newData = await response.json();
        setData(newData.data); // Assuming the backend returns the query result in the same format
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="admin-container">
            <div className="query-input-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your query in English"
                    className="query-input"
                />
                <button onClick={handleQuerySubmit} className="btn-query">Translate and Run Query</button>
            </div>
            <button onClick={fetchData} className="btn-update">Update Table</button>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>months_as_customer</th>
                        <th>age</th>
                        <th>policy_annual_premium</th>
                        <th>incident_severity</th>
                        <th>total_claim_amount</th>
                        <th>days_between_bind_incident</th>
                        <th>fraud_detected</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.months_as_customer}</td>
                            <td>{row.age}</td>
                            <td>{row.policy_annual_premium}</td>
                            <td>{row.incident_severity}</td>
                            <td>{row.total_claim_amount}</td>
                            <td>{row.days_between_bind_incident}</td>
                            <td>{row.fraud_reported}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
