
import React, { useEffect, useState } from 'react';

const Card = () => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
        .then(res =>res.json())
            .then(data => setCount(data.count))
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);
    console.log(count)
    return (
        <div>
            <h2>{count}</h2>
        </div>
    );
};

export default Card;