import React from 'react'
import Navbar from '../Router/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='layout'>
        <Navbar />
        <div style={{padding: "100px 40px"}}>
        <main className='page-content'>
            <Outlet />
            </main>
            </div>
        </div>
  )
}

export default RootLayout