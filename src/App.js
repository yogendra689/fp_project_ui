import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import Dashboard from './components/Dashboard';
import {getToken, setToken} from './helpers/token'

function App() {
  const token = getToken();

  if(!token) {
    return <Auth setToken={setToken} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App