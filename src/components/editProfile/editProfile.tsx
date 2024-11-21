import React from 'react';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs'
import { MenuItem } from '@mui/material';
import { createClient } from '@supabase/supabase-js'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 400,
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    '& .MuiTextField-root': { m: 1, width: '25ch' }
};

type Inputs = {
    handleName: string;
    bio: string;
}

export default function EditProfile() {
    const [open, setOpen] = React.useState(false);
    const [handleName, setHandleName] = useState('');
    const [bio, setBio] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isLoaded, isSignedIn, user } = useUser();


    async function upProfile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            user?.update({
                unsafeMetadata: {
                    handleName: handleName,
                    bio: bio
                }
            })
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }
    if (!isLoaded || !isSignedIn) return null

    return (
        <>
            <MenuItem onClick={handleOpen}>プロフィールを編集</MenuItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={upProfile}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            プロフィール編集
                        </Typography>
                        <input
                            autoFocus
                            type="text"
                            placeholder='ハンドルネーム'
                            value={handleName}
                            onChange={(e) => setHandleName(e.target.value)}
                        />
                        <br />
                        <input
                            placeholder='自己紹介'
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="my-4 bg-purple-500 px-8 py-2 text-lg font-semibold text-white transition-all hover:bg-purple-700"
                        >
                            Update
                        </button>
                    </Box>
                </form>
            </Modal>
        </>
    )
}