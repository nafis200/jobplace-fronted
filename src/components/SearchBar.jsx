import React, { useState } from 'react';

// Sample JSON data
const items = [
  { id: 1, name: 'Pizza', price: 10 },
  { id: 2, name: 'Burger', price: 5 },
  { id: 3, name: 'Pasta', price: 8 },
  { id: 4, name: 'Salad', price: 6 },
  { id: 5, name: 'Sandwich', price: 7 },
];

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [results, setResults] = useState([]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAdd = () => {
    if (selectedOption && !selectedItems.includes(selectedOption)) {
      setSelectedItems([...selectedItems, selectedOption]);
    }
    setSelectedOption(''); // Clear the select option
  };

  const handleSearch = () => {
    const searchTerms = selectedItems.join(' ').toLowerCase();

    const filteredItems = items.filter(item => {
      const nameMatches = searchTerms.split(' ').some(term => item.name.toLowerCase().includes(term));
      const priceMatches = searchTerms.split(' ').some(term => item.price.toString() === term);

      // Match either by name or by price or both
      return nameMatches || priceMatches;
    });

    setResults(filteredItems);
  };

  const handleDelete = (item) => {
    setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
  };

  return (
    <div>
      <div>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select an item...</option>
          {items.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name} - ${item.price}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>

      <div>
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index} style={{ display: 'inline', marginRight: '10px' }}>
              {item} <button onClick={() => handleDelete(item)}>x</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleSearch}>Search</button>

      <div>
        <h3>Search Results:</h3>
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;


