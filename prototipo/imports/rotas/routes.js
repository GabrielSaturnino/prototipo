import React from 'react';
import { NewAccount } from '../ui/Auth/NewAccount';
import { Login } from '../ui/Auth/Login';
import { Main } from '../ui/Main/Main';
import { createBrowserRouter } from 'react-router-dom';

export const Rota = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/new',
    element: <NewAccount />,
  },
  {
    path: '/main',
    element: <Main />,
  }
]);