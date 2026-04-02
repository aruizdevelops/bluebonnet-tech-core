'use client';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';
import { DRAWER_WIDTH } from '../../constants';

export function Sidebar({
  open = true,
  onClose,
  navItems = [],
  activePath = '/',
  variant = 'permanent',
  ...props
}) {
  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <Toolbar />
      <List sx={{ px: 1, pt: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={activePath === item.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'rgba(108, 99, 255, 0.12)',
                  '&:hover': {
                    bgcolor: 'rgba(108, 99, 255, 0.18)',
                  },
                },
              }}
              href={item.path}
            >
              <ListItemIcon sx={{ minWidth: 40, color: activePath === item.path ? 'primary.main' : 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: activePath === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: 'background.default',
        },
      }}
      {...props}
    >
      {drawerContent}
    </Drawer>
  );
}

export { DRAWER_WIDTH };
export default Sidebar;
