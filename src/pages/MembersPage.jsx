import { useState } from "react";
import EmptyState from "../components/EmptyState";
import { getInitials } from "../utils/helpers";

export default function MembersPage({ members, transactions, onAdd, onDelete }) {
  const [search, setSearch] = useState("");

  const list = members.filter(m =>
    (m.fname + " " + m.lname + m.email + m.type)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="los-page-header">
        <div>
          <div className="los-page-title">Members</div>
          <div className="los-page-subtitle">Registered library members</div>
        </div>
        <button className="los-btn los-btn-primary" onClick={onAdd}>
          + Add Member
        </button>
      </div>

      <input
        className="los-search-input"
        style={{ marginBottom: "1.25rem", maxWidth: 360, display: "block" }}
        placeholder="Search members…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {list.length === 0 ? (
        <EmptyState icon="◉" text="No members found" />
      ) : (
        <div className="los-member-cards">
          {list.map(m => {
            const active = transactions.filter(
              t => t.memberId === m.id && t.status === "Borrowed"
            ).length;

            return (
              <div key={m.id} className="los-member-card">
                <div className="los-member-avatar">
                  {getInitials(m.fname, m.lname)}
                </div>
                <div className="los-member-name">{m.fname} {m.lname}</div>
                <div className="los-member-email">{m.email}</div>
                <div className="los-member-meta">
                  <span className="los-badge los-badge-available">{m.type}</span>
                  {active > 0 && (
                    <span className="los-badge los-badge-borrowed">
                      {active} borrowed
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: "0.75rem" }}>
                  <button
                    className="los-btn los-btn-danger los-btn-sm"
                    onClick={() => onDelete(m.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
