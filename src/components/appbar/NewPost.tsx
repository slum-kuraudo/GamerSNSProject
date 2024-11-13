import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageAvatars from '../post/Avater';
import TextField from '../post/TextField';
import InputFileUpload from '../post/FileUpdate';
import TagComplete from '../post/TagComplete';
import SendButton from '../post/SendButton';

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} variant='contained'>新しい投稿</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    
                    <Box sx={style}>
                        <ImageAvatars />
                        <TextField />
                        <TagComplete />
                        <InputFileUpload />
                        <SendButton />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
