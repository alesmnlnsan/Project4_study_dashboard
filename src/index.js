import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from '../src/utils/ErrorBoundary'; 
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <StyledEngineProvider injectFirst>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StyledEngineProvider>
    </Router>
  </React.StrictMode>
);