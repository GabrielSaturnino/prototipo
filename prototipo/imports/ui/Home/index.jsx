import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/task';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { UsersCollection } from '../../api/users';

export default function Home() {
  const user = Meteor.user();

  const { usuario } = useTracker(() => {
    Meteor.subscribe('findOneUser', user.emails[0].address);
    const usuario = UsersCollection.find({ email: user.emails[0].address }).fetch();
    return { usuario };
  });

  const firstName = usuario[0].name.split(' ');

  const { totalTask, totalTaskPessoal, totalTaskIniciada, totalTaskConcluida, totalTaskPessoalIniciada, totalTaskPessoalFinalizada } = useTracker(() => {
    Meteor.subscribe('findPublicas');
    const totalTask = TasksCollection.find({ tipo: 'Publica' }).count();

    Meteor.subscribe('findPublicasAndamento');
    const totalTaskIniciada = TasksCollection.find({ tipo: 'Publica', situation: 'Iniciada' }).count();

    Meteor.subscribe('findPublicasFinalizada');
    const totalTaskConcluida = TasksCollection.find({ tipo: 'Publica', situation: 'Finalizada' }).count();

    Meteor.subscribe('findPessoal');
    const totalTaskPessoal = TasksCollection.find({ createdBy: user._id, tipo: 'Pessoal' }).count();

    Meteor.subscribe('findPessoalAndamento');
    const totalTaskPessoalIniciada = TasksCollection.find({ createdBy: user._id, tipo: 'Pessoal', situation: 'Iniciada' }).count();

    Meteor.subscribe('findPessoalFinalizada');
    const totalTaskPessoalFinalizada = TasksCollection.find({ createdBy: user._id, tipo: 'Pessoal', situation: 'Finalizada' }).count();

    return { totalTask, totalTaskPessoal, totalTaskIniciada, totalTaskConcluida, totalTaskPessoalIniciada, totalTaskPessoalFinalizada };
  });

  return (
    <>
      <Typography variant='h1' sx={{ fontSize: '2.5em', textAlign: 'center', marginBottom: '20px' }}>Olá {firstName[0] ? firstName[0] : usuario[0].name}, seja bem vindo ao Todo List</Typography>
      <Box component='main' sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Card sx={{ width: '350px', }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tarefas
              </Typography>
              <Typography variant="body2" color="text.secondary">

                <Typography variant='span'>Temos {totalTask} tarefas criadas!</Typography> <br />
                <Typography variant='span'>Temos {totalTaskIniciada} tarefas em andamento!</Typography> <br />
                <Typography variant='span'>Temos {totalTaskConcluida} tarefas concluidas!</Typography>

              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ width: '350px', height: '200px' }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Suas tarefas pessoais:
              </Typography>
              <Typography variant="body2" color="text.secondary">

                <Typography variant='span'>Tarefas pessoais criadas: {totalTaskPessoal}</Typography> <br />
                <Typography variant='span'>Tarefas pessoais em andamento: {totalTaskPessoalIniciada}</Typography> <br />
                <Typography variant='span'>Tarefas pessoais concluidas: {totalTaskPessoalFinalizada}</Typography>

              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="contained" color='warning' type='submit' sx={{ textAlign: 'center' }}>
          <Link to={'/main/tasks'} style={{ textDecoration: 'none', color: 'white' }}>Visualizar Tarefas</Link></Button>
      </div>
    </>
  );
}