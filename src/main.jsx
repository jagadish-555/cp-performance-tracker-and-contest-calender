import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'; // ⬅️ added Navigate
import { AuthLayout, Login } from './components/index.js';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard.jsx';
import Calendar from './pages/Calendar.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // This matches the root path "/"
        element: <Navigate to="/dashboard" replace /> // ⬅️ redirect from "/" to "/dashboard"
      },
      {
        path: '/dashboard',
        element: (
          <AuthLayout authentication>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: '/calendar',
        element: (
          <AuthLayout authentication>
            <Calendar />
          </AuthLayout>
        ),
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
