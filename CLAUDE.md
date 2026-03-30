@AGENTS.md

# bluebonnet-tech-core — Shared Foundation Package

This is a shared NPM package consumed by `bluebonnet-tech-starter` and future tenant repos. It is NOT a deployable app. The `app/` directory is a dev playground only.

## What this repo exports
- Theme: `createCoreTheme`, palette, typography, component overrides
- Components: layout shells (AppShell, LandingShell), landing page sections (Hero, Services, About, etc.), forms (FormField, FormSection, StepperFlow), navigation (TopBar, Sidebar), common (Logo, PageContainer, StatusChip)
- Providers: TenantProvider, CoreThemeProvider
- Contracts: tenant manifest, booking config, checkout config, adapter typedefs — all JSDoc + validators
- Hooks: useLocalStorage, useStepperFlow
- Utils: security, validation
- Constants: business types, core version, drawer width

## What must NEVER go in this repo
- Tenant-specific content, copy, or branding
- Business logic (pricing rules, scheduling logic, etc.)
- API routes or server-side code
- Database models or persistence
- Adapter implementations (those go in starter/tenant repos)
- Admin panel code
- i18n translation files
- Hard-coded user-facing strings in any language

## Consumption pattern
Starter and tenant repos consume via package exports:
```js
import { LandingPage } from '@bluebonnet-tech/core/components/landing';
import { TenantProvider, CoreThemeProvider } from '@bluebonnet-tech/core/providers';
import { validateTenantManifest } from '@bluebonnet-tech/core/contracts';
import { useStepperFlow } from '@bluebonnet-tech/core/hooks';
```

## Architectural rules
- JavaScript only. No TypeScript.
- Contracts are JSDoc typedefs + validator functions. No runtime classes.
- No plugin systems, DI containers, workflow engines, or runtime adapter discovery.
- Components accept data via props. No hardcoded content.
- Keep files small. One component per file.
- `npm run build` must pass after every change.

## Related repos
- `bluebonnet-tech-starter`: deployable template app — workflows, adapters, admin, i18n, tenant configs
- Future tenant repos: thin layers that clone starter and replace tenant config
