import { NAV_ITEMS } from "../data/initialData";
import { isOverdue } from "../utils/helpers";

export default function Sidebar({ currentPage, onNavigate, books, members, transactions }) {
  const borrowed = books.filter(b => b.status === "Borrowed").length;
  const overdue  = transactions.filter(t => t.status === "Borrowed" && isOverdue(t.due)).length;

  return (
    <aside className="los-sidebar">
      {NAV_ITEMS.map(item => (
        <div key={item.id}>
          {item.section && (
            <div className="los-sidebar-label">{item.section}</div>
          )}
          <div
            className={`los-nav-item${currentPage === item.id ? " active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="los-nav-icon">{item.icon}</span>
            {item.label}
          </div>
        </div>
      ))}

      <div className="los-stats-mini">
        <div className="los-stats-mini-title">Quick Stats</div>
        {[
          { label: "Total Books", val: books.length    },
          { label: "Borrowed",    val: borrowed         },
          { label: "Members",     val: members.length   },
          { label: "Overdue",     val: overdue          },
        ].map(s => (
          <div key={s.label} className="los-stats-mini-row">
            <span className="los-stats-mini-label">{s.label}</span>
            <span className="los-stats-mini-val">{s.val}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
