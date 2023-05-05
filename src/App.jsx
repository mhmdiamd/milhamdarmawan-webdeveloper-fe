import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Transaction from './Pages/Transaction/Transaction';
import ListTransaction from './Pages/ListTransaction/ListTransaction';
import CreateMenu from './Pages/CreateMenu/CreateMenu';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Home />} />
      <Route path="/menu/create-menu" element={<CreateMenu />} />
      <Route path="/transactions" element={<Transaction />} />
      <Route path="/list-transactions" element={<ListTransaction />} />
    </Routes>
  );
}

export default App;
