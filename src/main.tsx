// Import Third-Party Modules
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import User-Defined Modules
import { App } from './App';

// Using ReactDOM createRoot method to create a root & render the app component
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
