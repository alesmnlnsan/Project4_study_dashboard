/** @format */

import { useEffect, useState } from 'react';

export default function Todo() {
  const [item, setItem] = useState('');
  const [itemsList, setItemsList] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedText, setEditedText] = useState('');

  // guess? to keep the list even though the page is refreshed
  useEffect(() => {}, [item]);

  const addItem = (e) => {
    e.preventDefault();
    setItemsList([
      ...itemsList,
      { id: Date.now(), text: item, completed: false },
    ]);
    setItem('');
  };

  const todoCheck = (id, completed) => {
    setItemsList((currentItemList) => {
      return currentItemList.map((item) => {
        if (item.id === id) {
          return { ...item, completed };
        }
        return item;
      });
    });
  };

  const deleteItem = (id) => {
    setItemsList((currentItemList) => {
      return currentItemList.filter((item) => item.id !== id);
    });
  };

  const editItem = (id, newText) => {
    setItemsList((currentItemList) => {
      return currentItemList.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        }
        return item;
      });
    });
    setEditingItemId(null);
  };

  const completedCount = itemsList.reduce((count, item) => {
    return count + (item.completed ? 1 : 0);
  }, 0);

  return (
    <div>
      <h1 className='header'>Todos</h1>
      <form className='to-do-form' onSubmit={addItem}>
        <div className='form-row'>
          <label htmlFor='text'>New item</label>
          <input
            onChange={(e) => setItem(e.target.value)}
            value={item}
            type='text'
            id='text'
          />
        </div>
        <button className='button-add' type='submit'>
          Add
        </button>
      </form>
      <ul className='list'>
        {itemsList.map((item, index) => (
          <li key={index}>
            {editingItemId === item.id ? (
              <div>
                <input
                  type='text'
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => editItem(item.id, editedText)}>
                  Save
                </button>
                <button onClick={() => setEditingItemId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <label>
                  <input
                    type='checkbox'
                    checked={item.completed}
                    onChange={(e) => todoCheck(item.id, e.target.checked)}
                  />
                  {item.text}
                </label>
                <button onClick={() => setEditingItemId(item.id)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p>Completed: {completedCount}</p>
    </div>
  );
}
