import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useUser } from '@clerk/nextjs';

export default function ImageAvatars() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src={user?.imageUrl} sx={{ width: 56, height: 56 }} />
    </Stack>
  );
}
