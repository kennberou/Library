export default function EmptyState({ icon, text }) {
  return (
    <div className="los-empty">
      <div className="eicon">{icon}</div>
      <p>{text}</p>
    </div>
  );
}
