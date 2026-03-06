import React from 'react'
import Navbar from '../Router/Navbar'
import { Outlet, useLocation } from 'react-router-dom'

const RootLayout = () => {
  const location = useLocation();
  return (
    <div className='layout'>
    { location.pathname !=="/dashboard"   && <Navbar />}
        <div style={{padding: "100px 40px"}}>
        <main className='page-content'>
            <Outlet />
            </main>
            </div>
        </div>
  )
}

export default RootLayout