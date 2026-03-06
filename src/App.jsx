import './App.css'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './routeLayout/RootLayout';
import ProtectedRoute from './ProtectedRoute';
import Home from './Router/Home';
import About from './Router/About';
import SignIn from './SignIn'
import SignUp from './SignUp'

import Dashboard from './Dashboard'
import CreateBusiness from './CreateBusiness'
import BrowseBusinesses from './BrowseBusinesses'
import BusinessDetails from './BusinessDetails'
import UserProfile from './UserProfile'
import Reviews from './Reviews'
import CreateReview from './CreateReview'
import { useState } from 'react';


function App() {
  const token = localStorage.getItem("token");
  const [businesses, setBusinesses] =useState([])
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
           <Route path="/Signin" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />

         
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>} /> 

          <Route path="/browse-businesses" element={
              <ProtectedRoute><BrowseBusinesses
                businesses={businesses} /> </ProtectedRoute>} />
              <Route path ="/business/:id" element ={
              <BusinessDetails
                  businesses={businesses} />}/>
              <Route path="/Create-business" element={
              <ProtectedRoute><CreateBusiness
                  businesses ={businesses}
                  setBusinesses={setBusinesses}/></ProtectedRoute>} />
              <Route path="/reviews" element={ <ProtectedRoute><Reviews businesses={businesses} /></ProtectedRoute>} />  
              <Route path="/createreview" element={<ProtectedRoute><CreateReview  businesses={businesses}/></ProtectedRoute>} />  
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute >} />   
    </Route>
    ))

  return (
    <>
        <RouterProvider router={router} />
  </>
  )
}

export default App
