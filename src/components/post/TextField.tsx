import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField() {
  return (
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth
        label="今なにしてん？"
        id="fullWidth"
        multiline />
    </Box>
  );
}
