"use client"
import useDebounce from '@/app/api/hooks/useDebounce';
import { useSession, useUser } from '@clerk/nextjs';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, CardActions, CardHeader, CircularProgress, IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createClient } from '@supabase/supabase-js';
import Axios from 'axios';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

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

interface Game {
    id: string;
    name: string;
    cover: {
        image_id: string;
        url: string;
    };
    game_localizations: {
        name: string;
        region: number;
    }
}


export default function NewPost() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postText, setPostText] = useState("");
    const [gameId, setGameId] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const debouncedInputValue = useDebounce(inputValue, 500);
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

    const fetchData = async (query: string) => {
        setLoading(true)
        let requestBody = `fields id,name,cover.image_id,game_localizations.name,game_localizations.region,category; search "${query}"; where category = (0,8,9); limit 10;`
        try {
            const res = await Axios.post('/api/igdb', { body: requestBody })
            setGames(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('エラー', error)
            toast.error('リクエストが多すぎます！暫く時間を置いて試してください')
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (debouncedInputValue) {
            fetchData(debouncedInputValue)
        }
    }, [debouncedInputValue])




    async function createPost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        if (!postText) {
            toast.error('何か入力してください')
            setLoading(false)
            return
        }
        if (!isDisabled) {
            toast.error('ゲームを選択してください')
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
            game_id: gameId,
            game_title: inputValue,
        });

        setLoading(false)
        setInputValue("")
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
                            title={user?.fullName}
                            subheader={inputValue}
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
                                limitTags={1}
                                loadingText='検索中'
                                size='small'
                                sx={{ width: 450, height: 40 }}
                                options={games}
                                getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                                inputValue={inputValue}
                                includeInputInList
                                onInputChange={(event, newInputValue) => {
                                    if (!isDisabled) {
                                        setInputValue(newInputValue);
                                    }

                                }}
                                onChange={(event, newValue) => {
                                    setInputValue(typeof newValue === "string" ? newValue : newValue?.name || "");
                                    if (newValue) {
                                        setGameId(Number(newValue.id));
                                        setIsDisabled(true);
                                    } else {
                                        setIsDisabled(false);
                                    }
                                }}
                                renderOption={(props, option) => (
                                    <Box
                                        component="li"
                                        {...props}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            padding: "8px",
                                        }}>
                                        <img
                                            width={40}
                                            height={40}
                                            alt=''
                                            src={
                                                option.cover?.image_id ?
                                                    "https://images.igdb.com/igdb/image/upload/t_1080p/" + option.cover.image_id + ".jpg"
                                                    : 'https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage_%E3%83%92%E3%82%9A%E3%82%AF%E3%83%88-760x460.png'}
                                        />
                                        {option.name}

                                    </Box>
                                )}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="ゲームタイトル検索"
                                    variant='outlined'
                                    disabled={isDisabled}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                                }

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
