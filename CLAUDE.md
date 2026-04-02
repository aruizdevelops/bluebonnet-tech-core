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
- `npm test` must pass after every change.

## Constants rules
- NEVER put app-specific route paths in core constants.
- NEVER put tenant names or branding in core constants.
- Core constants are limited to: CORE_VERSION, DRAWER_WIDTH, and contract enums (BUSINESS_TYPES, BOOKING_STEPS, CHECKOUT_STEPS, etc.).

## Component defaults rules
- Shared components must NOT hardcode default content (nav items, page titles, etc.).
- Default prop values should be empty/neutral (e.g., `navItems = []`), not opinionated.
- Layout shells should require content via props, not reach into tenant context as fallback.

## Module placement rules

These rules define where each major module lives across the platform. Do not add code that violates these boundaries.

### Booking module — core owns contracts only, starter owns everything else
Core provides:
- Step enum (BOOKING_STEPS), config typedef (BookingConfig), data shapes (BookableService, TimeSlot), validator (validateBookingConfig)
- SchedulingAdapter interface typedef
- Generic StepperFlow shell + useStepperFlow hook (shared across all workflows)

Core must NOT contain:
- Booking workflow UI (ServiceSelect, SchedulePicker, BookingConfirm, BookingFlow)
- useBooking hook or any booking state management
- Booking API routes, database models, or scheduling adapter implementations
- Admin booking management pages
- Booking-related translations

### Checkout module — core owns contracts only, starter owns everything else
Core provides:
- Step enum (CHECKOUT_STEPS), config typedef (CheckoutConfig), data shape (CartItem), validator (validateCheckoutConfig)
- Generic StepperFlow shell + useStepperFlow hook

Core must NOT contain:
- Checkout workflow UI (CartReview, PaymentForm, CheckoutFlow)
- useCheckout hook, cart logic, tax calculation, or order totals
- Order API routes, database models, or order management UI
- Checkout-related translations

### Payment module — core owns adapter interface only, starter owns everything else
Core provides:
- PaymentAdapter interface typedef (createIntent, confirmPayment, cancelPayment)

Core must NOT contain:
- Stripe SDK integration (server or client)
- Payment API routes, webhook handlers, or PaymentIntent database models
- Payment adapter implementations (mock or real)
- PaymentForm component or any payment UI

### Admin module — core owns layout shells only, starter owns everything else
Core provides:
- AppShell, TopBar, Sidebar, PageContainer, StatusChip (generic, content-via-props)

Core must NOT contain:
- Admin pages, dashboard components, or admin-specific UI
- Admin navigation item definitions
- Auth logic (JWT, sessions, login/logout)
- Admin API routes or dashboard data endpoints
- Any admin business logic

### General rule
If it requires a database, an API route, a Stripe key, a translation string, tenant-specific logic, or auth — it belongs in starter, not core.

## Related repos
- `bluebonnet-tech-starter`: deployable template app — workflows, adapters, admin, i18n, tenant configs
- Future tenant repos: thin layers that clone starter and replace tenant config
