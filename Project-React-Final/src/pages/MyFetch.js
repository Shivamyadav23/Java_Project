// MyFetch.js
import React, { useState } from 'react';

const MyFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/students/fetch');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setData('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {loading && <p>Loading...</p>}
      {data && typeof data === 'string' ? (
        <p>{data}</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default MyFetch;
