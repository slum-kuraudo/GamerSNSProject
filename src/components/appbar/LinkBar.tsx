'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Sitemark from './SitemarkIcon';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import AccountMenu from './AccountMenu';
import SearchField from './SearchField';
import NewPost from './NewPost';

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

export default function LinkBar() {
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const handleOpenusermenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    

    return (
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
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        <Sitemark />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button variant='text' onClick={() => router.push('/')}startIcon={<HomeRoundedIcon />}>
                                ホーム
                            </Button>
                            <Button variant="text" onClick={() => router.push('/game')} startIcon={<VideogameAssetRoundedIcon />}>
                                ゲームを探す
                            </Button>
                            <Button variant="text" startIcon={<NotificationsRoundedIcon/>}>
                                通知
                            </Button>
                            <Button variant="text" startIcon={<MessageRoundedIcon/>}>
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
                        <NewPost/>
                        <AccountMenu />
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}