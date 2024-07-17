
const fetchMobileData = async () => {
    const response = await fetch('http://localhost:5000/mobile');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

export default fetchMobileData