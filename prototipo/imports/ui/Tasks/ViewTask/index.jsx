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

    console.log(task.name);

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                    defaultValue={task.userName
                    }
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
        </Box>
    );
}