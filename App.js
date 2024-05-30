// src/App.js
import React, { useState } from 'react';
import Header from './Header';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import './App.css';

const App = () => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems([...items, item]);
    };

    return (
        <div className="App">
            <Header />
            <ItemForm addItem={addItem} />
            <ItemList items={items} />
        </div>
    );
};

export default App;
