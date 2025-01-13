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
import { Toaster } from 'react-hot-toast';

const queryClinet = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClinet}>
      <Router>
        <App />
        <Toaster />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
);
