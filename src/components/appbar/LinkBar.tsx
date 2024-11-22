'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { useUser } from '@clerk/nextjs'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Sitemark from './SitemarkIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';

import NewPost from './NewPost';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { Divider, Drawer, IconButton, MenuItem } from '@mui/material';

//https://mui.com/material-ui/react-bottom-navigation/
//スマホ版のボタンUI↑

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
    fontStyle: 'roboto',
    fontWeight: 500,
}));

const DotIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-person" viewBox="0 0 16 16">
            <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        </svg>
    )
}

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


export default function LinkBar() {
    const [open, setOpen] = useState(false);
    const [draweropen, setDrawerOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isLoaded, isSignedIn, user } = useUser();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const router = useRouter();

    const toggleDrawer = (newOpen: boolean) => () => {
        setDrawerOpen(newOpen);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }


    async function upProfile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            user?.update({
                firstName: firstName,
                lastName: lastName,
                unsafeMetadata: {
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
            <AppBar
                position="fixed"
                enableColorOnDark
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 'calc(var(--template-frame-height, 0px) + 28px)',
                }}
            >
                <Container maxWidth="lg">
                    <StyledToolbar variant="dense" disableGutters>

                        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                            <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor='top'
                                open={draweropen}
                                onClose={toggleDrawer(false)}
                                PaperProps={{
                                    sx: {
                                        top: 'var(--template-frame-height, 0px)',
                                    }
                                }}
                            >
                                <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <IconButton onClick={toggleDrawer(false)}>
                                            <CloseRoundedIcon />
                                        </IconButton>
                                    </Box>
                                    <MenuItem onClick={() => router.push('/home')}>ホーム</MenuItem>
                                    <MenuItem onClick={() => router.push('/game')}>ゲームを探す</MenuItem>
                                    <MenuItem>通知</MenuItem>
                                    <MenuItem>tell</MenuItem>
                                    <Divider sx={{ my: 3 }} />
                                    <MenuItem>
                                        <Button color="info" variant="outlined" startIcon={<CloseRoundedIcon />} onClick={toggleDrawer(false)} fullWidth>
                                            閉じる
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                            <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                                <Sitemark />
                                <Button variant='text' onClick={() => router.push('/home')} startIcon={<HomeRoundedIcon />} >
                                    ホーム
                                </Button>
                                <Button variant="text" onClick={() => router.push('/game')} startIcon={<VideogameAssetRoundedIcon />}>
                                    ゲームを探す
                                </Button>
                                <Button variant="text" startIcon={<NotificationsRoundedIcon />}>
                                    通知
                                </Button>
                                <Button variant="text" startIcon={<MessageRoundedIcon />}>
                                    tell
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 1,
                                alignItems: 'center',
                            }}
                            fontStyle="roboto"
                        >
                            <NewPost />
                            <SignedIn>
                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action
                                            label='プロフィールの設定'
                                            labelIcon={<DotIcon />}
                                            onClick={handleOpen}
                                        >
                                        </UserButton.Action>
                                    </UserButton.MenuItems>
                                </UserButton>

                            </SignedIn>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                            <UserButton>
                                <UserButton.MenuItems>
                                    <UserButton.Action
                                        label='プロフィールの設定'
                                        labelIcon={<DotIcon />}
                                        onClick={handleOpen}
                                    >
                                    </UserButton.Action>
                                </UserButton.MenuItems>
                            </UserButton>
                        </Box>
                    </StyledToolbar>
                </Container>
            </AppBar>
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
                            value={firstName}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='ここは空欄でも構いません'
                            value={lastName}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <br />
                        <input
                            placeholder='自己紹介'
                            type="text"
                            value={bio}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Update
                        </button>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            プロフィール画像やパスワードの変更はこちら
                        </Typography>

                    </Box>
                </form>
            </Modal>
        </>
    )
}