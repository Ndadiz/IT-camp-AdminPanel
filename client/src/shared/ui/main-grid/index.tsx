import * as React from 'react';
import Box from '@mui/material/Box';
interface Props{
  children: React.ReactNode;
}
export default function MainGrid({children} : Props) {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {children}
    </Box>
  );
}
