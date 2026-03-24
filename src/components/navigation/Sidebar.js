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
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';

const DRAWER_WIDTH = 260;

const defaultNavItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
  { label: 'Users', icon: <PeopleIcon />, path: '/users' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export function Sidebar({
  open = true,
  onClose,
  navItems = defaultNavItems,
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
