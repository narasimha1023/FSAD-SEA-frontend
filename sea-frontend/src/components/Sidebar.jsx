export default function Sidebar({ user, activePage, onNavigate, onLogout, collapsed, onToggle }) {
  const adminLinks = [
    { id: "overview",    label: "Overview",    icon: "📊" },
    { id: "activities",  label: "Activities",  icon: "🏃" },
    { id: "events",      label: "Events",      icon: "📅" },
    { id: "students",    label: "Students",    icon: "👥" },
    { id: "settings",    label: "Settings",    icon: "⚙️" },
  ];
  const studentLinks = [
    { id: "home",           label: "Home",           icon: "🏠" },
    { id: "discover",       label: "Discover",       icon: "🔍" },
    { id: "my-activities",  label: "My Activities",  icon: "⭐" },
    { id: "events",         label: "Events",         icon: "📅" },
    { id: "notifications",  label: "Notifications",  icon: "🔔" },
    { id: "profile",        label: "Profile",        icon: "👤" },
  ];

  const links = user.role === "admin" ? adminLinks : studentLinks;

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="brand-icon-sm">🎓</span>
          {!collapsed && <span className="brand-text">EduActivities</span>}
        </div>
        <button className="collapse-btn" onClick={onToggle}>{collapsed ? "→" : "←"}</button>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{user.name.charAt(0)}</div>
        {!collapsed && (
          <div className="user-info">
            <strong>{user.name}</strong>
            <span className={`role-badge ${user.role}`}>{user.role === "admin" ? "👑 Admin" : `🎓 ${user.studentId}`}</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <button
            key={link.id}
            className={`nav-link ${activePage === link.id ? "active" : ""}`}
            onClick={() => onNavigate(link.id)}
            title={collapsed ? link.label : ""}
          >
            <span className="nav-icon">{link.icon}</span>
            {!collapsed && <span className="nav-label">{link.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-link logout-btn" onClick={onLogout}>
          <span className="nav-icon">🚪</span>
          {!collapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
