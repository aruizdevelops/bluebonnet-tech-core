'use client';

import { AppBar, Toolbar, Box, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from '../common/Logo';

export function TopBar({ onMenuToggle, actions, ...props }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      {...props}
    >
      <Toolbar sx={{ gap: 2 }}>
        {onMenuToggle && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuToggle}
            sx={{ display: { md: 'none' }, flexShrink: 0 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Logo sx={{ minWidth: 0 }} />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}>{actions}</Box>
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
          U
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
