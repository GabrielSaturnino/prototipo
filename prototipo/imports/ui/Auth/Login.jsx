import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const Login = () => {

  const handleSignIn = e => {
    e.preventDefault();
    const data = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    }
    console.log(data);
  }

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        component="form"
        onSubmit={handleSignIn}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }, display: 'flex', flexDirection: 'column',
        }}
        autoComplete="on"
      >
        <TextField
          required
          id="outlined-required"
          type='email'
          name='email'
          placeholder='example@email.com'
        />
        <TextField
          required
          id="outlined-disabled"
          type='password'
          name='password'
          placeholder='Password'
        />
        <Button variant="contained" type='submit'>
          Logar
        </Button>
        <Typography variant='p'>clique <Link to={'/new'}>aqui</Link> para criar sua conta</Typography>
      </Box>
    </Container>
  );
}