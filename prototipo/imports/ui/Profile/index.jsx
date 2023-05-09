import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigate } from 'react-router'
import { useTracker } from 'meteor/react-meteor-data';
import { UsersCollection } from '../../api/users';
import { Meteor } from 'meteor/meteor';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Profile() {

  const currentUser = Meteor.user();
  console.log(currentUser);
  const user = useTracker(() => UsersCollection.find({ _id: currentUser }));
  console.log(user)

  return (
    <>
      {/* {redirect && <Navigate to={`/main/tasks/view/${id}`} />} */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'lightgray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      ><div style={{ width: '100px', height: '100px', background: 'yellow' }}>div</div>
        <Box
          component="form"
          action='/main/tasks/view'
          autoComplete="off"
          sx={{
            width: '50%',
          }}
        >
          <TextField
            id="outlined-read-only-input"
            variant="filled"
            name='taskName'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: true,
            }}
          /> <br /> <br />
          <TextField
            id="outlined-read-only-input"
            variant="filled"
            name='taskDescription'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: true,
            }}
          /> <br /> <br />
          <TextField
            id="outlined-read-only-input"
            variant="filled"
            name='taskDescription'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: true,
            }}
          /> <br /> <br />
          <TextField
            id="outlined-read-only-input"
            variant="filled"
            name='taskDescription'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: true,
            }}
          /> <br /> <br />
          <TextField
            id="outlined-read-only-input"
            variant="filled"
            name='taskDescription'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: true,
            }}
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
            //onClick={handleRedirect}
            >Cancelar</Button>
          </Box>
        </Box>
      </Box >
    </>
  );
}