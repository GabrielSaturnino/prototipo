import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { UsersCollection } from '../../api/users';
import { useTracker } from 'meteor/react-meteor-data';
import { Form } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const Login = () => {

  const users = useTracker(() => UsersCollection.find({}).fetch());
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignIn = e => {
    //e.preventDefault();
    const data = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    }

    // validando dados
    let validateMsg = handleValidate(email, senha);
    if (validateMsg !== "Dados válidos") {
      e.preventDefault();
      alert(validateMsg);
    } else {
      //validando se o usuario existe
      validateMsg = handleVerifyExistentUser(email, senha);
    }

    // //usuario inexistente
    if (!validateMsg) {
      e.preventDefault();
      alert('Dados inválidos!');
    } else {

      //usuario existente
      handleLogIn();
    }
  }

  const handleValidate = (email, senha) => {
    if (!email) return "Digite um e-mail válido!";
    if (!senha) return "Digite uma senha valida!";
    else return "Dados válidos";
  }

  const handleVerifyExistentUser = email => {
    let currentUser = false;
    users.forEach(savedUser => {
      if (savedUser.email === email) currentUser = savedUser;
    });
    return currentUser;
  }

  const handleLogIn = () => {
    Meteor.loginWithPassword(email, senha);
  }

  return (

    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
      <Typography variant='h1' sx={{
        textAlign: 'center',
        fontSize: '3em'
      }}>Bem vindo ao todo list</Typography>
      <Form onSubmit={handleSignIn} action='/main/home'>
        <Container sx={{ width: '320px' }}>
          <Box
            component="div"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' }, display: 'flex', flexDirection: 'column',
            }}
            autoComplete="on"
          >

            <TextField
              required
              id="outlined-required"
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              name='email'
              placeholder='example@email.com'
            />
            <TextField
              required
              id="outlined-disabled"
              type='password'
              value={senha}
              onChange={e => setSenha(e.target.value)}
              name='password'
              placeholder='Password'
            />

            <Button variant="contained" type='submit' sx={{ m: 1, width: '100%' }}>
              Logar
            </Button>
            <Typography variant='p' sx={{ m: 1 }}>clique <Link to={'/new'}>aqui</Link> para criar sua conta</Typography>

          </Box>

        </Container >
      </Form >
    </Box>

  );
}