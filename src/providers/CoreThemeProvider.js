'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import { createCoreTheme } from '../theme';
import { useTenant } from './TenantProvider';

export function CoreThemeProvider({ children }) {
  const tenant = useTenant();

  const theme = useMemo(
    () => createCoreTheme(tenant.theme || {}),
    [tenant.theme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default CoreThemeProvider;
