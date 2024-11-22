"use client"
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/Create';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import TextField from '../post/TextField';
import TagComplete from '../post/TagComplete';
import SendButton from '../post/SendButton';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NewPost() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = useUser();

    console.log(user.user?.imageUrl);

    const params = new URLSearchParams();

    params.set('height', '200')
    params.set('width', '200')
    params.set('quality', '100')
    params.set('fit', 'crop')

    const imageSrc = `${user.user?.imageUrl}?${params.toString()}`

    return (
        <div className='fixed bottom-10 right-10'>
            <Fab onClick={handleOpen} variant='extended' color='primary' size='large'>
                <CreateIcon sx={{ mr: 1 }} />
                sayする
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Box sx={style}>
                        <Avatar src={imageSrc} sx={{ width: 64, height: 64 }} />
                        <TextField />
                        <TagComplete />
                        <SendButton />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
