import React, { useState } from 'react';
import axios from 'axios';

function ProductSearch({items,setItems}) {
    const [brandname, setBrandname] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:5000/search', {
                brandname,
                price: price ? parseFloat(price) : undefined,
                rating: rating ? parseFloat(rating) : undefined,
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error searching for products', error);
        }
    };

    return (
        <div>
            <h1>Product Search</h1>
            <div>
                <input
                    type="text"
                    placeholder="Brand Name"
                    value={brandname}
                    onChange={(e) => setBrandname(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <h2>Results</h2>
                <ul>
                    {results.map((product) => (
                        <li key={product._id}>
                            {product.brandname} - ${product.price} - {product.rating} stars
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProductSearch;
