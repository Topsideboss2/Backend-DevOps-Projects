import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatars({image,width,heigt}) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Remy Sharp"
        src={image}
        sx={{ width: 26, height: 26 }}
      />
      
    </Stack>
  );
}