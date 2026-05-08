export const USERS = [
  { username: "admin", password: "admin123", role: "Administrator" },
];

export const INIT_BOOKS = [
  { id: 1, title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", genre: "Magical Realism",  isbn: "978-0-06-088328-7", year: 1967, status: "Available", desc: "" },
  { id: 2, title: "To Kill a Mockingbird",          author: "Harper Lee",              genre: "Classic Fiction",  isbn: "978-0-06-112008-4", year: 1960, status: "Available", desc: "" },
  { id: 3, title: "The Great Gatsby",                author: "F. Scott Fitzgerald",    genre: "Literary Fiction", isbn: "978-0-7432-7356-5", year: 1925, status: "Borrowed",  desc: "" },
  { id: 4, title: "Sapiens",                         author: "Yuval Noah Harari",      genre: "Non-Fiction",      isbn: "978-0-06-231609-7", year: 2011, status: "Available", desc: "" },
  { id: 5, title: "The Alchemist",                   author: "Paulo Coelho",           genre: "Adventure",        isbn: "978-0-06-112241-5", year: 1988, status: "Available", desc: "" },
  { id: 6, title: "Atomic Habits",                   author: "James Clear",            genre: "Self-Help",        isbn: "978-0-7352-1129-2", year: 2018, status: "Borrowed",  desc: "" },
];

export const INIT_MEMBERS = [
  { id: 1, fname: "Maria", lname: "Santos", email: "msantos@email.com", phone: "+63 912 345 6789", type: "Student", joined: "2024-01-15" },
  { id: 2, fname: "Jose",  lname: "Reyes",  email: "jreyes@email.com",  phone: "+63 917 654 3210", type: "Faculty", joined: "2023-09-01" },
  { id: 3, fname: "Ana",   lname: "Cruz",   email: "acruz@email.com",   phone: "+63 918 111 2222", type: "Student", joined: "2024-03-10" },
];

export const INIT_TRANSACTIONS = [
  { id: 1, bookId: 3, memberId: 1, borrowed: "2025-03-20", due: "2025-04-03", returned: null, status: "Borrowed" },
  { id: 2, bookId: 6, memberId: 2, borrowed: "2025-03-25", due: "2025-04-08", returned: null, status: "Borrowed" },
  { id: 3, bookId: 2, memberId: 3, borrowed: "2025-02-10", due: "2025-02-24", returned: "2025-02-22", status: "Returned" },
];

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",   icon: "◈", section: null         },
  { id: "books",     label: "Books",       icon: "◫", section: "Catalog"    },
  { id: "members",   label: "Members",     icon: "◉", section: null         },
  { id: "borrow",    label: "Borrow Book", icon: "↗", section: "Circulation"},
  { id: "returns",   label: "Returns",     icon: "↩", section: null         },
  { id: "history",   label: "History",     icon: "≡", section: null         },
];
