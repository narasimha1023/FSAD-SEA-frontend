export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">🎓 EduActivities</div>
      <div className="nav-right">
        <span className="nav-user">
          {user.role === "admin" ? "👑" : "👤"} {user.name}
          <span className={`role-badge ${user.role}`}>{user.role}</span>
        </span>
        <button className="btn btn-outline btn-sm" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
