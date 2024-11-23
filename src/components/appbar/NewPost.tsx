"use client"
import { useState, useMemo, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/Create';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import TagComplete from '../post/TagComplete';
import SendButton from '../post/SendButton';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';
import top100Films from '../post/Test';

//cardモーダルのスタイル
const cardStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 400,
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    mx: 'auto',
};
//dndのスタイル
const style: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    position: 'relative',
    width: 400,
    height: 300,
    objectFit: 'cover'
}
const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function NewPost() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isLoaded, isSignedIn, user } = useUser();
    const [file, setFile] = useState<File & { preview: string } | null>(null);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: acceptedFiles => {
            if (acceptedFiles.length > 0) {
                const selectedFile = acceptedFiles[0];
                setFile(
                    Object.assign(selectedFile, {
                        preview: URL.createObjectURL(selectedFile)
                    })
                );
            }
        }
    });

    useEffect(() => {
        return () => {
            if (file) URL.revokeObjectURL(file.preview);
        };
    }, [file]);

    useEffect(() => {
        if (!open) setFile(null);
    }, [open]);

    const dropzoneStyle = useMemo(() => ({
        ...style,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);




    //console.log(user?.imageUrl);
    //アバターの画像をキレイにするparamsをセット
    const params = new URLSearchParams();

    params.set('height', '200')
    params.set('width', '200')
    params.set('quality', '100')
    params.set('fit', 'crop')

    const imageSrc = `${user?.imageUrl}?${params.toString()}`

    if (!isLoaded || !isSignedIn) return null

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
                <Card sx={cardStyle}>
                    <CardHeader
                        avatar={
                            <Avatar src={imageSrc} sx={{ maxWidth: 56, maxHeight: 56 }} />
                        }
                        action={
                            <IconButton aria-label="close" onClick={handleClose} sx={{ maxWidth: 56, maxHeight: 56 }}>
                                <CloseIcon />
                            </IconButton>
                        }
                    />
                    <div {...getRootProps()} style={dropzoneStyle}>
                        {file ? (
                            <Image
                                src={file.preview}
                                alt='preview'
                                fill={true}
                                onLoad={() => URL.revokeObjectURL(file.preview)}
                                onClick={() => setFile(null)}
                            />
                        ) : (
                            <div>
                                <input {...getInputProps()} />
                                <p>画像をドラッグ&ドロップするか、</p>
                                <p>タップorクリックしてください。</p>
                            </div>
                        )}
                    </div>

                    <textarea className="w-full p-2 bg-transparent outline-none placeholder-gray-400 text-black resize-none" rows={4} placeholder="何してたん？" />

                    <Divider />
                    <CardActions>
                        <Autocomplete
                            disablePortal
                            size='small'
                            sx={{ width: 250, height: 50 }}
                            options={top100Films}
                            limitTags={1}
                            renderInput={(params) => <TextField {...params} label="タグ" />}
                        />
                        <LoadingButton
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            type='submit'
                        >
                            say
                        </LoadingButton>
                    </CardActions>
                </Card>

            </Modal>
        </div>
    );
}
