import * as React from 'react';
import Stack from '@mui/material/Stack';
import NavbarBreadcrumbs from '../breadcrumbs';
import { Button } from '@mui/material';
import { logout } from '@shared/api/users';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
    navigate('/login')
  };
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'flex', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
        height:'100%'
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
       <Button variant="outlined" onClick={handleLogout}>Выйти</Button>
    </Stack>
  );
}