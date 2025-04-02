import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import AddContact from './Pages/AddContact'
import EditContact from './Pages/EditContact'
import ContactDetail from './Pages/ContactDetail'

const App = () => {
  return (
    <div>
      
      <Router>
        <Routes>
        
          <Route path="/Home" element={<Home />} />
          <Route path="/Add" element={<AddContact />} />
          <Route path="/edit" element={<EditContact />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App