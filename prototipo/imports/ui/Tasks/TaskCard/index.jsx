import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { TasksCollection } from '../../../api/task';
import { Meteor } from 'meteor/meteor';

import { Link } from 'react-router-dom';
import { yellow } from '@mui/material/colors';

export const TaskCard = tasks => {

    const user = Meteor.user();
    const imgAdress = 'https://upload.wikimedia.org/wikipedia/commons/3/38/Task.svg'

    const handleDelete = (e) => {
        e.preventDefault();
        const id = tasks.tasks._id;
        if (user._id === tasks.tasks.createdBy) TasksCollection.remove(id);
        else alert('Somente o criador da tarefa pode apaga-la');
    }

    return (
        <Link to={`/main/tasks/view/${tasks.tasks._id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <List sx={{ width: '100%' }}>
                <ListItem alignItems="flex-start">
                    <Box
                        component={'div'}
                        sx={{

                            background: 'pink',
                            borderRadius: '5px',
                            width: '100%',
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <img src={imgAdress} alt="icone de task" style={{ width: '100px' }} />
                        <Box
                            component={'div'}
                            sx={{
                                height: '100%',
                                width: 'calc(100% - 100px)',
                                p: '10px',
                                cursor: 'pointer',
                                titleAccess: 'visualizar tarefa'
                            }}
                        >
                            <Typography variant='h4'>
                                {tasks.tasks.createdAt.getHours()}:{tasks.tasks.createdAt.getMinutes()}- {tasks.tasks.name}</Typography>
                            <Typography variant='span'>Criado por: {tasks.tasks.userName}</Typography>
                        </Box>
                        <div style={{
                            width: '150px',
                            height: '50px',
                            marginTop: '20px'
                        }}><Button
                            sx={{ boxShadow: '3px 3px solid black' }}
                            color="error"
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            onClick={handleDelete}>
                                Delete
                            </Button></div>
                        <Divider variant="inset" component="li" />
                    </Box>
                </ListItem>
            </List >
        </Link>
    );
}
