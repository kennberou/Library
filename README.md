# LibraryOS — React Project

A library management system built with React + Vite.

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

**Default login:** username `admin` / password `admin123`

---

## Project Structure

```
libraryos/
├── index.html               # Vite HTML entry point
├── vite.config.js           # Vite configuration
├── package.json
└── src/
    ├── main.jsx             # React DOM entry point
    ├── App.jsx              # Root component — holds all state & handlers
    │
    ├── data/
    │   └── initialData.js   # Seed data: books, members, transactions, nav items
    │
    ├── utils/
    │   └── helpers.js       # today(), defaultDue(), isOverdue(), getInitials()
    │
    ├── styles/
    │   └── global.css       # All CSS — variables, layout, components, utilities
    │
    ├── components/          # Reusable UI components
    │   ├── Badge.jsx        # Status badge (Available / Borrowed / Overdue / Returned)
    │   ├── EmptyState.jsx   # Empty table / list placeholder
    │   ├── Toast.jsx        # Bottom-right notification
    │   ├── Topbar.jsx       # Top navigation bar with logout
    │   ├── Sidebar.jsx      # Left nav with quick stats
    │   ├── BookModal.jsx    # Add / Edit book form modal
    │   └── MemberModal.jsx  # Add member form modal
    │
    └── pages/               # One file per page/route
        ├── LoginPage.jsx    # Login screen
        ├── DashboardPage.jsx
        ├── BooksPage.jsx
        ├── MembersPage.jsx
        ├── BorrowPage.jsx
        ├── ReturnsPage.jsx
        └── HistoryPage.jsx
```

---

## Architecture Notes

- **All state lives in `App.jsx`** — books, members, transactions, auth, modals, toast.
- **Pages are stateless** (except local search/filter UI state). They receive data and handler props.
- **Modals** are separate components that manage their own form state internally.
- **No database** — all data is in-memory (resets on refresh). Replace `useState` with `localStorage` or an API for persistence.
