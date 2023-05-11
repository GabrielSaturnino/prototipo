import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { TasksCollection } from '../../../api/task';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router'

const options = ['Publica', 'Pessoal'];

export default function NewTask() {

  const [redirect, setRedirect] = useState(false);
  const user = Meteor.user();

  const [tipo, setTipo] = React.useState(options[0]);
  const [inputTipo, setInputTipo] = React.useState('');

  console.log(tipo);


  const handleCreatTask = e => {
    e.preventDefault();

    const task = {
      name: e.target.elements.taskName.value,
      desc: e.target.elements.taskDescription.value,
      createdAt: new Date(),
      createdBy: user._id,
      userName: user.username,
      tipo: tipo,
      situation: 'Criada'
    }

    TasksCollection.insert(task);

    alert('Tarefa criada!');
    handleRedirect();
  }

  const handleRedirect = () => {
    setRedirect(true);
  }

  return (
    <>
      {redirect && <Navigate to={'/main/tasks'} />}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'lightgray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="form"
          action='/main/tasks'
          autoComplete="off"
          onSubmit={handleCreatTask}
          sx={{
            width: '50%',
          }}
        >
          <TextField
            id="filled-search"
            label="Nome da tarefa"
            type="search"
            variant="filled"
            required
            name='taskName'
            sx={{ width: '100%' }}
          /> <br /> <br />
          <TextField
            id="filled-multiline-flexible"
            label="Descrição da tarefa"
            multiline
            maxRows={5}
            variant="filled"
            required
            name='taskDescription'
            sx={{ width: '100%' }}
          /> <br /> <br />
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>

            <Autocomplete
              value={tipo}
              onChange={(event, newTipo) => {
                setTipo(newTipo);
              }}
              inputValue={inputTipo}
              onInputChange={(event, newInputTipo) => {
                setInputTipo(newInputTipo);
              }}
              id="controllable-states-demo"
              options={options}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Tipo da tarefa" />}
            />

            <Button
              variant="contained"
              color='success'
              type='submit'
            >Salvar</Button>
            <Button
              variant="contained"
              color='error'
              onClick={handleRedirect}
            >Cancelar</Button>
          </Box>

        </Box>
      </Box >
    </>
  );
}