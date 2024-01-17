import React, { useState, useEffect, useRef } from 'react';
import './ChipInput.css';

const ChipInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [allItems, setAllItems] = useState([
    { name: 'Swati Verma', email: 'swati.verma@example.com' },
    { name: 'Deepak Sharma', email: 'deepak.sharma@example.com' },
    { name: 'Navya Seth', email: 'navya.seth@example.com' },
    { name: 'Akhilesh Yadav', email: 'akhilesh.yadav@example.com' },
    { name: 'Sonam Rai', email: 'sonam.rai@example.com' },
    { name: 'Anuj Verma', email: 'anuj.verma@example.com' },
    { name: 'Divya Singh', email: 'divya.singh@example.com' },
  ]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setFilteredItems(
      allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.email.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, allItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setFilteredItems(allItems); 
  };

  const handleItemClick = (item) => {
    setInputValue('');
    setSelectedItems([...selectedItems, item]);
    setAllItems(allItems.filter((i) => i !== item));
    setFilteredItems(filteredItems.filter((i) => i !== item));
    setIsInputFocused(false);
  };

  const handleChipRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setAllItems([...allItems, item]);
  };

  return (
    <div className="autocomplete-container">
      <div className="chips-container">
        {selectedItems.map((item, index) => (
          <div key={index} className="chip">
            {item.name} ({item.email}){' '}
            <span onClick={() => handleChipRemove(item)}>X</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Type to search..."
        className="search-box"
        ref={inputRef}
      />
      {isInputFocused && (
        <div className="list-box">
          <ul>
            {filteredItems.map((item, index) => (
              <li key={index} onClick={() => handleItemClick(item)}>
                {item.name} ({item.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChipInput;





