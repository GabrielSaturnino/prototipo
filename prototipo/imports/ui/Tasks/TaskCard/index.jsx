import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { TasksCollection } from '../../../api/task';
import { Meteor } from 'meteor/meteor';

import { Link, Navigate, } from 'react-router-dom';
import { yellow } from '@mui/material/colors';

const options = [
    'Edit',
    'Delete',
];

const ITEM_HEIGHT = 48;

export const TaskCard = tasks => {

    const user = Meteor.user();
    const userID = Meteor.userId();
    const imgAdress = 'https://upload.wikimedia.org/wikipedia/commons/3/38/Task.svg'
    const [opt, setOpt] = useState('');
    const [navigate, setNavigate] = useState(' ');

    // Menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        const id = tasks.tasks._id;
        if (user._id === tasks.tasks.createdBy) Meteor.call('deleteTask', id);
        else alert('Somente o criador da tarefa pode apaga-la');
    }

    if (opt === 'Edit') {
        const id = tasks.tasks._id;
        if (userID === tasks.tasks.createdBy) {
            setNavigate(id);
        } else {
            alert('Somente o criador da tarefa pode edita-la!');
        }
        setOpt('');
    } else if (opt === 'Delete') {
        handleDelete();
        setOpt('');
    }


    // Cores do card
    let situation = tasks.tasks.situation;
    let cor = '';
    if (situation === 'Criada') {
        cor = 'lightyellow';
    } else if (situation === 'Iniciada') {
        cor = '#EAB972';
    } else if (situation === 'Finalizada') {
        cor = '#75C272';
    }

    return (
        <Link to={`/main/tasks/view/${tasks.tasks._id}`} style={{ textDecoration: 'none', color: 'black' }}>
            {navigate != ' ' ? <Navigate to={`/main/tasks/edit/${navigate}`} />
                :
                <List sx={{ width: '100%' }}>
                    <ListItem alignItems="flex-start">
                        <Box
                            component={'div'}
                            sx={{

                                background: cor,
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
                                    {tasks.tasks.createdAt.getHours()}:{tasks.tasks.createdAt.getMinutes()} - {tasks.tasks.name}</Typography>
                                <Typography variant='span'>Criado por: {tasks.tasks.userName}</Typography>
                                <Typography variant='body1'>{tasks.tasks.situation}</Typography>
                            </Box>
                            <div style={{
                                width: '150px',
                                height: '50px',
                                marginTop: '20px'
                            }}
                                onClick={e => e.preventDefault()}
                            >
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'long-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}

                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: '20ch',
                                        },
                                    }}
                                >
                                    {options.map((option) => (
                                        <MenuItem
                                            key={option}
                                            selected={option === 'Edit'}
                                            onClick={() => setOpt(option)}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <Divider variant="inset" component="li" />
                        </Box>
                    </ListItem>
                </List >
            }

        </Link>
    );
}
