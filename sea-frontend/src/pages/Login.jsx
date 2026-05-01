import { useState } from "react";
import { users } from "../data";
import MFAVerify from "./MFAVerify";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [pendingUser, setPendingUser] = useState(null); // triggers MFA step

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) { setError(""); setPendingUser(user); }
    else setError("Invalid email or password. Please try again.");
  };

  const quickLogin = (u) => { setEmail(u.email); setPassword(u.password); setError(""); };

  const studentUsers = users.filter((u) => u.role === "student");
  const adminUser = users.find((u) => u.role === "admin");

  if (pendingUser) {
    return (
      <MFAVerify
        user={pendingUser}
        onVerified={onLogin}
        onBack={() => setPendingUser(null)}
      />
    );
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <span className="brand-icon">🎓</span>
          <h1>EduActivities</h1>
          <p>Student Extracurricular Management Platform</p>
        </div>
        <div className="login-features">
          <div className="feature-item"><span>🏃</span><div><strong>Join Activities</strong><p>Clubs, sports, academic groups</p></div></div>
          <div className="feature-item"><span>📅</span><div><strong>Track Events</strong><p>Register & get notified</p></div></div>
          <div className="feature-item"><span>📊</span><div><strong>Monitor Progress</strong><p>Track your participation</p></div></div>
          <div className="feature-item"><span>🔐</span><div><strong>Secure MFA Login</strong><p>Two-factor authentication for all users</p></div></div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Sign In</h2>
          <p className="login-subtitle">Step 1 of 2 — Enter your credentials</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="pw-wrap">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Enter your password" required />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>{showPw ? "🙈" : "👁️"}</button>
              </div>
            </div>
            {error && <p className="error-msg">⚠️ {error}</p>}
            <button type="submit" className="btn btn-primary btn-full">Continue to MFA →</button>
          </form>

          <div className="credentials-section">
            <p className="cred-title">Demo Credentials & MFA Codes</p>
            <div className="cred-table-wrap">
              <table className="cred-table">
                <thead>
                  <tr><th>Role</th><th>ID</th><th>Email</th><th>Password</th><th>MFA Code</th><th></th></tr>
                </thead>
                <tbody>
                  <tr className="admin-row">
                    <td><span className="role-badge admin">Admin</span></td>
                    <td><code>{adminUser.studentId}</code></td>
                    <td>{adminUser.email}</td>
                    <td><code>{adminUser.password}</code></td>
                    <td><code className="mfa-code-badge">{adminUser.mfaCode}</code></td>
                    <td><button className="btn btn-sm btn-primary" onClick={() => quickLogin(adminUser)}>Use</button></td>
                  </tr>
                  {studentUsers.map((u) => (
                    <tr key={u.id}>
                      <td><span className="role-badge student">Student</span></td>
                      <td><code>{u.studentId}</code></td>
                      <td>{u.email}</td>
                      <td><code>{u.password}</code></td>
                      <td><code className="mfa-code-badge">{u.mfaCode}</code></td>
                      <td><button className="btn btn-sm btn-outline" onClick={() => quickLogin(u)}>Use</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
