export const initialActivities = [
  { id: 1, name: "Chess Club", category: "Club", description: "Weekly chess tournaments and training sessions.", schedule: "Every Monday, 4:00 PM", capacity: 20, enrolled: 14, image: "♟️" },
  { id: 2, name: "Basketball Team", category: "Sports", description: "Competitive basketball team with inter-school matches.", schedule: "Tue & Thu, 5:00 PM", capacity: 15, enrolled: 12, image: "🏀" },
  { id: 3, name: "Drama Club", category: "Club", description: "Theater performances and acting workshops.", schedule: "Every Wednesday, 3:30 PM", capacity: 25, enrolled: 18, image: "🎭" },
  { id: 4, name: "Science Olympiad", category: "Academic", description: "Prepare for regional science competitions.", schedule: "Every Friday, 4:00 PM", capacity: 30, enrolled: 22, image: "🔬" },
  { id: 5, name: "Swimming Team", category: "Sports", description: "Competitive swimming with professional coaching.", schedule: "Mon, Wed, Fri, 6:00 AM", capacity: 20, enrolled: 9, image: "🏊" },
  { id: 6, name: "Debate Society", category: "Academic", description: "Public speaking and competitive debate training.", schedule: "Every Tuesday, 4:30 PM", capacity: 24, enrolled: 16, image: "🎤" },
];

export const initialEvents = [
  { id: 1, title: "Annual Sports Day", date: "2025-08-15", time: "9:00 AM", location: "Main Ground", description: "Full-day sports competition across all disciplines.", activityId: null, registrations: ["Alice Johnson", "Bob Smith", "Carol White"] },
  { id: 2, title: "Chess Tournament", date: "2025-08-22", time: "2:00 PM", location: "Library Hall", description: "Inter-school chess championship.", activityId: 1, registrations: ["Alice Johnson", "David Lee"] },
  { id: 3, title: "Drama Showcase", date: "2025-09-05", time: "6:00 PM", location: "Auditorium", description: "End-of-term drama performance open to all.", activityId: 3, registrations: ["Carol White", "Emma Davis"] },
  { id: 4, title: "Science Fair", date: "2025-09-12", time: "10:00 AM", location: "Science Block", description: "Student project presentations and judging.", activityId: 4, registrations: ["Bob Smith", "Frank Miller"] },
];

export const students = [
  { id: 1, name: "Alice Johnson", email: "alice@school.edu", grade: "10A", enrolledActivities: [1, 2], registeredEvents: [1, 2], role: "student" },
  { id: 2, name: "Bob Smith",     email: "bob@school.edu",   grade: "11B", enrolledActivities: [4, 5], registeredEvents: [1, 4], role: "student" },
  { id: 3, name: "Carol White",   email: "carol@school.edu", grade: "10C", enrolledActivities: [3],    registeredEvents: [3],    role: "student" },
  { id: 4, name: "David Lee",     email: "david@school.edu", grade: "12A", enrolledActivities: [1, 6], registeredEvents: [2],    role: "student" },
  { id: 5, name: "Emma Davis",    email: "emma@school.edu",  grade: "11A", enrolledActivities: [3, 4], registeredEvents: [3],    role: "student" },
  { id: 6, name: "Frank Miller",  email: "frank@school.edu", grade: "12B", enrolledActivities: [2, 4], registeredEvents: [4],    role: "student" },
];

// ─── Login Credentials & MFA Codes ───────────────────────────────────────────
// Role    │ Name          │ ID      │ Email                │ Password    │ MFA
// ────────┼───────────────┼─────────┼──────────────────────┼─────────────┼────────
// Admin   │ Admin         │ ADM-001 │ admin@school.edu     │ Admin@2025  │ 482910
// Student │ Alice Johnson │ STU-001 │ alice@school.edu     │ Alice@123   │ 371624
// Student │ Bob Smith     │ STU-002 │ bob@school.edu       │ Bob@456     │ 958043
// Student │ Carol White   │ STU-003 │ carol@school.edu     │ Carol@789   │ 614782
// Student │ David Lee     │ STU-004 │ david@school.edu     │ David@321   │ 203957
// Student │ Emma Davis    │ STU-005 │ emma@school.edu      │ Emma@654    │ 739416
// Student │ Frank Miller  │ STU-006 │ frank@school.edu     │ Frank@987   │ 825301

export const users = [
  { id: 0, studentId: "ADM-001", name: "Admin",         email: "admin@school.edu", password: "Admin@2025", mfaCode: "482910", role: "admin"   },
  { id: 1, studentId: "STU-001", name: "Alice Johnson", email: "alice@school.edu", password: "Alice@123",  mfaCode: "371624", role: "student" },
  { id: 2, studentId: "STU-002", name: "Bob Smith",     email: "bob@school.edu",   password: "Bob@456",    mfaCode: "958043", role: "student" },
  { id: 3, studentId: "STU-003", name: "Carol White",   email: "carol@school.edu", password: "Carol@789",  mfaCode: "614782", role: "student" },
  { id: 4, studentId: "STU-004", name: "David Lee",     email: "david@school.edu", password: "David@321",  mfaCode: "203957", role: "student" },
  { id: 5, studentId: "STU-005", name: "Emma Davis",    email: "emma@school.edu",  password: "Emma@654",   mfaCode: "739416", role: "student" },
  { id: 6, studentId: "STU-006", name: "Frank Miller",  email: "frank@school.edu", password: "Frank@987",  mfaCode: "825301", role: "student" },
];
