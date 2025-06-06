import React from 'react'
import { Navbar, SignUp, LogIn, Home, Bollywood, Hollywood, South, Anime, OtpVerification,AdminHome } from './AllComponents';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

  return (

    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/bollywood" element={<Bollywood />} />
        <Route path="/hollywood" element={<Hollywood />} />
        <Route path="/south" element={<South />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/otpverification/:userId" element={<OtpVerification />} />
      </Routes>
    </BrowserRouter>

  )
}
