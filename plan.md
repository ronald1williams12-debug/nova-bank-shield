# NovaTrust Bank Implementation Plan

Build a world-class digital banking platform "NovaTrust Bank" featuring a premium, secure, and elegant design. The application will include a high-end landing page, a functional customer dashboard, an admin management portal, and simulated banking data.

## Scope & Non-Goals
### Scope
- **Branding:** Deep Navy Blue, White, and Gold palette with glassmorphism and smooth animations.
- **Homepage:** Hero section, services, testimonials, security badges, and professional footer.
- **Customer Dashboard:** Balance tracking, transaction history, fund transfers, virtual debit cards, loan system, savings goals, and investment tracking.
- **Admin Dashboard:** KYC approval, account management (freeze/credit/debit), loan management, and audit logs.
- **Security Features:** Simulated 2FA, session management, and fraud alerts.
- **Data:** Generation of 1,000 demo customer accounts and realistic transaction histories (mocked in-memory or via local storage).
- **KYC:** Multi-step upload simulation.

### Non-Goals
- **Real Backend/Database:** As per session constraints, no Supabase or server-side DB. All persistence will use `localStorage` or temporary in-memory state.
- **Real Payment Processing:** No actual banking APIs or payment gateway integrations.
- **Real File Storage:** "Uploaded" files for KYC will be simulated (base64 or local object URLs).
- **Live Chat:** AI assistant and 2/7 chat will be simulated UI components.

## Assumptions & Open Questions
- **Assumption:** The Nigerian Naira (₦) is the primary currency based on the request requirements.
- **Assumption:** Lucide-react will be used for the "shield and modern financial symbol" logo.
- **Question:** Should the "1,000 customer accounts" be pre-generated at build time or generated on-the-fly via a utility function? (Plan: Utility function to generate data and save to `localStorage` on first load).

## Affected Areas
- **Frontend UI:** New components for glassmorphism cards, premium typography, and banking-specific UI (cards, transaction lists).
- **State Management:** React state/context for managing the mock "database" of customers and transactions.
- **Routing:** Complex routing for Public, Customer, and Admin portals.
- **Mock Data Engine:** A robust generator utility for the requested 1,000 accounts and 100k+ transactions.

## Phases

### Phase 1: Branding & Foundation (frontend_engineer)
- Define the premium theme in `tailwind.config.ts` or CSS variables (Navy, Gold, White).
- Set up global typography and glassmorphism utility classes.
- Create shared layout components (PublicLayout, DashboardLayout, AdminLayout).
- Build the "NovaTrust" Logo component (Shield + Symbol).

### Phase 2: Mock Data & State Engine (frontend_engineer)
- Create `src/lib/mock-data-generator.ts` to produce the 1,000 customers and transactions.
- Implement a `useBankStore` (Zustand or Context) to manage local state, persisting to `localStorage`.
- Implement basic Auth simulation (Login/Logout for both User and Admin).

### Phase 3: Public Homepage (frontend_engineer)
- Build the hero section with professional banking imagery (using placeholders or themed SVGs).
- Implement banking services overview, testimonials, and financial counters.
- Create the "Open Account" and "Internet Banking" entry points.
- Build the legal footer and security trust badges.

### Phase 4: Customer Dashboard & Banking Features (frontend_engineer)
- **Overview:** Balance display, account info, and quick actions.
- **Transfers:** Internal/External/Scheduled UI with confirmation steps and receipt generation.
- **Virtual Card:** Interactive card component with "freeze" toggle and spending analytics.
- **Loans & Savings:** Loan calculator and savings progress trackers.
- **Investments:** Portfolio visualization and profit calculation cards.
- **KYC:** Multi-step form for ID, Selfie, and Bill uploads.

### Phase 5: Admin Dashboard (frontend_engineer)
- Secure admin login screen.
- Customer management table with search and filter.
- KYC review workflow (Approve/Reject).
- Account control (Credit/Debit/Freeze) UI.
- Audit logs and report generation view.

### Phase 6: Mobile & Security Polish (quick_fix_engineer)
- Responsive audit for mobile-app style dashboard.
- Add "Biometric" simulated login for mobile views.
- Implement session timeouts and simulated fraud alerts.
- Final CSS transitions and premium animation effects (Framer Motion).

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Foundation, Data Engine, and Public UI
2. frontend_engineer — Customer & Admin Dashboard Features
3. quick_fix_engineer — Mobile polish, security simulations, and animations

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3
- **Scope:** Establish the visual identity (Navy/Gold/Glassmorphism). Create the data generator for 1,000 accounts. Build the full public landing page and auth shells.
- **Files:** `src/theme.css`, `src/lib/mock-data-generator.ts`, `src/components/landing/*`, `src/App.tsx`
- **Depends on:** none
- **Acceptance criteria:** App loads with a premium landing page; mock data is generated and visible in console/storage; login/logout works.

### 2. frontend_engineer
- **Phases:** 4, 5
- **Scope:** Build the functional banking cores. Customer transfers (internal/external), Virtual Card UI, Loan System, and the Admin portal for KYC/Account management.
- **Files:** `src/components/dashboard/*`, `src/components/admin/*`, `src/hooks/use-bank-actions.ts`
- **Depends on:** Phase 1-3
- **Acceptance criteria:** Users can "transfer" funds (updating local state); virtual cards can be frozen; Admins can see the 1,000 users and "approve" KYC.

### 3. quick_fix_engineer
- **Phases:** 6
- **Scope:** Refine responsiveness for the mobile dashboard. Add smooth Framer Motion transitions. Add simulated "push notifications" and "security alerts". Fix any UI inconsistencies.
- **Files:** `src/components/ui/*`, `src/index.css`
- **Depends on:** Phase 4-5
- **Acceptance criteria:** Mobile view feels like a native banking app; transitions are "world-class" and smooth; security alerts pop up as expected.
