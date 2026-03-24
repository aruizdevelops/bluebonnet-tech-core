'use client';

import { Box, Typography, Button, Card, CardContent, Grid, Chip, Stack } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { TenantProvider } from '../src/providers/TenantProvider';
import { CoreThemeProvider } from '../src/providers/CoreThemeProvider';
import { AppShell } from '../src/components/layout/AppShell';
import { PageContainer } from '../src/components/common/PageContainer';
import { StatusChip } from '../src/components/common/StatusChip';

const stats = [
  { label: 'Total Users', value: '12,847', change: '+14%' },
  { label: 'Revenue', value: '$84.2K', change: '+8.3%' },
  { label: 'Active Now', value: '342', change: '+23%' },
  { label: 'Conversion', value: '3.6%', change: '+1.2%' },
];

export default function Home() {
  return (
    <TenantProvider>
      <CoreThemeProvider>
        <AppShell>
          <PageContainer
            title="Dashboard"
            subtitle="Welcome back. Here's what's happening today."
          >
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {stats.map((stat) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
                  <Card>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h3" sx={{ my: 1 }}>
                        {stat.value}
                      </Typography>
                      <Chip
                        label={stat.change}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <RocketLaunchIcon color="primary" />
                  <Typography variant="h4">Getting Started</Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  This is the Bluebonnet Tech core platform. Use this preview to develop
                  and refine shared components before publishing to tenant apps.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="primary">
                    View Components
                  </Button>
                  <Button variant="outlined" color="primary">
                    Theme Preview
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Component Status
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <StatusChip status="active" label="AppShell – Ready" />
                  <StatusChip status="active" label="TopBar – Ready" />
                  <StatusChip status="active" label="Sidebar – Ready" />
                  <StatusChip status="active" label="Logo – Ready" />
                  <StatusChip status="pending" label="Auth – Placeholder" />
                  <StatusChip status="pending" label="DataTable – Planned" />
                </Stack>
              </CardContent>
            </Card>
          </PageContainer>
        </AppShell>
      </CoreThemeProvider>
    </TenantProvider>
  );
}
