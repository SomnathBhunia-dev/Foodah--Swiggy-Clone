import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Context from './components/Context';
import ItemPage from './ItemPage'
import Navbar from './components/Navbar';
import Cart from './Cart';
import Home from './Home';
import Collection from './Collection';
import Alert from './components/Alert';
function App() {
  return (
    <Context>
      <Router>
          <Navbar />
          <Alert />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Resturent/:productId' element={<ItemPage />} />
          <Route path='/Collection/:collectionId' element={<Collection />} />
        </Routes>
      </Router>
    </Context>
  )
}

export default App;
