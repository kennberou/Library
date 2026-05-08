import { useState } from "react";
import { defaultDue } from "../utils/helpers";

export default function BorrowPage({ books, members, onBorrow }) {
  const [memberId, setMemberId] = useState("");
  const [bookId,   setBookId]   = useState("");
  const [due,      setDue]      = useState(defaultDue());

  const availableBooks = books.filter(b => b.status === "Available");

  function handleBorrow() {
    if (!memberId || !bookId || !due) {
      alert("Please fill all fields.");
      return;
    }
    onBorrow(parseInt(memberId), parseInt(bookId), due);
    setMemberId("");
    setBookId("");
    setDue(defaultDue());
  }

  return (
    <div>
      <div className="los-page-header">
        <div>
          <div className="los-page-title">Borrow a Book</div>
          <div className="los-page-subtitle">Issue a book to a member</div>
        </div>
      </div>

      <div className="los-table-wrap" style={{ maxWidth: 560 }}>
        <div style={{ padding: "1.75rem 2rem" }}>
          <div className="los-modal-grid full" style={{ gap: "1.25rem" }}>

            <div className="los-field-group">
              <label>Select Member</label>
              <select value={memberId} onChange={e => setMemberId(e.target.value)}>
                <option value="">— choose —</option>
                {members.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.fname} {m.lname}
                  </option>
                ))}
              </select>
            </div>

            <div className="los-field-group">
              <label>Select Book (available only)</label>
              <select value={bookId} onChange={e => setBookId(e.target.value)}>
                <option value="">— choose —</option>
                {availableBooks.map(b => (
                  <option key={b.id} value={b.id}>{b.title}</option>
                ))}
              </select>
            </div>

            <div className="los-field-group">
              <label>Due Date</label>
              <input
                type="date"
                value={due}
                onChange={e => setDue(e.target.value)}
              />
            </div>

            <button
              className="los-btn los-btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "0.75rem" }}
              onClick={handleBorrow}
            >
              Issue Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
