/** @format */

import { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('/api/login', formData)
      .then((res) => {
        let token = res.data;
        localStorage.setItem('token', token);

        onLogin(formData);
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err.message);
        console.log(err.response.data);

        setError(err.response.data.message);
      });
  }

  return (
    <section className='login-page'>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input 
          onChange={handleChange} 
          type='text' 
          name='email' 
          id='email' 
        />
        <label htmlFor='password'>Password</label>
        <input
          onChange={handleChange}
          type='password'
          name='password'
          id='password'
        />
        <button>Login</button>
      </form>
    </section>
  );
}
