import { useState } from "react";
import { students } from "../data";

export default function AdminDashboard({ page, activities, events, onNavigate, onUpdateActivity, onAddActivity, onDeleteActivity, onUpdateEvent, onAddEvent, onDeleteEvent }) {
  const [editActivity, setEditActivity] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newActivity, setNewActivity] = useState({ name: "", category: "Club", description: "", schedule: "", capacity: 20, image: "🎯" });
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", location: "", description: "" });
  const [toast, setToast] = useState(null);

  const totalEnrolled = activities.reduce((s, a) => s + a.enrolled, 0);
  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date());
  const categoryColors = { Club: "badge-club", Sports: "badge-sports", Academic: "badge-academic" };

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const saveActivity = () => {
    if (editActivity) { onUpdateActivity(editActivity); setEditActivity(null); notify("Activity updated ✓"); }
    else { onAddActivity({ ...newActivity, id: Date.now(), enrolled: 0 }); setNewActivity({ name: "", category: "Club", description: "", schedule: "", capacity: 20, image: "🎯" }); setShowActivityForm(false); notify("Activity added ✓"); }
  };

  const saveEvent = () => {
    if (editEvent) { onUpdateEvent(editEvent); setEditEvent(null); notify("Event updated ✓"); }
    else { onAddEvent({ ...newEvent, id: Date.now(), registrations: [] }); setNewEvent({ title: "", date: "", time: "", location: "", description: "" }); setShowEventForm(false); notify("Event added ✓"); }
  };

  return (
    <div className="page-content">
      {toast && <div className="toast">{toast}</div>}

      {/* ── Overview ── */}
      {page === "overview" && (
        <div>
          <div className="stats-grid">
            <div className="stat-card blue clickable" onClick={() => onNavigate("activities")}>
              <span className="stat-icon">🏃</span><div><h3>{activities.length}</h3><p>Total Activities</p></div>
            </div>
            <div className="stat-card green clickable" onClick={() => onNavigate("students")}>
              <span className="stat-icon">👥</span><div><h3>{totalEnrolled}</h3><p>Total Enrollments</p></div>
            </div>
            <div className="stat-card purple clickable" onClick={() => onNavigate("events")}>
              <span className="stat-icon">📅</span><div><h3>{upcomingEvents.length}</h3><p>Upcoming Events</p></div>
            </div>
            <div className="stat-card orange clickable" onClick={() => onNavigate("students")}>
              <span className="stat-icon">🎓</span><div><h3>{students.length}</h3><p>Registered Students</p></div>
            </div>
          </div>

          <div className="two-col">
            <div className="section-card">
              <div className="section-card-header">
                <h2>Recent Events</h2>
                <button className="btn btn-sm btn-outline" onClick={() => onNavigate("events")}>Manage →</button>
              </div>
              {events.slice(0, 4).map((ev) => (
                <div key={ev.id} className="event-row">
                  <div className="event-row-dot"></div>
                  <div className="event-row-info">
                    <strong>{ev.title}</strong>
                    <span className="text-muted">{ev.date} · {ev.location}</span>
                  </div>
                  <span className="badge badge-club">{ev.registrations.length} reg.</span>
                </div>
              ))}
            </div>
            <div className="section-card">
              <div className="section-card-header">
                <h2>Activity Capacity</h2>
                <button className="btn btn-sm btn-outline" onClick={() => onNavigate("activities")}>Manage →</button>
              </div>
              {activities.map((a) => (
                <div key={a.id} className="capacity-row">
                  <div className="capacity-row-label"><span>{a.image}</span><span>{a.name}</span></div>
                  <div className="capacity-bar-wrap">
                    <div className="capacity-bar"><div className="capacity-fill" style={{ width: `${(a.enrolled / a.capacity) * 100}%` }}></div></div>
                    <span className="text-muted">{a.enrolled}/{a.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="quick-action-grid">
              <button className="quick-action-btn" onClick={() => { setShowActivityForm(true); onNavigate("activities"); }}>
                <span>➕</span><strong>Add Activity</strong><p>Create a new club or sport</p>
              </button>
              <button className="quick-action-btn" onClick={() => { setShowEventForm(true); onNavigate("events"); }}>
                <span>📅</span><strong>Add Event</strong><p>Schedule a new event</p>
              </button>
              <button className="quick-action-btn" onClick={() => onNavigate("students")}>
                <span>👥</span><strong>View Students</strong><p>Track participation</p>
              </button>
              <button className="quick-action-btn" onClick={() => onNavigate("settings")}>
                <span>⚙️</span><strong>Settings</strong><p>Configure platform</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Activities ── */}
      {page === "activities" && (
        <div>
          <div className="section-header">
            <h2>Manage Activities</h2>
            <button className="btn btn-primary" onClick={() => { setShowActivityForm(true); setEditActivity(null); }}>+ Add Activity</button>
          </div>
          {(showActivityForm || editActivity) && (
            <div className="form-card">
              <h3>{editActivity ? "Edit Activity" : "New Activity"}</h3>
              <div className="form-grid">
                {[["name", "Activity Name"], ["schedule", "Schedule"], ["description", "Description"]].map(([f, lbl]) => (
                  <div className="form-group" key={f}>
                    <label>{lbl}</label>
                    <input value={editActivity ? editActivity[f] : newActivity[f]} onChange={(e) => editActivity ? setEditActivity({ ...editActivity, [f]: e.target.value }) : setNewActivity({ ...newActivity, [f]: e.target.value })} placeholder={lbl} />
                  </div>
                ))}
                <div className="form-group">
                  <label>Emoji Icon</label>
                  <input value={editActivity ? editActivity.image : newActivity.image} onChange={(e) => editActivity ? setEditActivity({ ...editActivity, image: e.target.value }) : setNewActivity({ ...newActivity, image: e.target.value })} placeholder="e.g. 🎯" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={editActivity ? editActivity.category : newActivity.category} onChange={(e) => editActivity ? setEditActivity({ ...editActivity, category: e.target.value }) : setNewActivity({ ...newActivity, category: e.target.value })}>
                    {["Club", "Sports", "Academic"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="number" min="1" value={editActivity ? editActivity.capacity : newActivity.capacity} onChange={(e) => editActivity ? setEditActivity({ ...editActivity, capacity: +e.target.value }) : setNewActivity({ ...newActivity, capacity: +e.target.value })} />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" onClick={saveActivity}>Save</button>
                <button className="btn btn-outline" onClick={() => { setEditActivity(null); setShowActivityForm(false); }}>Cancel</button>
              </div>
            </div>
          )}
          <div className="table-wrap">
            <table>
              <thead><tr><th>Activity</th><th>Category</th><th>Schedule</th><th>Enrolled / Capacity</th><th>Fill</th><th>Actions</th></tr></thead>
              <tbody>
                {activities.map((a) => (
                  <tr key={a.id}>
                    <td><span className="act-icon">{a.image}</span>{a.name}</td>
                    <td><span className={`badge ${categoryColors[a.category]}`}>{a.category}</span></td>
                    <td>{a.schedule}</td>
                    <td>{a.enrolled} / {a.capacity}</td>
                    <td style={{ minWidth: 100 }}>
                      <div className="capacity-bar inline"><div className="capacity-fill" style={{ width: `${(a.enrolled / a.capacity) * 100}%` }}></div></div>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline" onClick={() => { setEditActivity(a); setShowActivityForm(false); }}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => { onDeleteActivity(a.id); notify("Activity deleted"); }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Events ── */}
      {page === "events" && (
        <div>
          <div className="section-header">
            <h2>Manage Events</h2>
            <button className="btn btn-primary" onClick={() => { setShowEventForm(true); setEditEvent(null); }}>+ Add Event</button>
          </div>
          {(showEventForm || editEvent) && (
            <div className="form-card">
              <h3>{editEvent ? "Edit Event" : "New Event"}</h3>
              <div className="form-grid">
                {[["title", "Event Title", "text"], ["date", "Date", "date"], ["time", "Time", "time"], ["location", "Location", "text"], ["description", "Description", "text"]].map(([f, lbl, type]) => (
                  <div className="form-group" key={f}>
                    <label>{lbl}</label>
                    <input type={type} value={editEvent ? editEvent[f] : newEvent[f]} onChange={(e) => editEvent ? setEditEvent({ ...editEvent, [f]: e.target.value }) : setNewEvent({ ...newEvent, [f]: e.target.value })} placeholder={lbl} />
                  </div>
                ))}
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" onClick={saveEvent}>Save</button>
                <button className="btn btn-outline" onClick={() => { setEditEvent(null); setShowEventForm(false); }}>Cancel</button>
              </div>
            </div>
          )}
          <div className="table-wrap">
            <table>
              <thead><tr><th>Event</th><th>Date</th><th>Time</th><th>Location</th><th>Registrations</th><th>Actions</th></tr></thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev.id}>
                    <td><strong>{ev.title}</strong></td>
                    <td>{ev.date}</td>
                    <td>{ev.time}</td>
                    <td>{ev.location}</td>
                    <td><span className="badge badge-club">{ev.registrations.length} students</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline" onClick={() => { setEditEvent(ev); setShowEventForm(false); }}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => { onDeleteEvent(ev.id); notify("Event deleted"); }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Students ── */}
      {page === "students" && (
        <div>
          <div className="section-header">
            <h2>Student Participation</h2>
            <span className="text-muted">{students.length} students registered</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Student ID</th><th>Name</th><th>Grade</th><th>Email</th><th>Activities</th><th>Events</th></tr></thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td><code>STU-00{s.id}</code></td>
                    <td><div className="student-name-cell"><div className="user-avatar xs">{s.name.charAt(0)}</div>{s.name}</div></td>
                    <td><span className="badge badge-academic">{s.grade}</span></td>
                    <td>{s.email}</td>
                    <td>
                      {s.enrolledActivities.map((id) => {
                        const act = activities.find((a) => a.id === id);
                        return act ? <span key={id} className="badge badge-club">{act.image} {act.name}</span> : null;
                      })}
                    </td>
                    <td><span className="badge badge-sports">{s.registeredEvents?.length || 0} events</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Settings ── */}
      {page === "settings" && (
        <div>
          <h2>Platform Settings</h2>
          <div className="settings-grid">
            <div className="section-card">
              <h3>General</h3>
              <div className="form-group"><label>Platform Name</label><input defaultValue="EduActivities" /></div>
              <div className="form-group"><label>School Name</label><input defaultValue="Springfield High School" /></div>
              <div className="form-group"><label>Academic Year</label><input defaultValue="2025 – 2026" /></div>
              <button className="btn btn-primary" onClick={() => notify("Settings saved ✓")}>Save Changes</button>
            </div>
            <div className="section-card">
              <h3>Notifications</h3>
              <div className="toggle-row"><span>Email notifications for new registrations</span><label className="toggle"><input type="checkbox" defaultChecked /><span className="slider"></span></label></div>
              <div className="toggle-row"><span>Notify students of event updates</span><label className="toggle"><input type="checkbox" defaultChecked /><span className="slider"></span></label></div>
              <div className="toggle-row"><span>Weekly participation report</span><label className="toggle"><input type="checkbox" /></label></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
