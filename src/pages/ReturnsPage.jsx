import { useState } from "react";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import { isOverdue } from "../utils/helpers";

export default function ReturnsPage({ books, members, transactions, onReturn }) {
  const [search, setSearch] = useState("");

  const active = transactions.filter(t => t.status === "Borrowed");

  const list = active.filter(t => {
    const book   = books.find(b => b.id === t.bookId);
    const member = members.find(m => m.id === t.memberId);
    return (book?.title + member?.fname + member?.lname)
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="los-page-header">
        <div>
          <div className="los-page-title">Process Returns</div>
          <div className="los-page-subtitle">Mark borrowed books as returned</div>
        </div>
      </div>

      <div className="los-table-wrap">
        <div className="los-table-toolbar">
          <input
            className="los-search-input"
            placeholder="Search borrowed books…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <table className="los-table">
          <thead>
            <tr>
              <th>Book</th><th>Member</th><th>Borrowed</th>
              <th>Due Date</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={6}><EmptyState icon="↩" text="No active borrows" /></td>
              </tr>
            ) : list.map(t => {
              const book   = books.find(b => b.id === t.bookId);
              const member = members.find(m => m.id === t.memberId);
              const over   = isOverdue(t.due);
              return (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{book?.title || "—"}</td>
                  <td>{member ? `${member.fname} ${member.lname}` : "—"}</td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>{t.borrowed}</td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>{t.due}</td>
                  <td><Badge type={over ? "Overdue" : "Borrowed"} /></td>
                  <td>
                    <button
                      className="los-btn los-btn-primary los-btn-sm"
                      onClick={() => onReturn(t.id)}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
