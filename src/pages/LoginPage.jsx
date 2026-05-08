import { useState } from "react";
import { USERS } from "../data/initialData";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(false);

  function handleLogin() {
    const user = USERS.find(
      u => u.username === username && u.password === password
    );
    if (!user) { setError(true); return; }
    setError(false);
    onLogin(user);
  }

  return (
    <div className="los-login-screen">
      <div className="los-login-card">
        <div className="los-login-logo">
          Library<span>MS</span>
        </div>
        <div className="los-login-tagline">Changing life bridge the future</div>

        <div className="los-login-hint">
          <strong>There's only one formula</strong><br />
          Username: <strong>admin</strong> &nbsp;|&nbsp; Password: <strong>admin123</strong>
        </div>

        <div className="los-form-group">
          <input
            type="text"
            placeholder="Enter Username:"
            value={username}
            autoComplete="username"
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        <div className="los-form-group">
          <input
            type="password"
            placeholder="Enter Password:"
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        {error && (
          <div className="los-login-error">Invalid username or password.</div>
        )}

        <button className="los-btn-login" onClick={handleLogin}>
          SIGN IN
        </button>
      </div>
    </div>
  );
}
