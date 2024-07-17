

import { useQuery } from '@tanstack/react-query';

const fetchMobileData = async () => {
  const response = await fetch('http://localhost:5000/mobile');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Agentmanagement = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['mobileData'],
    queryFn: fetchMobileData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Mobile Data</h1>
      <ul>
        {data?.map((item, index) => (
          <li key={index}>
            ID: {item._id}, To: {item.to}, From: {item.from}, Email: {item.email}, Method: {item.method}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Agentmanagement;


