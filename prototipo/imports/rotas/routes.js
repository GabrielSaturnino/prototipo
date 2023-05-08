import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { NewAccount } from '../ui/Auth/NewAccount';
import { Login } from '../ui/Auth/Login';
import { Main } from '../ui/Main/Main';

import AllTasks from '../ui/Tasks/All';
import EditTask from '../ui/Tasks/Edit';
import NewTask from '../ui/Tasks/New';

import Home from '../ui/Home';
import Profile from '../ui/Profile';

import { ProtectedRoutes } from './auth';

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
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/main',
        element: <Main />,
        children: [
          {
            path: '/main/home',
            element: <Home />
          },
          {
            path: '/main/profile',
            element: <Profile />
          },
          {
            path: '/main/tasks',
            element: <AllTasks />
          },
        ]
      }
    ]
  },
]);