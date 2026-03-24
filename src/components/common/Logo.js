'use client';

import { Box, Typography } from '@mui/material';
import { useTenant } from '../../providers/TenantProvider';

export function Logo({ size = 'medium', ...props }) {
  const tenant = useTenant();

  const sizes = {
    small: { fontSize: '1rem', height: 28 },
    medium: { fontSize: '1.25rem', height: 36 },
    large: { fontSize: '1.75rem', height: 48 },
  };

  const { fontSize, height } = sizes[size] || sizes.medium;

  if (tenant.logo) {
    return (
      <Box
        component="img"
        src={tenant.logo}
        alt={`${tenant.name} logo`}
        sx={{ height, objectFit: 'contain', ...props.sx }}
        {...props}
      />
    );
  }

  return (
    <Typography
      variant="h6"
      sx={{
        fontSize,
        fontWeight: 800,
        background: 'linear-gradient(135deg, #6C63FF, #00E5A0)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...props.sx,
      }}
      {...props}
    >
      {tenant.name}
    </Typography>
  );
}

export default Logo;
