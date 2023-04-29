import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../ui/Home/Home';
import { Main } from '../ui/Main/Main';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}