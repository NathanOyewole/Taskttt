// src/ItemForm.js
import React, { useState } from 'react';

const ItemForm = ({ addItem }) => {
    const [item, setItem] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item.trim()) {
            addItem(item);
            setItem('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={item} 
                onChange={(e) => setItem(e.target.value)} 
                placeholder="Add new item"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default ItemForm;
