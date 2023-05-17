import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigate } from 'react-router'
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../../api/task';
import { Meteor } from 'meteor/meteor';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function EditTask() {

  const [redirect, setRedirect] = useState(false);

  const userID = Meteor.userId();
  const { id } = useParams();

  const { task } = useTracker(() => {
    Meteor.subscribe('findOne', id);
    const task = TasksCollection.find({ _id: id }).fetch();
    return { task };
  });

  const handleUpdate = e => {
    e.preventDefault();

    const data = {
      name: e.target.elements.taskName.value,
      desc: e.target.elements.taskDescription.value
    }

    const msg = handleUpdateTask(data);
    if (msg) alert(msg);
    else handleRedirect();
  }

  const handleUpdateTask = data => {
    if (data.name === '' && data.desc === '') return 'Preencha algum campo para editar!';
    else if (data.name === '') Meteor.call('editTaskDesc', id, data.desc);
    else if (data.desc === '') Meteor.call('editTaskName', id, data.name);
    Meteor.call('editTask', id, data.desc, data.name);
    alert('Dados atualizados');
  }

  const handleRedirect = () => {
    setRedirect(true);
  }

  return (
    <>
      {redirect && <Navigate to={`/main/tasks/view/${id}`} />}
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
          action='/main/tasks/view'
          autoComplete="off"
          onSubmit={handleUpdate}
          sx={{
            width: '50%',
          }}
        >
          <TextField
            id="filled-search"
            label='Nome da tarefa'
            placeholder={task[0].name}
            type="search"
            variant="filled"
            name='taskName'
            sx={{ width: '100%' }}
          /> <br /> <br />
          <TextField
            id="filled-multiline-flexible"
            label='descrição da tarefa'
            placeholder={task[0].desc}
            multiline
            maxRows={5}
            variant="filled"
            name='taskDescription'
            sx={{ width: '100%' }}
          /> <br /> <br />
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Button
              variant="contained"
              color="success"
              type='submit'
            >Salvar</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleRedirect}
            >Cancelar</Button>
          </Box>

        </Box>
      </Box >
    </>
  );
}