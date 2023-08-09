/** @format */

import { useEffect, useState } from 'react';
import axios from 'axios';
import './Todo.css';

export default function Todo() {
  const [item, setItem] = useState('');
  const [itemsList, setItemsList] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [showTodo, setShowTodo] = useState(true);

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const fetchTodoItems = () => {
    axios
      .get('/api/todo', { params: { user_id: 'user_id' } })
      .then((res) => {
        setItemsList(res.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const addItem = (e) => {
    e.preventDefault();
    axios
      .post('/api/todo', { item: item, user_id: 'your_user_id' })
      .then((res) => {
        setItemsList([...itemsList, res.data]);
        setItem('');
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const deleteItem = (id) => {
    axios
      .delete(`/api/todo/${id}/${'your_user_id'}`)
      .then(() => {
        setItemsList((prevItemsList) =>
          prevItemsList.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const editItem = (id, newText) => {
    axios
      .put(`/api/todo/${'your_user_id'}`, { item_id: id, text: newText })
      .then(() => {
        setItemsList((prevItemsList) =>
          prevItemsList.map((item) =>
            item.id === id ? { ...item, text: newText } : item
          )
        );
        setEditingItemId(null);
      })
      .catch((error) => {
        console.error('Error editing todo item:', error);
      });
  };

  const todoCheck = (id, completed) => {
    axios
      .put(`/api/todo/${'your_user_id'}`, { item_id: id, completed: completed })
      .then(() => {
        setItemsList((prevItemsList) =>
          prevItemsList.map((item) =>
            item.id === id ? { ...item, completed } : item
          )
        );
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const completedCount = itemsList.reduce((count, item) => {
    return count + (item.completed ? 1 : 0);
  }, 0);

  return (
    <div>
      <button className='toggle-button' onClick={() => setShowTodo(!showTodo)}>
        {showTodo ? 'Hide Todos' : 'Show Todos'}
      </button>

      {showTodo && (
        <>
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
                    <button onClick={() => setEditingItemId(null)}>
                      Cancel
                    </button>
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
                    <button onClick={() => setEditingItemId(item.id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p>Completed: {completedCount}</p>
        </>
      )}
    </div>
  );
}
