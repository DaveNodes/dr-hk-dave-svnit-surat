# Dr. HK Dave — SVNIT Surat

## Current State
Academic portfolio site with 5 pages (Home, Research, Publications, Students, Connect). Backend stores publications, students, research interests, professor profile, and contact info. No authentication or admin features.

## Requested Changes (Diff)

### Add
- Admin login system (username: admin, password: admin) using the authorization component
- Maintenance mode toggle: when enabled, all public pages show a "Site under maintenance" screen instead of content
- Admin dashboard/panel at /admin with the following options:
  - Maintenance mode toggle (on/off)
  - Edit professor profile (name, title, department, bio)
  - Add/remove research interests
  - Add/remove publications
  - Add/remove students (current and alumni)
  - Edit contact info (email, address)
- Login page at /login
- Admin route guard: /admin only accessible when logged in
- Public site shows maintenance overlay when maintenance mode is active

### Modify
- Backend: add maintenanceMode flag, updateProfessorProfile, updateContactInfo, removePublication, removeStudent, removeResearchInterest, setMaintenanceMode, getMaintenanceMode endpoints
- Frontend App.tsx: add /login and /admin routes, wrap public routes with maintenance check

### Remove
- Nothing removed

## Implementation Plan
1. Regenerate backend with new admin endpoints: maintenance mode, CRUD for all content, profile/contact update
2. Update frontend: add LoginPage, AdminDashboard with tabs for each section, MaintenancePage
3. Wrap public layout with maintenance mode check from backend
4. Admin routes protected by auth state
