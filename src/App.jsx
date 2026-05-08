import { useState } from "react";

import "./styles/global.css";

import { INIT_BOOKS, INIT_MEMBERS, INIT_TRANSACTIONS } from "./data/initialData";
import { today } from "./utils/helpers";

import LoginPage    from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BooksPage    from "./pages/BooksPage";
import MembersPage  from "./pages/MembersPage";
import BorrowPage   from "./pages/BorrowPage";
import ReturnsPage  from "./pages/ReturnsPage";
import HistoryPage  from "./pages/HistoryPage";

import Topbar      from "./components/Topbar";
import Sidebar     from "./components/Sidebar";
import BookModal   from "./components/BookModal";
import MemberModal from "./components/MemberModal";
import Toast       from "./components/Toast";

export default function App() {
  // ── Auth ──
  const [currentUser, setCurrentUser] = useState(null);

  // ── Navigation ──
  const [currentPage, setCurrentPage] = useState("dashboard");

  // ── Data ──
  const [books,        setBooks]        = useState(INIT_BOOKS);
  const [members,      setMembers]      = useState(INIT_MEMBERS);
  const [transactions, setTransactions] = useState(INIT_TRANSACTIONS);
  const [nextBookId,   setNextBookId]   = useState(7);
  const [nextMemberId, setNextMemberId] = useState(4);
  const [nextTxId,     setNextTxId]     = useState(4);

  // ── Modal state ──
  const [bookModalOpen,   setBookModalOpen]   = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingBook,     setEditingBook]     = useState(null);

  // ── Toast ──
  const [toast, setToast] = useState({ msg: "", visible: false });

  function showToast(msg) {
    setToast({ msg, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }

  // ── Book handlers ──
  function handleAddBook()      { setEditingBook(null); setBookModalOpen(true); }
  function handleEditBook(book) { setEditingBook(book); setBookModalOpen(true); }

  function handleSaveBook(form) {
    if (editingBook) {
      setBooks(bs => bs.map(b => b.id === editingBook.id ? { ...b, ...form } : b));
      showToast("Book updated successfully.");
    } else {
      setBooks(bs => [...bs, { id: nextBookId, ...form, status: "Available" }]);
      setNextBookId(n => n + 1);
      showToast("Book added to catalog.");
    }
    setBookModalOpen(false);
  }

  function handleDeleteBook(id) {
    if (!confirm("Delete this book from the catalog?")) return;
    setBooks(bs => bs.filter(b => b.id !== id));
    showToast("Book deleted.");
  }

  // ── Member handlers ──
  function handleAddMember() { setMemberModalOpen(true); }

  function handleSaveMember(form) {
    setMembers(ms => [...ms, { id: nextMemberId, ...form, joined: today() }]);
    setNextMemberId(n => n + 1);
    setMemberModalOpen(false);
    showToast("Member registered.");
  }

  function handleDeleteMember(id) {
    const hasBorrowed = transactions.some(
      t => t.memberId === id && t.status === "Borrowed"
    );
    if (hasBorrowed) { showToast("Cannot remove member with active borrows."); return; }
    if (!confirm("Remove this member?")) return;
    setMembers(ms => ms.filter(m => m.id !== id));
    showToast("Member removed.");
  }

  // ── Borrow handler ──
  function handleBorrow(mId, bId, due) {
    const book = books.find(b => b.id === bId);
    setBooks(bs => bs.map(b => b.id === bId ? { ...b, status: "Borrowed" } : b));
    setTransactions(ts => [
      ...ts,
      { id: nextTxId, bookId: bId, memberId: mId, borrowed: today(), due, returned: null, status: "Borrowed" },
    ]);
    setNextTxId(n => n + 1);
    showToast(`"${book?.title}" issued successfully.`);
  }

  // ── Return handler ──
  function handleReturn(txId) {
    const tx   = transactions.find(t => t.id === txId);
    const book = books.find(b => b.id === tx?.bookId);
    setTransactions(ts =>
      ts.map(t => t.id === txId ? { ...t, status: "Returned", returned: today() } : t)
    );
    setBooks(bs =>
      bs.map(b => b.id === tx?.bookId ? { ...b, status: "Available" } : b)
    );
    showToast(`"${book?.title}" returned successfully.`);
  }

  // ── Render login ──
  if (!currentUser) {
    return <LoginPage onLogin={setCurrentUser} />;
  }

  // ── Render app ──
  return (
    <div>
      <Topbar user={currentUser} onLogout={() => setCurrentUser(null)} />

      <div className="los-main-layout">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          books={books}
          members={members}
          transactions={transactions}
        />

        <main className="los-content">
          {currentPage === "dashboard" && (
            <DashboardPage books={books} members={members} transactions={transactions} />
          )}
          {currentPage === "books" && (
            <BooksPage
              books={books}
              onAdd={handleAddBook}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
            />
          )}
          {currentPage === "members" && (
            <MembersPage
              members={members}
              transactions={transactions}
              onAdd={handleAddMember}
              onDelete={handleDeleteMember}
            />
          )}
          {currentPage === "borrow" && (
            <BorrowPage books={books} members={members} onBorrow={handleBorrow} />
          )}
          {currentPage === "returns" && (
            <ReturnsPage
              books={books}
              members={members}
              transactions={transactions}
              onReturn={handleReturn}
            />
          )}
          {currentPage === "history" && (
            <HistoryPage books={books} members={members} transactions={transactions} />
          )}
        </main>
      </div>

      <BookModal
        open={bookModalOpen}
        editing={editingBook}
        onSave={handleSaveBook}
        onClose={() => setBookModalOpen(false)}
      />
      <MemberModal
        open={memberModalOpen}
        onSave={handleSaveMember}
        onClose={() => setMemberModalOpen(false)}
      />

      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  );
}
