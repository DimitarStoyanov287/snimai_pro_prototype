// src/components/SearchForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.get('http://localhost:5000/equipment/search', {
            params: { type, location, startDate, endDate }
        });
        setResults(response.data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Equipment Type" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    required 
                />
                <button type="submit">Search</button>
            </form>

            <div>
                <h2>Search Results:</h2>
                <ul>
                    {results.map(equip => (
                        <li key={equip._id}>{equip.name} - {equip.description}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchForm;
