import React, { useState, useEffect } from 'react';

const Searchfield = () => {
    const [brandname, setBrandname] = useState('Brand Alpha');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const handleBrandChange = (e) => {
        const val = e.target.value;
        setBrandname(val);
    };

    // Update items whenever brandname, price, or category changes
    // useEffect(() => {
    //     setItems({ brandName: brandname, price, category });
    // }, [brandname, price, category, setItems]);

    return (
        <div>
            <h1>Search Filters</h1>

            <div>
                <label>Brand Name:</label>
                <select value={brandname} onChange={handleBrandChange}>
                    <option value="Brand Alpha">Brand Alpha</option>
                    <option value="Brand Beta">Brand Beta</option>
                    <option value="Brand Gamma">Brand Gamma</option>
                </select>
            </div>

        </div>
    );
};

export default Searchfield;

