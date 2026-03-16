# @system Module Extraction Plan

> **Task #11981** — Extract common product features into new @system modules
> **Author:** Frederico (via factory-7)
> **Date:** 2026-03-14
> **Status:** Analysis complete, ready for implementation

---

## Executive Summary

Analysis of 17 products and the product template reveals **9 feature modules** currently in `@custom` that are duplicated across nearly every product. These should be promoted to `@system` to eliminate redundancy and accelerate new product development.

**Estimated savings:** Each new product currently requires rebuilding these features from scratch (or copy-pasting from template @custom). Moving to @system means they work out-of-the-box.

---

## Current State

### What's already @system (good)
- Authentication (email/password, OAuth, JWT sessions, TOTP)
- User management (UserRepo, sessions, refresh tokens)
- Subscriptions & payments (Stripe, Polar)
- Teams & collaboration (teams schema, repos, API)
- API keys (ApiKeyRepo, API routes)
- Storage (StorageAdapter, file uploads API)
- Search (SearchAdapter)
- Rate limiting, CSRF, error tracking middleware
- Dashboard layout components (Sidebar, Header, Card, Table, etc.)
- Onboarding wizard
- Admin panel

### What's in @custom but used by ALL products (should be @system)

| Module | @custom Files | Products Using | Priority |
|--------|--------------|----------------|----------|
| **Blog/CMS** | BlogPostRepo, blog API, blog schema, BlogAdminPage | blogkit, letterflow, linkforge, waitlistkit + all template clones | HIGH |
| **Brands/White-label** | BrandRepo, brands API, brands schema, BrandSettingsPage | All products (every SaaS needs branding) | HIGH |
| **Pricing Plans** | PricingPlanRepo, pricing API, pricing schema, PricingPlansPage | All products | HIGH |
| **Collaborators** | CollaboratorRepo, collaborators API, collaborators schema, CollaboratorsPage | All products with multi-user | HIGH |
| **Audit Logs** | AuditLogRepo, audit-logs API, audit_logs schema | All products (compliance requirement) | HIGH |
| **Email Logs** | EmailLogRepo, email-logs API, email_logs schema, EmailTrackingPage | All products that send email | MEDIUM |
| **Error Events** | ErrorEventRepo, errors API, error_events schema, ErrorTrackingPage | All products | MEDIUM |
| **AI Chatbase** | ChatbaseRepo, chatbase API, chatbase schema, ChatbasePage | Products with AI chat support | MEDIUM |
| **Page Editor** | PageEditorPage, pages API, pages schema | Products with CMS/landing builder | LOW |

---

## Proposed New @system Modules

### 1. `@system/brands` — Brand & White-Label Settings
**Why:** Every SaaS product needs brand customization (logo, colors, name). Currently rebuilt per-product.

**Files to promote:**
- `server/src/db/repos/@custom/BrandRepo.js` → `@system/BrandRepo.js`
- `server/src/db/schemas/@custom/brands.sql` → `@system/brands.sql`
- `server/src/db/migrations/@custom/002_brands.js` → `@system/XXX_brands.js`
- `server/src/api/@custom/brands/index.js` → `@system/brands/index.js`
- `server/src/lib/@custom/Validation/schemas/brands.js` → `@system/Validation/schemas/@system/brands.js`
- `client/src/app/pages/app/@custom/BrandSettingsPage.jsx` → `@system/BrandSettingsPage.tsx`

**Config:** `template.config.js` → `features.brands: true/false`

---

### 2. `@system/pricing` — Pricing Plans & Tiers
**Why:** Every SaaS has pricing tiers. This is universal.

**Files to promote:**
- `server/src/db/repos/@custom/PricingPlanRepo.js` → `@system/PricingPlanRepo.js`
- `server/src/db/schemas/@custom/pricing_plans.sql` → `@system/pricing_plans.sql`
- `server/src/db/migrations/@custom/004_pricing_plans.js` → `@system/XXX_pricing_plans.js`
- `server/src/api/@custom/pricing/index.js` → `@system/pricing/index.js`
- `client/src/app/pages/app/@custom/PricingPlansPage.tsx` → `@system/PricingPlansPage.tsx`

**Config:** `features.pricing: true/false`

---

### 3. `@system/collaborators` — Multi-User Collaboration
**Why:** Team/collaborator invite flows are identical across products.

**Files to promote:**
- `server/src/db/repos/@custom/CollaboratorRepo.js` → `@system/CollaboratorRepo.js`
- `server/src/db/schemas/@custom/collaborators.sql` → `@system/collaborators.sql`
- `server/src/db/schemas/@custom/invitation_tokens.sql` → `@system/invitation_tokens.sql`
- `server/src/db/migrations/@custom/002_collaborators.js` → `@system/XXX_collaborators.js`
- `server/src/db/migrations/@custom/003_invitation_tokens.js` → `@system/XXX_invitation_tokens.js`
- `server/src/api/@custom/collaborators/index.js` → `@system/collaborators/index.js`
- `server/src/lib/@custom/Validation/schemas/collaborators.js` → `@system/Validation/schemas/@system/collaborators.js`
- `client/src/app/pages/app/@custom/CollaboratorsPage.jsx` → `@system/CollaboratorsPage.tsx`
- `server/test/unit/@custom/collaborators-idor.test.js` → `@system/collaborators-idor.test.js`

**Config:** `features.collaborators: true/false`

---

### 4. `@system/audit-logs` — Audit Trail
**Why:** Every SaaS needs an audit trail for compliance. Already in DB @system schema but API/repo still @custom.

**Files to promote:**
- `server/src/db/repos/@custom/AuditLogRepo.js` → `@system/AuditLogRepo.js`
- `server/src/api/@custom/audit-logs/index.js` → `@system/audit-logs/index.js`
- `server/src/db/migrations/@custom/009_audit_logs.js` → (already in @system schema)

**Config:** `features.auditLogs: true/false`

---

### 5. `@system/email-logs` — Email Tracking & Logs
**Why:** All products send transactional email; tracking delivery is universal.

**Files to promote:**
- `server/src/db/repos/@custom/EmailLogRepo.js` → `@system/EmailLogRepo.js`
- `server/src/db/schemas/@custom/email_logs.sql` → `@system/email_logs.sql`
- `server/src/db/migrations/@custom/004_email_logs.js` → `@system/XXX_email_logs.js`
- `server/src/api/@custom/email-logs/index.js` → `@system/email-logs/index.js`
- `client/src/app/pages/app/@custom/EmailTrackingPage.jsx` → `@system/EmailTrackingPage.tsx`
- `client/src/app/pages/app/@custom/EmailPreviewPage.jsx` → `@system/EmailPreviewPage.tsx`

**Config:** `features.emailLogs: true/false`

---

### 6. `@system/error-tracking` — Error Event Collection
**Why:** Client-side error tracking is built into the embed script pattern; backend collection is universal.

**Files to promote:**
- `server/src/db/repos/@custom/ErrorEventRepo.js` → `@system/ErrorEventRepo.js`
- `server/src/db/schemas/@custom/error_events.sql` → `@system/error_events.sql`
- `server/src/db/migrations/@custom/001_error_events.js` → `@system/XXX_error_events.js`
- `server/src/api/@custom/errors/index.js` → `@system/errors/index.js`
- `client/src/app/pages/app/@custom/ErrorTrackingPage.jsx` → `@system/ErrorTrackingPage.tsx`

**Config:** `features.errorTracking: true/false`

---

### 7. `@system/blog` — Blog / Content Management
**Why:** Most SaaS products have a blog or content section. Currently one of the most duplicated modules.

**Files to promote:**
- `server/src/db/repos/@custom/BlogPostRepo.js` → `@system/BlogPostRepo.js`
- `server/src/db/schemas/@custom/blog_posts.sql` → `@system/blog_posts.sql`
- `server/src/db/migrations/@custom/012_blog_posts.js` → `@system/XXX_blog_posts.js`
- `server/src/api/@custom/blog/index.js` → `@system/blog/index.js`
- `server/src/lib/@custom/Validation/schemas/blog.js` → `@system/Validation/schemas/@system/blog.js`
- `client/src/app/pages/app/@custom/BlogAdminPage.tsx` → `@system/BlogAdminPage.tsx`

**Config:** `features.blog: true/false`

---

### 8. `@system/chatbase` — AI Knowledge Base Chat
**Why:** AI chat support is becoming a standard SaaS feature.

**Files to promote:**
- `server/src/db/repos/@custom/ChatbaseRepo.js` → `@system/ChatbaseRepo.js`
- `server/src/db/schemas/@custom/chatbase_settings.sql` → `@system/chatbase_settings.sql`
- `server/src/db/migrations/@custom/006_chatbase.js` → `@system/XXX_chatbase.js`
- `server/src/api/@custom/chatbase/index.js` → `@system/chatbase/index.js`
- `client/src/app/pages/app/@custom/ChatbasePage.jsx` → `@system/ChatbasePage.tsx`

**Config:** `features.chatbase: true/false`

---

### 9. `@system/file-uploads` — File Upload Tracking
**Why:** Storage is @system but upload tracking/management is @custom. Should be unified.

**Files to promote:**
- `server/src/db/repos/@custom/FileUploadRepo.js` → `@system/FileUploadRepo.js`
- `server/src/db/schemas/@custom/file_uploads.sql` → `@system/file_uploads.sql`
- `server/src/db/migrations/@custom/007_file_uploads.js` → `@system/XXX_file_uploads.js`
- `server/src/lib/@custom/Validation/schemas/storage.js` → `@system/Validation/schemas/@system/storage.js`

**Config:** `features.fileUploads: true/false`

---

## Additional @custom → @system candidates (supporting infrastructure)

| Item | Current Location | Reason |
|------|-----------------|--------|
| `permissions.sql` schema | `@custom/permissions.sql` | Universal RBAC | 
| `full_text_search.sql` | `@custom/full_text_search.sql` | Used by search @system adapter |
| `soft_delete` migration | `@custom/009_soft_delete.js` | Universal pattern |
| `performance_indexes` migration | `@custom/008_performance_indexes.js` | Universal pattern |
| `notification_prefs` migrations | `@custom/010, 013` | Goes with @system Notification |
| `scheduled_task_runs` migration | `@custom/011` | Goes with @system scheduler |
| `usage_tracking` migration | `@custom/017` | Goes with @system usage API |

---

## Implementation Plan

### Phase 1 — High Priority (Weeks 1-2)
1. **Brands** — Move to @system, add feature flag
2. **Pricing** — Move to @system, add feature flag
3. **Collaborators** — Move to @system, add feature flag
4. **Audit Logs** — Move to @system (already partially there)

### Phase 2 — Medium Priority (Weeks 3-4)
5. **Email Logs** — Move to @system
6. **Error Tracking** — Move to @system
7. **File Uploads** — Merge with existing @system storage

### Phase 3 — Feature Modules (Weeks 5-6)
8. **Blog/CMS** — Move to @system with feature flag
9. **Chatbase** — Move to @system with feature flag

### For each module:
1. Add feature flag to `template.config.js`
2. Move files from `@custom` to `@system`
3. Update `@system/routes/index.js` to conditionally mount routes
4. Update migration runner to include new @system migrations
5. Update `template-manifest.json` with new @system feature entries
6. Test with feature enabled and disabled
7. Update existing products' `@custom` to remove duplicated code

---

## Feature Flag Pattern

```javascript
// template.config.js
module.exports = {
  features: {
    // Always-on @system features
    auth: true,
    teams: true,
    subscriptions: true,
    apiKeys: true,
    
    // Opt-in @system features (new)
    brands: true,        // Brand/white-label settings
    pricing: true,       // Pricing plan management
    collaborators: true, // Multi-user collaboration
    auditLogs: true,     // Audit trail
    emailLogs: false,    // Email delivery tracking
    errorTracking: false, // Client error collection
    blog: false,         // Blog/CMS module
    chatbase: false,     // AI chat support
    fileUploads: true,   // File upload management
  }
};
```

---

## Impact Assessment

- **17 products** will benefit from these extractions
- **~45 files** moving from @custom to @system
- **~9 DB migrations** to be promoted
- **~14 API routes** becoming standard
- **Estimated development time per new product saved:** 2-3 days of feature duplication eliminated

---

## Follow-up Tasks to Create

1. `[frederico] Implement feature flag system in template.config.js`
2. `[frederico] Promote brands module to @system`
3. `[frederico] Promote pricing module to @system`
4. `[frederico] Promote collaborators module to @system`
5. `[frederico] Promote audit-logs module to @system`
6. `[frederico] Promote email-logs module to @system`
7. `[frederico] Promote error-tracking module to @system`
8. `[frederico] Promote blog module to @system`
9. `[frederico] Promote chatbase module to @system`
10. `[frederico] Merge file-uploads into @system storage`
11. `[frederico] Update template-manifest.json for all new @system modules`
12. `[frederico] Update migration runner for conditional @system migrations`
