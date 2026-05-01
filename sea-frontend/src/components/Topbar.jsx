export default function Topbar({ user, activePage, onNavigate }) {
  const adminPages = [
    { id: "overview", label: "Overview" },
    { id: "activities", label: "Activities" },
    { id: "events", label: "Events" },
    { id: "students", label: "Students" },
    { id: "settings", label: "Settings" },
  ];
  const studentPages = [
    { id: "home", label: "Home" },
    { id: "discover", label: "Discover" },
    { id: "my-activities", label: "My Activities" },
    { id: "events", label: "Events" },
    { id: "notifications", label: "Notifications" },
    { id: "profile", label: "Profile" },
  ];

  const pageLabels = {
    overview: "Overview", activities: "Activities", events: "Events",
    students: "Students", settings: "Settings",
    home: "Home", discover: "Discover Activities",
    "my-activities": "My Activities", notifications: "Notifications", profile: "My Profile",
  };

  const quickLinks = user.role === "admin" ? adminPages : studentPages;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-page">{pageLabels[activePage] || activePage}</span>
        <nav className="topbar-nav">
          {quickLinks.map((p) => (
            <button
              key={p.id}
              className={`topbar-nav-btn ${activePage === p.id ? "active" : ""}`}
              onClick={() => onNavigate(p.id)}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="topbar-right">
        <div className="topbar-user">
          <div className="user-avatar sm">{user.name.charAt(0)}</div>
          <div className="topbar-user-info">
            <strong>{user.name}</strong>
            <span className="text-muted">{user.studentId}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
