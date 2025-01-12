import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import 'antd/es/style/reset.css';
import './assets/css/style.css';
import './assets/css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

const queryClinet = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClinet}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
);
