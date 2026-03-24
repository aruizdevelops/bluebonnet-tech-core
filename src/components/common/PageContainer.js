'use client';

import { Box, Container, Typography } from '@mui/material';

export function PageContainer({ title, subtitle, maxWidth = 'lg', children, ...props }) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 4 }} {...props}>
      {title && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </Container>
  );
}

export default PageContainer;
