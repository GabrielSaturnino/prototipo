import React from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/task';
import Rotas from '../rotas/routes';

export const App = () => {
  const text = useTracker(() => TasksCollection.find({}).fetch());
  return (

    <Rotas />

    // <div>
    //   <h1>Welcome to Meteor!</h1>
    //   <ul>
    //     {text.map((task) => <Task key={task._id} task={task} />)}
    //   </ul>
    // </div>
  );
};
