import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NewAccount } from '../ui/Auth/NewAccount';
import { Login } from '../ui/Auth/Login';
import { Main } from '../ui/Main/Main';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/new' element={<NewAccount />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}