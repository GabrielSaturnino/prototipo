import React, { useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import { Navigate } from 'react-router'
import { useTracker } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { UsersCollection } from '../../api/users';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import '../../api/userMethods';

const options = ['Masculino', 'Feminino', 'Outros'];

export default function Profile() {

  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState('');

  const currentUser = Meteor.user();

  const { usuario } = useTracker(() => {
    Meteor.subscribe('findOneUser', currentUser.emails[0].address);
    const usuario = UsersCollection.find().fetch();
    return { usuario };
  });

  const [genero, setGenero] = React.useState(options[0]);
  const [inputGenero, setInputGenero] = React.useState('');

  const [nome, setNome] = useState(usuario[0].name);
  const [email, setEmail] = useState(currentUser.emails[0].address);
  const [data, setData] = useState(currentUser.profile.date);
  const [sexo, setSexo] = useState(currentUser.profile.gender);
  const [empresa, setEmpresa] = useState(currentUser.profile.empresa);

  // Salvando os dados originais.
  const originalNome = currentUser.username;
  const originalEmail = currentUser.emails[0].address;
  const originalData = currentUser.profile.date;
  const originalSexo = currentUser.profile.gender;
  const originalEmpresa = currentUser.profile.empresa;

  const date = currentUser.profile.date;

  let novaData = date.split('-');

  if (image === '') {
    const userImage = usuario[0].profileImg;
    setImage(userImage);
  }

  const handleEdit = () => {
    setEdit(true);
  }

  const handleCancelEdit = () => {
    setNome(originalNome);
    setEmail(originalEmail);
    setData(originalData);
    setSexo(originalSexo);
    setEmpresa(originalEmpresa);
    setEdit(false);
  }

  const handleSalvar = () => {

    Meteor.call('atualizarData', usuario[0]._id, nome, image);

    Meteor.call('atualizarDadosUsuario', data, genero, empresa);
    setEdit(false);
  }

  const handleConvertBase64 = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let img = '';

    reader.onloadend = () => {
      img = reader.result.toString()
      setImage(reader.result.toString());
    }
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '250px', height: '250px' }}>
            <div style={{ height: '100%', width: '100%' }}>
              <img style={{ height: '100%', width: '100%', borderRadius: '50%', }} src={image} />
            </div>
          </div>
          {edit === true ?

            < input
              id='fileupload'
              type='file'
              onChange={e => handleConvertBase64(e)} />
            : ''}

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

            variant="filled"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: !edit,
            }}
          /> <br /> <br />

          {!edit &&
            <>
              <TextField
                id="outlined-read-only-input"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name='taskDescription'
                sx={{ width: '100%' }}
                InputProps={{
                  readOnly: !edit,
                }}
              />  <br /> <br />
            </>
          }


          {edit ?
            <TextField
              sx={{ width: '100%' }}
              required
              type='date'
              name='date'
              onChange={(e) => setData(e.target.value)}
            />
            :
            <TextField
              id="outlined-read-only-input"
              variant="filled"
              value={`${novaData[2]}/${novaData[1]}/${novaData[0]}`}
              name='taskDescription'
              sx={{ width: '100%' }}
              InputProps={{
                readOnly: !edit,
              }}
            />
          } <br /> <br />

          {edit ?
            <>
              <Autocomplete
                value={genero}
                onChange={(event, newGenero) => {
                  setGenero(newGenero);
                }}
                inputValue={inputGenero}
                onInputChange={(event, newInputGenero) => {
                  setInputGenero(newInputGenero);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Gênero" />}
              /> <br /> <br />
            </>
            :
            <>
              <TextField
                id="outlined-read-only-input"
                variant="filled"
                value={genero}
                name='taskDescription'
                sx={{ width: '100%' }}
                InputProps={{
                  readOnly: !edit,
                }}
              /> <br /> <br />
            </>}

          <TextField

            variant="filled"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            name='taskDescription'
            sx={{ width: '100%' }}
            InputProps={{
              readOnly: !edit,
            }}
          /> <br /> <br />
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>

            {!edit ?
              <Button
                variant="contained"
                color="info"
                onClick={handleEdit}
              >Editar</Button> :
              <Button
                variant="contained"
                color="success"
                onClick={handleSalvar}
              >Salvar</Button>
            }
            {edit &&
              < Button
                variant="contained"
                color="error"
                onClick={handleCancelEdit}
              >Cancelar</Button>}
          </Box>
        </Box>
      </Box >
    </>
  );
}