
import React, { useEffect, useState } from 'react';

const Card = () => {
    const [itemPerPages, setItemPerPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [count,setCount] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
        .then(res =>res.json())
            .then(data => {
                setItemPerPages(data.count)
                setCount(data.count)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);
    
    return (
        <div>
            
        </div>
    );
};

export default Card;