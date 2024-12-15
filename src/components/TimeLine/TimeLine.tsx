"use client"

import { useSession, useUser } from '@clerk/nextjs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { CardActions, CardContent, CardHeader, Divider, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Posts {
    id: number;
    user_id: string;
    post_type: string;
    postText: string;
    image_id: string;
    reply_to: number;
    favorite: number;
    game_id: number;
    game_title: string;
    updated_at: string;
    created_at: string;
}
interface UserData {
    id: string;
    email: string;
    // 他のユーザーデータのプロパティをここに追加
}
export default function TimeLine() {
    const [timeLine, setTimeLine] = useState<Posts[]>([])
    const [loading, setLoading] = useState(true)
    const { session } = useSession();
    const [selectedImage, setSelectedImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    const { user } = useUser()

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

    const client = createClerkSupabaseClient()



    // useEffect(() => {
    //     const fetchAllUserData = async () => {
    //         try {
    //             const response = await Axios.get(`/api/clerkallusers`);
    //             setUserData(response.data);
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchAllUserData();
    // }, [user]);

    useEffect(() => {
        let ignore = false;
        if (!user) return
        async function loadTasks() {
            setLoading(true)
            const { data, error } = await client.from('post').select('*').order('created_at', { ascending: false })
            if (!error) setTimeLine(data)
            if (error) {
                toast.error('Error loading tasks')
            } else {
                toast.info('ロードしました。')
                console.log(data)
            }
            setLoading(false)

        }
        if (!ignore) { loadTasks() }
        return () => { ignore = true; }
    }, [user])



    const handleImageClick = (url: string) => {
        setSelectedImage(url);
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedImage("");
    }
    const handleDelete = async (id: number, image_id: string) => {
        const { error } = await client.from('post').delete().eq('id', id)
            &&
            await client.storage.from('post_image').remove([image_id])

        if (error) {
            toast.error('Error deleting task')
        } else {
            toast.info('ポストを削除しました。')
            setTimeLine(timeLine.filter((t) => t.id !== id))
            window.location.reload()
        }
    }



    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 10 }}>
                <Box sx={{ bgcolor: '#cfe8fc', height: '200vh', }}>
                    {loading && <p>Loading...</p>}
                    {timeLine.map((post) => (
                        <Card key={post.id} sx={{ maxWidth: 'auto' }}>
                            <CardHeader
                                title={post.user_id}
                                subheader={post.game_title}
                                action={
                                    <IconButton >
                                        {user?.id === post.user_id && (
                                            <DeleteOutlineIcon onClick={() => handleDelete(post.id, post.image_id)} />
                                        )}

                                    </IconButton>
                                }
                            />
                            {post.image_id && (
                                <CardMedia
                                    component="img"
                                    image={'https://uyehbdnaojwdxrrzdwat.supabase.co/storage/v1/object/public/post_image/' + post.image_id}
                                    sx={{ height: 300, cursor: 'pointer' }}
                                    onClick={() => handleImageClick(post.image_id)}
                                />
                            )
                            }
                            <Modal
                                open={isModalOpen}
                                onClose={handleModalClose}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: "translate(-50%, -50%)",
                                    top: "50%",
                                    left: "50%",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                    textAlign: "center"

                                }}
                            >
                                <img
                                    src={'https://uyehbdnaojwdxrrzdwat.supabase.co/storage/v1/object/public/post_image/' + selectedImage}
                                    style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </Modal>

                            <CardContent>
                                <Typography variant="body1">
                                    {post.postText}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <IconButton>
                                    <ReplyIcon />
                                </IconButton>
                                <IconButton>
                                    <StarBorderIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Container>
        </>
    )
}