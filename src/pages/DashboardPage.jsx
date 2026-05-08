import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import { isOverdue } from "../utils/helpers";

export default function DashboardPage({ books, members, transactions }) {
  const total     = books.length;
  const available = books.filter(b => b.status === "Available").length;
  const borrowed  = books.filter(b => b.status === "Borrowed").length;
  const overdue   = transactions.filter(t => t.status === "Borrowed" && isOverdue(t.due)).length;

  const dateStr = new Date().toLocaleDateString("en-PH", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const recent = [...transactions].sort((a, b) => b.id - a.id).slice(0, 8);

  const stats = [
    { label: "Total Books", value: total,          desc: "in catalog",      color: "amber"  },
    { label: "Available",   value: available,       desc: "ready to borrow", color: "forest" },
    { label: "Borrowed",    value: borrowed,         desc: "currently out",   color: "rust"   },
    { label: "Members",     value: members.length,  desc: "registered",      color: "slate"  },
  ];

  return (
    <div>
      <div className="los-page-header">
        <div>
          <div className="los-page-title">Dashboard</div>
          <div className="los-page-subtitle">{dateStr}</div>
        </div>
      </div>

      <div className="los-stats-grid">
        {stats.map(s => (
          <div key={s.label} className={`los-stat-card ${s.color}`}>
            <div className="los-stat-label">{s.label}</div>
            <div className="los-stat-value">{s.value}</div>
            <div className="los-stat-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="los-table-wrap">
        <div className="los-table-toolbar" style={{ justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--slate)" }}>
            Recent Activity
          </span>
        </div>
        <table className="los-table">
          <thead>
            <tr>
              <th>Book</th><th>Member</th><th>Action</th><th>Date</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState icon="◈" text="No activity yet" />
                </td>
              </tr>
            ) : recent.map(t => {
              const book   = books.find(b => b.id === t.bookId);
              const member = members.find(m => m.id === t.memberId);
              const over   = t.status === "Borrowed" && isOverdue(t.due);
              const badge  = t.status === "Returned" ? "Returned" : over ? "Overdue" : "Borrowed";
              return (
                <tr key={t.id}>
                  <td>{book?.title || "—"}</td>
                  <td>{member ? `${member.fname} ${member.lname}` : "—"}</td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>
                    {t.status === "Returned" ? "↩ Return" : "↗ Borrow"}
                  </td>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>
                    {t.borrowed}
                  </td>
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
