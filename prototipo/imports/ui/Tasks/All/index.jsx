import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { TaskCard } from '../TaskCard';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../../api/task';


const options = ['Qualquer', 'Criada', 'Iniciada', 'Finalizada'];

export default function AllTasks() {
  const userId = Meteor.userId();

  const [tipo, setTipo] = useState('All');

  const [estado, setEstado] = React.useState(options[0]);
  const [inputEstado, setInputEstado] = React.useState('');

  const [taskList, setTaskList] = useState([]);

  let tasks = useTracker(() => TasksCollection.find({ tipo: 'Publica' }).fetch());
  let personalTasks = useTracker(() => TasksCollection.find({ createdBy: userId }).fetch());
  console.log('TaskList: ' + taskList)

  useEffect(() => {
    setTaskList(tasks);

    switch (tipo) {
      case 'Pessoal':
        console.log('Pessoal');
        break;
      case 'All':
        console.log('Todas');
        break;
    }

    if (estado === 'Criada') {
      tasks = TasksCollection.find({ tipo: 'Publica', situation: 'Criada' }).fetch();
      setTaskList(tasks);
    }
    if (estado === 'Iniciada') {
      tasks = TasksCollection.find({ tipo: 'Publica', situation: 'Iniciada' }).fetch();
      setTaskList(tasks);
    }
    if (estado === 'Finalizada') {
      tasks = TasksCollection.find({ tipo: 'Publica', situation: 'Finalizada' }).fetch();
      setTaskList(tasks);
    }
  }, [estado])


  if (estado === null) setEstado('Qualquer');

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
      <Autocomplete
        value={estado}
        onChange={(event, newEstado) => {
          setEstado(newEstado);
        }}
        inputValue={inputEstado}
        onInputChange={(event, newInputEstado) => {
          setInputEstado(newInputEstado);
        }}
        id="controllable-states-demo"
        options={options}
        renderInput={(params) => <TextField {...params} label="Estado da tarefa" />}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'gray',
          overflowY: 'scroll'
        }}
      >
        {tipo === 'All' ?
          taskList.map(task => <TaskCard key={task._id} tasks={task} />)
          :
          personalTasks.map(task => <TaskCard key={task._id} tasks={task} />)
        }
      </Box>
    </>

  );
}