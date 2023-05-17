import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../../api/task';
import { Meteor } from 'meteor/meteor';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export const ViewTask = () => {

    const userID = Meteor.userId();
    const { id } = useParams();

    const { task } = useTracker(() => {
        Meteor.subscribe('findOne', id);
        const task = TasksCollection.find({ _id: id }).fetch();
        return { task };
    });

    const estado = task[0].situation;

    const options0 = ['Criada', 'Iniciada'];
    const options1 = ['Criada', 'Iniciada', 'Finalizada'];
    let options = options0;

    const [tipo, setTipo] = React.useState(options[0]);
    const [inputTipo, setInputTipo] = React.useState('');

    if (estado === 'Criada') options = options0;
    if (estado === 'Iniciada' || estado === 'Finalizada') options = options1;

    const handleValidarEstado = () => {
        console.log(tipo)
        if (tipo === null) alert('Selecione um estado para esta tarefa!');
        else handleSalvarEstado()
    }

    const handleSalvarEstado = () => {
        let situation = tipo;
        Meteor.call('editTipo', id, situation);
        alert('Estadus da tarefa alterado para: ' + tipo);
    }

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
                        defaultValue={task[0].name}
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
                        defaultValue={task[0].desc}
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
                        defaultValue={task[0].userName}
                        sx={{ width: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                </div>
                <div>
                    <Autocomplete
                        value={estado}
                        onChange={(event, newTipo) => {
                            setTipo(newTipo);
                        }}
                        inputValue={inputTipo}
                        onInputChange={(event, newInputTipo) => {
                            setInputTipo(newInputTipo);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        renderInput={(params) => <TextField {...params} label="Estado da tarefa" />}
                    /> <Button variant='contained' color='warning' onClick={handleValidarEstado}>Salvar estado</Button>
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