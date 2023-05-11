import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../../api/task';
import { Meteor } from 'meteor/meteor';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export const ViewTask = () => {

    const userID = Meteor.userId();
    const tasks = useTracker(() => TasksCollection.find().fetch());
    const { id } = useParams();

    const task = TasksCollection.findOne({ _id: id });

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50vw' },
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '15px'
                }}
            >
                <div>
                    <Typography variant='body1'>Nome da tarefa:</Typography>
                    <TextField
                        id="outlined-read-only-input"
                        defaultValue={task.name}
                        sx={{ width: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div>
                    <Typography variant='body1'>Descrição da tarefa:</Typography>
                    <TextField
                        id="filled-read-only-input"
                        defaultValue={task.desc}
                        sx={{ width: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </div>
                <div>
                    <Typography variant='body1'>Criador da tarefa:</Typography>
                    <TextField
                        id="standard-read-only-input"
                        defaultValue={task.userName}
                        sx={{ width: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                </div>
                <div>
                    <Typography variant='body1'>Situação da tarefa:</Typography>
                    <TextField
                        id="outlined-read-only-input"
                        defaultValue={task.situation}
                        sx={{ width: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                {(userID === task.createdBy) &&
                    <Link to={`/main/tasks/edit/${id}`} style={{ textDecoration: 'none', color: 'white' }}>
                        <Button variant="contained">Editar Tarefa
                            <ModeEditIcon fontSize='medium' sx={{ marginLeft: '5px' }} /></Button>
                    </Link>
                }
                <Link to={`/main/tasks`} style={{ textDecoration: 'none', color: 'white' }}>
                    <Button variant="contained" color='success'>Voltar
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}