"use client"
import { useSession, useUser } from '@clerk/nextjs';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { CardActions, CardHeader, IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import top100Films from '../old_post/Test';


//cardモーダルのスタイル
const cardStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
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
    width: 600,
    height: 300,
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
    const [postText, setPostText] = useState<string>("");
    const [postTag, setPostTag] = useState<string>("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isLoaded, isSignedIn, user } = useUser();
    const [file, setFile] = useState<File & { preview: string } | null>(null);
    const { session } = useSession();

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] },
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

    const client = createClerkSupabaseClient()

    function createClerkSupabaseClient() {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_KEY!,
            {
                global: {
                    // Get the custom Supabase token from Clerk
                    fetch: async (url, options = {}) => {
                        const clerkToken = await session?.getToken({
                            template: 'supabase',
                        })

                        // Insert the Clerk Supabase token into the headers
                        const headers = new Headers(options?.headers)
                        headers.set('Authorization', `Bearer ${clerkToken}`)

                        // Now call the default fetch
                        return fetch(url, {
                            ...options,
                            headers,
                        })
                    },
                },
            },
        )
    }




    async function createPost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        if (!postText) {
            toast.error('何か入力してください')
            setLoading(false)
            return
        }


        const imageFile = file;
        const fileName = `${crypto.randomUUID()}`;
        let imageUrl = null;

        if (imageFile) {
            const { error: upError } = await client.storage
                .from('post_image')
                .upload(fileName, imageFile);

            if (upError) {
                console.error('Error uploading file: ', upError.message);
            } else {
                const { data: urlData } = await client.storage
                    .from('post_image')
                    .getPublicUrl(fileName);
                imageUrl = urlData?.publicUrl;
            }
        }

        await client.from('post').insert({
            postText,
            imageUrl,
        });

        setLoading(false)
        toast.success('sayしました！')
        handleClose()
    }

    useEffect(() => {
        return () => {
            if (file) URL.revokeObjectURL(file.preview);
        };
    }, [file]);

    useEffect(() => {
        if (!open) setFile(null);
    }, [open]);

    useEffect(() => {
        if (!user) return;
    }, [user])

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
                <form onSubmit={createPost}>
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
                                <>
                                    <Image
                                        src={file.preview}
                                        alt='preview'
                                        layout='fill'
                                        objectFit='contain'
                                        // style={{ width: '100%', height: '100%' }}
                                        onLoad={() => URL.revokeObjectURL(file.preview)}
                                        onClick={() => setFile(null)}
                                    />
                                </>
                            ) : (
                                <div>
                                    <input {...getInputProps()} />
                                    <p>画像をドラッグ&ドロップするか、</p>
                                    <p>タップorクリックしてください。</p>
                                </div>
                            )}
                        </div>

                        <textarea className="w-full p-2 bg-transparent outline-none placeholder-gray-400 text-black resize-none"
                            rows={4}
                            placeholder="何してたん？"
                            onChange={(e) => setPostText(e.target.value)}
                        />

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
                </form>

            </Modal>
        </div>
    );
}
