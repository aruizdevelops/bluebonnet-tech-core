'use client';

import { Box } from '@mui/material';
import Navigation from '../landing/Navigation';
import Footer from '../landing/Footer';

export function LandingShell({ children, navContent = {}, footerContent = {}, socialIcons }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation content={navContent} />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer content={footerContent} socialIcons={socialIcons} />
    </Box>
  );
}

export default LandingShell;
