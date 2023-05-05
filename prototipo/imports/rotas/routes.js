import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { NewAccount } from '../ui/Auth/NewAccount';
import { Login } from '../ui/Auth/Login';
import { Main } from '../ui/Main/Main';
import AllTasks from '../ui/Tasks/All';
import EditTask from '../ui/Tasks/Edit';
import NewTask from '../ui/Tasks/New';

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
    children: [
      {
        path: '/main/all',
        element: <AllTasks />
      },
      {
        path: '/main/edit',
        element: <EditTask />
      },
      {
        path: '/main/new',
        element: <NewTask />
      },
    ]
  }
]);