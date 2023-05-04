import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import { UsersCollection } from '../../api/users';
import { useTracker } from 'meteor/react-meteor-data';
import { Form } from 'react-router-dom';

const style = {
  container: {
    height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
  },
  form: {
    '& .MuiTextField-root': { m: 1, width: '25ch' }, display: 'flex', flexDirection: 'column',
  }
}

export const NewAccount = () => {
  const users = useTracker(() => UsersCollection.find({}).fetch());

  const handleSignIn = e => {

    const data = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      empresa: e.target.elements.empresa.value,
      password: e.target.elements.password.value,
      date: e.target.elements.date.value,
      gender: e.target.elements.gender.value
    }

    let validateMsg = validate(data);

    if (validateMsg !== "Dados válidos") {
      e.preventDefault();
      alert(validateMsg);
    } else validateMsg = verifyExistentUser(data);

    if (validateMsg === '') {
      createUser(data);
    } else {
      e.preventDefault();
      alert(validateMsg);
    }
  }

  const validate = dataUser => {
    if (!dataUser.name || dataUser.name.length < 3) return "Informe um nome válido!";
    if (!dataUser.email || dataUser.email.length < 5) return "Digite um e-mail válido!";
    if (!dataUser.empresa) return "Digite a empresa em que trabalha";
    if (!dataUser.password || dataUser.password.length < 5) return "Digite uma senha mais forte!";
    else return "Dados válidos";
  }

  const verifyExistentUser = user => {
    let msg = '';
    users.forEach(savedUser => {
      if (savedUser.email === user.email) msg = 'E-mail ja cadastrado';
    });
    return msg;
  }

  const createUser = user => {
    UsersCollection.insert({
      name: user.name,
      email: user.email,
      empresa: user.empresa,
      password: user.password,
      date: user.date,
      gender: user.gender,
      createdAt: new Date()
    });
  }

  return (
    <Form onSubmit={handleSignIn} action='/main'>
      <Container sx={style.container}>
        <Box
          component="div"
          sx={style.form}
          autoComplete="on"
        >

          <TextField
            required
            type='text'
            name='name'
            placeholder='Digite seu nome'
          />

          <TextField
            required
            type='email'
            name='email'
            placeholder='Digite seu E-mail'
          />

          <TextField
            required
            type='text'
            name='empresa'
            placeholder='Empresa em que trabalha'
          />

          <TextField
            required
            type='password'
            name='password'
            placeholder='Password'
          />

          <TextField
            required
            type='date'
            name='date'
          />

          <FormLabel id="radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="female" name='gender' control={<Radio />} label="Female" />
            <FormControlLabel value="male" name='gender' control={<Radio />} label="Male" />
            <FormControlLabel value="other" name='gender' control={<Radio />} label="Other" />
          </RadioGroup>

          <Button variant="contained" type='submit'>
            Cadastrar
          </Button>

        </Box>
      </Container>
    </Form>
  );
}