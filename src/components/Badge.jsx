export default function Badge({ type, children }) {
  const map = {
    Available: "los-badge los-badge-available",
    Borrowed:  "los-badge los-badge-borrowed",
    Overdue:   "los-badge los-badge-overdue",
    Returned:  "los-badge los-badge-returned",
  };
  return (
    <span className={map[type] || "los-badge"}>
      {children || type}
    </span>
  );
}
