import React, { useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import { Navigate } from 'react-router'
import { useTracker } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { UsersCollection } from '../../api/users';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Profile() {

  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState('');

  const currentUser = Meteor.user();
  const date = currentUser.profile.date;
  const emails = currentUser.emails[0].address;

  const userData = UsersCollection.findOne({ email: emails });

  let novaData = date.split('-');

  if (image === '') {
    console.log('to entrando aqui!');
    const userImage = userData.profileImg;
    setImage(userImage);
  }

  const handleEdit = e => {
    setEdit(!edit);
  }

  const handleConvertBase64 = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let img = '';

    reader.onloadend = () => {
      img = reader.result.toString()
      setImage(reader.result.toString());
    }

    UsersCollection.update(userData._id, {
      $set: {
        profileImg: image
      }
    });

    reader.readAsDataURL(file);
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'lightgray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px', height: '200px' }}>
            <div style={{ height: '100%', width: '100%' }}>
              <img style={{ height: '100%', width: '100%', borderRadius: '50%', }} src={image} />
            </div>
          </div>
          <input
            id='fileupload'
            type='file'
            onChange={e => handleConvertBase64(e)} />
          <label htmlFor="fileupload">Selecionar foto</label>
        </div>
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
            value={`Nome: ${currentUser.username}`}
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: edit,
            }}
          /> <br /> <br />
          <TextField
            id="outlined-read-only-input"
            variant="filled"
            value={`E-mail: ${emails}`}
            name='taskDescription'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: edit,
            }}
          /> <br /> <br />
          <TextField
            id="outlined-read-only-input"
            variant="filled"
            value={`Data de nascimento: ${novaData[2]}/${novaData[1]}/${novaData[0]}`}
            name='taskDescription'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: edit,
            }}
          /> <br /> <br />
          <TextField
            id="outlined-read-only-input"
            variant="filled"
            value={`Sexo: ${currentUser.profile.gender}`}
            name='taskDescription'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: edit,
            }}
          /> <br /> <br />
          <TextField
            id="outlined-read-only-input"
            variant="filled"
            label={`Empresa que trabalha: ${currentUser.profile.empresa}`}
            name='taskDescription'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: edit,
            }}
          /> <br /> <br />
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Button
              variant="contained"
              color="info"
              onClick={handleEdit}
            >Editar</Button>
            {edit ?
              <Button
                variant="contained"
                color="error"
              //onClick={handleRedirect}
              >Cancelar</Button>
              :
              ''
            }

          </Box>
        </Box>
      </Box >
    </>
  );
}