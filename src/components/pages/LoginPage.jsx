import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    signUpEmail: '',
    signUpPassword: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSignUpChange(e) {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  }

  function handleSignUpToggle() {
    setShowSignUp(!showSignUp);
  }

  function handleSignUpSubmit(e) {
    e.preventDefault();

    const { username, signUpEmail, signUpPassword } = signUpFormData;

    axios
      .post('/api/signup', { username, email: signUpEmail, password: signUpPassword })
      .then((res) => {
        let token = res.data.token;
        localStorage.setItem('token', token);

        onLogin({ email: signUpEmail }); 
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('/api/login', formData)
      .then((res) => {
        let token = res.data.token;
        localStorage.setItem('token', token);

        onLogin(formData);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <section className='login-page'>
      <h1>{showSignUp ? 'Sign Up' : 'Login'}</h1>
      {error && <p>{error}</p>}
      <form onSubmit={showSignUp ? handleSignUpSubmit : handleSubmit}>
        {!showSignUp ? (
          <>
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
          </>
        ) : (
          <>
            <label htmlFor='username'>Username</label>
            <input
              onChange={handleSignUpChange}
              type='text'
              name='username'
              id='username'
            />
            <label htmlFor='signUpEmail'>Email</label>
            <input 
              onChange={handleSignUpChange} 
              type='text' 
              name='signUpEmail' 
              id='signUpEmail' 
            />
            <label htmlFor='signUpPassword'>Password</label>
            <input
              onChange={handleSignUpChange}
              type='password'
              name='signUpPassword'
              id='signUpPassword'
            />
            <button>Sign Up</button>
          </>
        )}
      </form>
      <button onClick={handleSignUpToggle}>
        {showSignUp ? 'Back to Login' : 'Sign Up'}
      </button>
    </section>
  );
}