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
  const nomeDoUsuario = UsersCollection.findOne({ email: user.emails[0].address });
  const firstName = nomeDoUsuario.name.split(' ');

  // Tasks publicas
  const totalTask = useTracker(() => TasksCollection.find({ tipo: 'Publica' }).count());
  const totalTaskAndamento = useTracker(() =>
    TasksCollection.find({ tipo: 'Publica', situation: 'Iniciada' }).count());

  const totalTaskConcluida = useTracker(() =>
    TasksCollection.find({ tipo: 'Publica', situation: 'Finalizada' }).count());

  // Tasks pessoais
  const totalTaskPessoal = useTracker(() =>
    TasksCollection.find({ createdBy: user._id }).count());

  const totalTaskAndamentoPessoal = useTracker(() =>
    TasksCollection.find({ createdBy: user._id, situation: 'Iniciada' }).count());

  const totalTaskConcluidaPessoal = useTracker(() =>
    TasksCollection.find({ createdBy: user._id, situation: 'Finalizada' }).count());

  return (
    <>
      <Typography variant='h1' sx={{ fontSize: '2.5em', textAlign: 'center', marginBottom: '20px' }}>Olá {firstName[0]}, seja bem vindo ao Todo List</Typography>
      <Box component='main' sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Card sx={{ width: '350px', }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tarefas
              </Typography>
              <Typography variant="body2" color="text.secondary">

                <Typography variant='subtitle2'>Temos {totalTask} tarefas criadas!</Typography>
                <Typography variant='subtitle2'>Temos {totalTaskAndamento} tarefas em andamento!</Typography>
                <Typography variant='subtitle2'>Temos {totalTaskConcluida} tarefas concluidas!</Typography>

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

                <Typography variant='subtitle2'>Tarefas pessoais criadas: {totalTaskPessoal}</Typography>
                <Typography variant='subtitle2'>Tarefas pessoais em andamento: {totalTaskAndamentoPessoal}</Typography>
                <Typography variant='subtitle2'>Tarefas pessoais concluidas: {totalTaskConcluidaPessoal}</Typography>

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