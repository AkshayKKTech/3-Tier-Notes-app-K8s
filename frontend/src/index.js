import './tracing'; // Must be imported before React and App render
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// ... rest of your code
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
