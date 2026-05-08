import { useState } from "react";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import { isOverdue } from "../utils/helpers";

export default function HistoryPage({ books, members, transactions }) {
  const [search, setSearch] = useState("");

  const list = [...transactions]
    .sort((a, b) => b.id - a.id)
    .filter(t => {
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
          <div className="los-page-title">Transaction History</div>
          <div className="los-page-subtitle">Complete borrow & return log</div>
        </div>
      </div>

      <div className="los-table-wrap">
        <div className="los-table-toolbar">
          <input
            className="los-search-input"
            placeholder="Search history…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <table className="los-table">
          <thead>
            <tr>
              <th>Book</th><th>Member</th><th>Borrowed</th>
              <th>Due</th><th>Returned</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={6}><EmptyState icon="≡" text="No records found" /></td>
              </tr>
            ) : list.map(t => {
              const book   = books.find(b => b.id === t.bookId);
              const member = members.find(m => m.id === t.memberId);
              const over   = t.status === "Borrowed" && isOverdue(t.due);
              const badge  = t.status === "Returned" ? "Returned" : over ? "Overdue" : "Borrowed";
              return (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{book?.title || "—"}</td>
                  <td>{member ? `${member.fname} ${member.lname}` : "—"}</td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>{t.borrowed}</td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>{t.due}</td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>{t.returned || "—"}</td>
                  <td><Badge type={badge} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
