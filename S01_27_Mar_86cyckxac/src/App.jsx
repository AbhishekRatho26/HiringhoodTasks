import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import Signin from './Pages/Signin'
import Home from './Pages/Home'
import { ProtectedRoute } from './ProtectedRoute'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<ProtectedRoute />}>
            <Route path="" element={<Home />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App