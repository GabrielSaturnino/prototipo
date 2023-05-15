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
  const [textInput, setTextInput] = useState('');

  let { listaTarefas, personalTasks, isLoading } = useTracker(() => {
    let listaTarefas = [];
    let personalTasks = [];
    let isLoading = false;

    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      isLoading = true;
    }

    if (estado === 'Qualquer' && tipo === 'All') {
      listaTarefas = TasksCollection.find({ tipo: "Publica" }).fetch();
    } else if (estado !== 'Qualquer' && tipo === 'All') {
      listaTarefas = TasksCollection.find({ tipo: "Publica" }).fetch();
    }

    if (estado === 'Qualquer' && tipo === 'Pessoal') {
      personalTasks = TasksCollection.find({ createdBy: userId }).fetch();
    } else if (estado !== 'Qualquer' && tipo === 'Pessoal') {
      personalTasks = TasksCollection.find({ createdBy: userId, situation: estado }).fetch();
    }

    return { listaTarefas, personalTasks, isLoading };
  });

  if (estado === null) setEstado('Qualquer');

  const handlePersonalTasks = () => {
    setTipo('Pessoal');
  }

  const handleAllTasks = () => {
    setTipo('All');
  }
  console.log(textInput);

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

      <input type="search" style={{ margin: 'auto' }}
        onChange={e => setTextInput(e.target.value)}
      />

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
        {isLoading ? <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold'
        }}>loading...</div> : tipo === 'All' ?
          listaTarefas.map(task => <TaskCard key={task._id} tasks={task} />)
          :
          personalTasks.map(task => <TaskCard key={task._id} tasks={task} />)
        }
      </Box>
    </>
  );
}