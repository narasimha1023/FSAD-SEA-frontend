import { useState } from "react";

export default function StudentDashboard({ page, user, activities, events, enrolledIds, onEnroll, onUnenroll, onRegisterEvent, registeredEvents, onNavigate }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const categories = ["All", "Club", "Sports", "Academic"];
  const myActivities = activities.filter((a) => enrolledIds.includes(a.id));
  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date());

  const filtered = activities.filter((a) =>
    (filter === "All" || a.category === filter) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleEnroll = (a) => {
    if (enrolledIds.includes(a.id)) { onUnenroll(a.id); notify(`Left ${a.name}`); }
    else if (a.enrolled >= a.capacity) notify("This activity is full!");
    else { onEnroll(a.id); notify(`Enrolled in ${a.name}! 🎉`); }
  };

  const handleRegister = (ev) => {
    if (registeredEvents.includes(ev.id)) { notify("Already registered!"); return; }
    onRegisterEvent(ev.id);
    notify(`Registered for ${ev.title}! 📅`);
  };

  const categoryColors = { Club: "badge-club", Sports: "badge-sports", Academic: "badge-academic" };

  return (
    <div className="page-content">
      {toast && <div className="toast">{toast}</div>}

      {/* ── Home ── */}
      {page === "home" && (
        <div>
          <div className="welcome-banner">
            <div>
              <h2>Welcome back, {user.name.split(" ")[0]}! 👋</h2>
              <p>You're enrolled in <strong>{enrolledIds.length}</strong> activities and registered for <strong>{registeredEvents.length}</strong> events.</p>
            </div>
            <div className="welcome-avatar">{user.name.charAt(0)}</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card blue clickable" onClick={() => onNavigate("my-activities")}>
              <span className="stat-icon">⭐</span><div><h3>{enrolledIds.length}</h3><p>My Activities</p></div>
            </div>
            <div className="stat-card green clickable" onClick={() => onNavigate("events")}>
              <span className="stat-icon">📅</span><div><h3>{registeredEvents.length}</h3><p>Events Registered</p></div>
            </div>
            <div className="stat-card purple clickable" onClick={() => onNavigate("notifications")}>
              <span className="stat-icon">🔔</span><div><h3>{upcomingEvents.length}</h3><p>Upcoming Events</p></div>
            </div>
            <div className="stat-card orange clickable" onClick={() => onNavigate("discover")}>
              <span className="stat-icon">🏃</span><div><h3>{activities.length}</h3><p>Available Activities</p></div>
            </div>
          </div>

          <div className="two-col">
            <div className="section-card">
              <div className="section-card-header">
                <h2>My Activities</h2>
                <button className="btn btn-sm btn-outline" onClick={() => onNavigate("my-activities")}>View All →</button>
              </div>
              {myActivities.length === 0 ? (
                <div className="empty-inline">
                  <p className="text-muted">No activities yet.</p>
                  <button className="btn btn-sm btn-primary" onClick={() => onNavigate("discover")}>Discover Activities</button>
                </div>
              ) : myActivities.map((a) => (
                <div key={a.id} className="event-row">
                  <span className="act-icon">{a.image}</span>
                  <div className="event-row-info"><strong>{a.name}</strong><span className="text-muted">{a.schedule}</span></div>
                  <span className={`badge ${categoryColors[a.category]}`}>{a.category}</span>
                </div>
              ))}
            </div>
            <div className="section-card">
              <div className="section-card-header">
                <h2>Upcoming Events</h2>
                <button className="btn btn-sm btn-outline" onClick={() => onNavigate("events")}>View All →</button>
              </div>
              {upcomingEvents.length === 0 ? <p className="text-muted">No upcoming events.</p> :
                upcomingEvents.slice(0, 4).map((ev) => (
                  <div key={ev.id} className="event-row">
                    <div className="event-row-dot"></div>
                    <div className="event-row-info"><strong>{ev.title}</strong><span className="text-muted">{ev.date} · {ev.location}</span></div>
                    {registeredEvents.includes(ev.id) && <span className="badge badge-sports">✓ Reg.</span>}
                  </div>
                ))}
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="quick-action-grid">
              <button className="quick-action-btn" onClick={() => onNavigate("discover")}>
                <span>🔍</span><strong>Discover Activities</strong><p>Browse and join clubs & sports</p>
              </button>
              <button className="quick-action-btn" onClick={() => onNavigate("events")}>
                <span>📅</span><strong>View Events</strong><p>Register for upcoming events</p>
              </button>
              <button className="quick-action-btn" onClick={() => onNavigate("notifications")}>
                <span>🔔</span><strong>Notifications</strong><p>Check your activity updates</p>
              </button>
              <button className="quick-action-btn" onClick={() => onNavigate("profile")}>
                <span>👤</span><strong>My Profile</strong><p>View your participation summary</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Discover ── */}
      {page === "discover" && (
        <div>
          <div className="search-bar">
            <input placeholder="🔍 Search activities..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="filter-btns">
              {categories.map((c) => (
                <button key={c} className={`btn btn-sm ${filter === c ? "btn-primary" : "btn-outline"}`} onClick={() => setFilter(c)}>{c}</button>
              ))}
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state"><p>No activities found.</p></div>
          ) : (
            <div className="cards-grid">
              {filtered.map((a) => {
                const enrolled = enrolledIds.includes(a.id);
                const full = a.enrolled >= a.capacity && !enrolled;
                return (
                  <div key={a.id} className={`activity-card ${enrolled ? "enrolled" : ""}`}>
                    <div className="act-emoji">{a.image}</div>
                    <span className={`badge ${categoryColors[a.category]}`}>{a.category}</span>
                    <h3>{a.name}</h3>
                    <p>{a.description}</p>
                    <p className="text-muted">🕐 {a.schedule}</p>
                    <div className="capacity-bar"><div className="capacity-fill" style={{ width: `${(a.enrolled / a.capacity) * 100}%` }}></div></div>
                    <p className="text-muted">{a.enrolled}/{a.capacity} enrolled</p>
                    <button className={`btn btn-full ${enrolled ? "btn-danger" : full ? "btn-disabled" : "btn-primary"}`} onClick={() => handleEnroll(a)} disabled={full}>
                      {enrolled ? "Leave Activity" : full ? "Activity Full" : "Enroll Now"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── My Activities ── */}
      {page === "my-activities" && (
        <div>
          <div className="section-header">
            <h2>My Activities</h2>
            <span className="text-muted">{myActivities.length} enrolled</span>
          </div>
          {myActivities.length === 0 ? (
            <div className="empty-state">
              <p>🎯 You haven't enrolled in any activities yet.</p>
              <button className="btn btn-primary" onClick={() => onNavigate("discover")}>Discover Activities</button>
            </div>
          ) : (
            <div className="cards-grid">
              {myActivities.map((a) => (
                <div key={a.id} className="activity-card enrolled">
                  <div className="act-emoji">{a.image}</div>
                  <span className={`badge ${categoryColors[a.category]}`}>{a.category}</span>
                  <h3>{a.name}</h3>
                  <p>{a.description}</p>
                  <p className="text-muted">🕐 {a.schedule}</p>
                  <button className="btn btn-full btn-danger" onClick={() => { onUnenroll(a.id); notify(`Left ${a.name}`); }}>Leave Activity</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Events ── */}
      {page === "events" && (
        <div>
          <div className="section-header">
            <h2>Upcoming Events</h2>
            <span className="text-muted">{upcomingEvents.length} events</span>
          </div>
          {upcomingEvents.length === 0 ? (
            <div className="empty-state"><p>📅 No upcoming events.</p></div>
          ) : (
            <div className="event-cards">
              {upcomingEvents.map((ev) => {
                const registered = registeredEvents.includes(ev.id);
                const d = new Date(ev.date);
                return (
                  <div key={ev.id} className={`event-card ${registered ? "registered" : ""}`}>
                    <div className="event-date-badge">
                      <span>{d.toLocaleDateString("en-US", { month: "short" })}</span>
                      <strong>{d.getDate()}</strong>
                    </div>
                    <div className="event-info">
                      <h3>{ev.title}</h3>
                      <p>{ev.description}</p>
                      <p className="text-muted">📍 {ev.location} &nbsp;·&nbsp; 🕐 {ev.time}</p>
                      <p className="text-muted">👥 {ev.registrations.length} registered</p>
                    </div>
                    <button className={`btn ${registered ? "btn-success" : "btn-primary"}`} onClick={() => handleRegister(ev)}>
                      {registered ? "✓ Registered" : "Register"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Notifications ── */}
      {page === "notifications" && (
        <div>
          <div className="section-header">
            <h2>Notifications</h2>
            <span className="text-muted">{upcomingEvents.length + myActivities.length} updates</span>
          </div>
          {upcomingEvents.length === 0 && myActivities.length === 0 ? (
            <div className="empty-state">
              <p>🔔 No notifications yet.</p>
              <button className="btn btn-primary" onClick={() => onNavigate("discover")}>Enroll in Activities</button>
            </div>
          ) : (
            <div className="notif-list">
              {upcomingEvents.map((ev) => (
                <div key={`ev-${ev.id}`} className="notif-item">
                  <div className="notif-icon-wrap blue">📅</div>
                  <div className="notif-body">
                    <strong>{ev.title}</strong>
                    <p className="text-muted">{ev.date} at {ev.time} — {ev.location}</p>
                  </div>
                  <div className="notif-actions">
                    {registeredEvents.includes(ev.id)
                      ? <span className="badge badge-sports">✓ Registered</span>
                      : <button className="btn btn-sm btn-primary" onClick={() => { handleRegister(ev); }}>Register</button>
                    }
                  </div>
                </div>
              ))}
              {myActivities.map((a) => (
                <div key={`act-${a.id}`} className="notif-item">
                  <div className="notif-icon-wrap purple">{a.image}</div>
                  <div className="notif-body">
                    <strong>{a.name} — Next Session</strong>
                    <p className="text-muted">{a.schedule}</p>
                  </div>
                  <span className={`badge ${categoryColors[a.category]}`}>{a.category}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Profile ── */}
      {page === "profile" && (
        <div>
          <div className="profile-header">
            <div className="profile-avatar">{user.name.charAt(0)}</div>
            <div>
              <h2>{user.name}</h2>
              <p className="text-muted">{user.email}</p>
              <span className="role-badge student">🎓 {user.studentId}</span>
            </div>
          </div>
          <div className="two-col">
            <div className="section-card">
              <h3>Account Details</h3>
              <div className="profile-detail"><span>Student ID</span><strong>{user.studentId}</strong></div>
              <div className="profile-detail"><span>Full Name</span><strong>{user.name}</strong></div>
              <div className="profile-detail"><span>Email</span><strong>{user.email}</strong></div>
              <div className="profile-detail"><span>Role</span><strong>Student</strong></div>
            </div>
            <div className="section-card">
              <h3>Participation Summary</h3>
              <div className="profile-detail"><span>Activities Enrolled</span><strong>{enrolledIds.length}</strong></div>
              <div className="profile-detail"><span>Events Registered</span><strong>{registeredEvents.length}</strong></div>
              <div className="profile-detail"><span>Available Activities</span><strong>{activities.length}</strong></div>
              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <button className="btn btn-primary btn-sm" onClick={() => onNavigate("discover")}>Discover More</button>
                <button className="btn btn-outline btn-sm" onClick={() => onNavigate("events")}>View Events</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
