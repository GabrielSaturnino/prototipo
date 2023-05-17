import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { TaskCard } from '../TaskCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';

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
  const [pages, setPages] = useState(1);
  const [personalPages, setPersonalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  let { listaTarefas, personalTasks, isLoading, filteredPost, filteredPersonalPost, totalTasks, totalPersonalTasks } = useTracker(() => {
    //let listaTarefas = TasksCollection.find({ tipo: "Publica" }).fetch();
    let listaTarefas = [];
    let personalTasks = TasksCollection.find({ createdBy: userId }).fetch();
    let isLoading = false;

    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      isLoading = true;
    }

    let totalTasks = TasksCollection.find({ tipo: "Publica" }).count();
    let totalPersonalTasks = TasksCollection.find({ tipo: "Pessoal", createdBy: userId }).count();

    //itens por pagina
    const itensPerPage = 4;

    // Numero de paginas 
    const paginas = currentPage;

    const itensAPular = (paginas - 1) * itensPerPage;

    // Tarefas Publicas
    if (estado === 'Qualquer' && tipo === 'All') {
      listaTarefas = TasksCollection.find(
        { tipo: "Publica" }, { skip: itensAPular, limit: itensPerPage }).fetch();
    } else if (estado !== 'Qualquer' && tipo === 'All') {
      listaTarefas = TasksCollection.find(
        { tipo: "Publica", situation: estado }, { skip: itensAPular, limit: itensPerPage }).fetch();
    }

    // Tarefas Pessoais
    if (estado === 'Qualquer' && tipo === 'Pessoal') {
      personalTasks = TasksCollection.find(
        { createdBy: userId }, { skip: itensAPular, limit: itensPerPage }).fetch();
    } else if (estado !== 'Qualquer' && tipo === 'Pessoal') {
      personalTasks = TasksCollection.find(
        { createdBy: userId, situation: estado }, { skip: itensAPular, limit: itensPerPage }).fetch();
    }

    // Buscando Tarefas Publicas
    let filteredPost = !!textInput ?
      listaTarefas.filter(task => {
        return task.name.toLowerCase().includes(
          textInput.toLowerCase()
        );
      })
      :
      listaTarefas;

    // Buscando Tarefas Pessoais
    let filteredPersonalPost = !!textInput ?
      personalTasks.filter(task => {
        return task.name.toLowerCase().includes(
          textInput.toLowerCase()
        );
      })
      :
      personalTasks;

    return { listaTarefas, personalTasks, isLoading, filteredPost, filteredPersonalPost, totalTasks, totalPersonalTasks };
  });

  useEffect(() => {
    const numberOfPages = Math.ceil(totalTasks / 4);
    const numberOfPersonalPages = Math.ceil(totalPersonalTasks / 4);

    setPages(numberOfPages);
    setPersonalPages(numberOfPersonalPages);

  }, [totalTasks]);

  if (estado === null) setEstado('Qualquer');

  const handleChange = e => {
    let { value } = e.target;
    setTextInput(value);
  }

  const handlePersonalTasks = () => {
    setTipo('Pessoal');
  }

  const handleAllTasks = () => {
    setTipo('All');
  }

  const handlePage = (event, page) => {
    setCurrentPage(page);
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

      <div style={{ marginBottom: '35px', textAlign: 'center' }}>
        <input type="search"
          placeholder='Pesquise por tarefas'
          style={{ height: '40px', padding: '5px', width: '320px', fontSize: '1.5em' }}
          onChange={handleChange}
          value={textInput}
        />
      </div>

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
          height: '400px',
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
          filteredPost.map(task => <TaskCard key={task._id} tasks={task} />)
          :
          filteredPersonalPost.map(task => <TaskCard key={task._id} tasks={task} />)
        }
      </Box>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

        {tipo === 'All' ?
          <Stack>
            <Pagination count={pages} color="primary" onChange={handlePage} />
          </Stack>
          :
          <Stack>
            <Pagination count={personalPages} color="primary" onChange={handlePage} />
          </Stack>
        }
      </div>
    </>
  );
}