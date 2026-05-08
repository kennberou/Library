export default function Topbar({ user, onLogout }) {
  return (
    <div className="los-topbar">
      <div className="los-topbar-brand">
        Library<span>MS</span>
      </div>
      <div className="los-topbar-right">
        <div className="los-topbar-user">
          {user.username} ({user.role})
        </div>
        <button className="los-btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
