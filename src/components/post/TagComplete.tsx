import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import top100Films  from './Test';

export default function TagComplete() {
  return (
    <Autocomplete
      disablePortal
      sx={{ width: 300 }}
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}

//https://mui.com/material-ui/react-autocomplete/
