# @bluebonnet-tech/core

Shared foundation package for the Bluebonnet Tech multi-tenant platform.

This package provides theme primitives, layout shells, reusable UI components, providers, hooks, contracts, and utilities. It is consumed by `bluebonnet-tech-starter` and tenant-specific repos.

## What this package exports

| Export path | Contents |
|---|---|
| `@bluebonnet-tech/core` | Barrel — all public exports |
| `@bluebonnet-tech/core/theme` | `createCoreTheme`, palette, typography, component overrides |
| `@bluebonnet-tech/core/components` | AppShell, Logo, PageContainer, StatusChip, TopBar, Sidebar |
| `@bluebonnet-tech/core/providers` | TenantProvider, CoreThemeProvider |
| `@bluebonnet-tech/core/hooks` | useLocalStorage |
| `@bluebonnet-tech/core/constants` | APP_NAME, CORE_VERSION, DRAWER_WIDTH, ROUTES |

## Installation

In a consuming repo:

```json
{
  "dependencies": {
    "@bluebonnet-tech/core": "file:../bluebonnet-tech-core"
  }
}
```

## Usage

```jsx
import { TenantProvider, CoreThemeProvider } from '@bluebonnet-tech/core/providers';
import { AppShell } from '@bluebonnet-tech/core/components';

export default function Layout({ children }) {
  return (
    <TenantProvider config={tenantConfig}>
      <CoreThemeProvider>
        <AppShell>{children}</AppShell>
      </CoreThemeProvider>
    </TenantProvider>
  );
}
```

## Dev playground

This repo includes a Next.js app (`app/`) for developing and previewing components in isolation. It is not part of the published package.

```bash
npm install
npm run dev
```

## Peer dependencies

Consuming repos must install:
- `react` 19+
- `react-dom` 19+
- `@mui/material` 7+
- `@emotion/react` 11+
- `@emotion/styled` 11+
- `next` 16+
