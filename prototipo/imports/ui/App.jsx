import React from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/task';
import Rotas from '../rotas/routes';
import { RouterProvider } from 'react-router-dom';
import { Rota } from '../rotas/routes';

export const App = () => {
  //const text = useTracker(() => TasksCollection.find({}).fetch());
  return (
    <RouterProvider router={Rota} />
  );
};
