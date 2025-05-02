import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const hideLayoutPaths = ['/login', '/signup'];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <span className="text-gray-600 text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-100 text-gray-800">
      {!shouldHideLayout && <Header />}
      
      <main className="flex-grow">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 overflow-auto">
          <Outlet />
        </div>
      </main>

      {!shouldHideLayout && <Footer />}
    </div>
  );
}

export default App;
