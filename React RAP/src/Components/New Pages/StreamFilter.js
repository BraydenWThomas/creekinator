// React
import React, { useState } from 'react';

// Material UI
import { Typography,
         FormControl,
         IconButton,
         InputLabel,
         Select,
         MenuItem } from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

const StreamFilter = ({ header }) => {
  const [stream, setStream] = useState('');

  const streamOptions = [
    "Business Analyst",
    "Business Intelligence",
    "Cloud (AWS)",
    "Technical Analyst", 
    "Software Development",
    "Testing"
  ]

  return (
    <div style={{ display: 'flex', marginBottom: '2%' }}>
      <Typography component="h2" variant="h4" sx={{ flex: 1 }}> {header} </Typography>
      <IconButton aria-label="alpha-sort">
        <SortByAlphaIcon fontSize='medium' />
      </IconButton>
      <FormControl sx={{ float: 'right', minWidth: '25%' }} size="small">
        <InputLabel id="stream-select-label"> Stream </InputLabel>
        <Select
          id="stream-select"
          label="Stream"
          required
          value={stream}
          onChange={(e) => setStream(e.target.value)}>
            {streamOptions.map((stream, index) =>
              <MenuItem key={index} value={stream}> {stream} </MenuItem>
            )}
        </Select>
      </FormControl>
    </div>
  )
}

export default StreamFilter;