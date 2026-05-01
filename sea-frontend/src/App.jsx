import { useState } from "react";
import { initialActivities, initialEvents, students } from "./data";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState(initialActivities);
  const [events, setEvents] = useState(initialEvents);
  const [studentData, setStudentData] = useState(students);
  const [activePage, setActivePage] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (u) => {
    setUser(u);
    setActivePage(u.role === "admin" ? "overview" : "home");
  };
  const handleLogout = () => { setUser(null); setActivePage(null); };

  const getStudent = () => studentData.find((s) => s.id === user?.id) || { enrolledActivities: [], registeredEvents: [] };

  const handleEnroll = (actId) => {
    setStudentData((prev) => prev.map((s) => s.id === user.id ? { ...s, enrolledActivities: [...s.enrolledActivities, actId] } : s));
    setActivities((prev) => prev.map((a) => a.id === actId ? { ...a, enrolled: a.enrolled + 1 } : a));
  };
  const handleUnenroll = (actId) => {
    setStudentData((prev) => prev.map((s) => s.id === user.id ? { ...s, enrolledActivities: s.enrolledActivities.filter((id) => id !== actId) } : s));
    setActivities((prev) => prev.map((a) => a.id === actId ? { ...a, enrolled: Math.max(0, a.enrolled - 1) } : a));
  };
  const handleRegisterEvent = (evId) => {
    setStudentData((prev) => prev.map((s) => s.id === user.id ? { ...s, registeredEvents: [...(s.registeredEvents || []), evId] } : s));
    setEvents((prev) => prev.map((e) => e.id === evId ? { ...e, registrations: [...e.registrations, user.name] } : e));
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const student = getStudent();

  return (
    <div className={`app-layout ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        user={user}
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />
      <div className="main-area">
        <Topbar user={user} activePage={activePage} onNavigate={setActivePage} />
        <main className="main-content">
          {user.role === "admin" ? (
            <AdminDashboard
              page={activePage}
              activities={activities}
              events={events}
              onNavigate={setActivePage}
              onUpdateActivity={(a) => setActivities((prev) => prev.map((x) => x.id === a.id ? a : x))}
              onAddActivity={(a) => setActivities((prev) => [...prev, a])}
              onDeleteActivity={(id) => setActivities((prev) => prev.filter((a) => a.id !== id))}
              onUpdateEvent={(e) => setEvents((prev) => prev.map((x) => x.id === e.id ? e : x))}
              onAddEvent={(e) => setEvents((prev) => [...prev, e])}
              onDeleteEvent={(id) => setEvents((prev) => prev.filter((e) => e.id !== id))}
            />
          ) : (
            <StudentDashboard
              page={activePage}
              user={user}
              activities={activities}
              events={events}
              enrolledIds={student.enrolledActivities}
              registeredEvents={student.registeredEvents || []}
              onEnroll={handleEnroll}
              onUnenroll={handleUnenroll}
              onRegisterEvent={handleRegisterEvent}
              onNavigate={setActivePage}
            />
          )}
        </main>
      </div>
    </div>
  );
}
