
import React, { useEffect, useState } from 'react';



const Agentmanagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/mobile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;




  return (
    <div>
    <h1>Mobile Data</h1>
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          ID: {item._id}, To: {item.to}, From: {item.from}, Email: {item.email}, Method: {item.method}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Agentmanagement;
