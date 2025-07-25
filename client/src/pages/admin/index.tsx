import React from 'react'
import Header from '@shared/ui/header'
import SideMenu from '@shared/ui/sidebar'
import { Box } from '@mui/material'
import Stack from '@mui/material/Stack'
import MainGrid from '@shared/ui/main-grid'
import { Outlet } from 'react-router-dom'
export default function Admin() {
  return (
    <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box
          component="main"
          sx={{width:'100%', height:'100%'}}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid> 
              <Outlet />
            </MainGrid>
          </Stack>
        </Box>
      </Box>
  )
}
