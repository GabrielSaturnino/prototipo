import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function AllTasks() {
  return (
    <>
      <Typography variant='h2' sx={{ textAlign: 'center' }}>Tarefas cadastradas</Typography>
      <Button
        variant="outlined"
        sx={{ m: '20px 0' }}
      ><Link
        to={'/main/tasks/new'}
        style={{ textDecoration: 'none', color: 'black' }}
      >Nova Tarefa</Link></Button>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'gray',
        }}
      >

      </Box>

    </>
  );
}