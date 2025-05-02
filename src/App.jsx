import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import conf from './conf/conf.js'
function App() {
//   console.log("Appwrite URL:", conf.appwriteUrl);
// console.log("Appwrite Project ID:", conf.appwriteProjectId);
// console.log("Appwrite Database ID:", conf.appwriteDatabaseId);
// console.log("Appwrite Collection ID:", conf.appwriteCollectionId);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400 text-3xl'>
      <div className='w-full block'>
        <Header />
        <main>
  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App