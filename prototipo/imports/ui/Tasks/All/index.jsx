import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { TaskCard } from '../TaskCard';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../../api/task';

export default function AllTasks() {
  const userId = Meteor.userId();

  const [tipo, setTipo] = useState('All');

  let tasks = useTracker(() => TasksCollection.find({ tipo: 'Publica' }).fetch());
  const personalTasks = useTracker(() => TasksCollection.find({ createdBy: userId }).fetch());


  console.log(userId);
  console.log(personalTasks)

  const handlePersonalTasks = () => {
    setTipo('Pessoal');
  }

  const handleAllTasks = () => {
    setTipo('All');
  }

  return (
    <>
      {tipo === 'All' ?
        <Typography variant='h2' sx={{ textAlign: 'center' }}>Lista de Tarefas</Typography >
        :
        <Typography variant='h2' sx={{ textAlign: 'center' }}>Minhas Tarefas</Typography >
      }
      <Button
        variant="outlined"
        sx={{ m: '20px 0' }}
      ><Link
        to={'/main/tasks/new'}
        style={{ textDecoration: 'none', color: 'black' }}
      >Nova Tarefa</Link></Button>
      <Button
        variant="contained"
        color='warning'
        onClick={handlePersonalTasks}
        sx={{ m: '20px 0 20px 5px' }}
      >Tarefas pessoais</Button>
      <Button
        variant="contained"
        color='info'
        onClick={handleAllTasks}
        sx={{ m: '20px 0 20px 5px' }}
      >Todas as tarefas</Button>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'gray',
          overflowY: 'scroll'
        }}
      > {tipo === 'All' ?
        tasks.map(task => <TaskCard key={task._id} tasks={task} />)
        :
        personalTasks.map(task => <TaskCard key={task._id} tasks={task} />)
        }
      </Box>
    </>

  );
}