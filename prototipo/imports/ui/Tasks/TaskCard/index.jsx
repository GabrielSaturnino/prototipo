import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { TasksCollection } from '../../../api/task';

export const TaskCard = tasks => {

    const imgAdress = 'https://upload.wikimedia.org/wikipedia/commons/3/38/Task.svg'

    const handleDelete = () => {

        const id = tasks.tasks._id;
        TasksCollection.remove(id);
    }

    return (
        <List sx={{ width: '100%' }}>


            <ListItem alignItems="flex-start">
                <Box
                    component={'div'}
                    sx={{
                        background: 'red',
                        borderRadius: '5px',
                        width: '100%',
                        height: '150px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img src={imgAdress} alt="icone de task" style={{ width: '100px' }} />
                    <Box
                        component={'div'}
                        sx={{
                            background: 'pink',
                            height: '100%',
                            width: 'calc(100% - 100px)',
                            p: '10px'
                        }}
                    >
                        <Typography variant='h4'>
                            {tasks.tasks.createdAt.getHours()}:{tasks.tasks.createdAt.getMinutes()} - {tasks.tasks.name}</Typography>
                        <Typography variant='span'>{tasks.tasks.desc}</Typography>
                    </Box>
                    <DeleteIcon
                        fontSize='large'
                        sx={{ background: 'pink', color: 'red' }}
                        onClick={handleDelete}
                    />
                </Box>
            </ListItem>

            <Divider variant="inset" component="li" />
        </List>
    );
}