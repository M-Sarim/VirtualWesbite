const users = require("../models/User");

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) =>
      u.username === username && u.password === password && u.role === "admin"
  );
  if (user) {
    // In production, use JWT or session
    res.json({
      success: true,
      user: { username: user.username, role: user.role, email: user.email },
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

exports.dashboard = (req, res) => {
  // Mock dashboard data matching frontend admin-dashboard.tsx
  res.json({
    kpis: [
      { label: "Companies Incorporated", value: 128 },
      { label: "Pending KYC", value: 7 },
      { label: "Active Users", value: 24 },
      { label: "Revenue (YTD)", value: "$42,300" },
    ],
    users: [
      {
        id: 1,
        name: "Alice Smith",
        email: "alice@example.com",
        role: "Admin",
        lastLogin: "2025-11-15 10:23",
        status: "Active",
      },
      {
        id: 2,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Staff",
        lastLogin: "2025-11-16 09:12",
        status: "Active",
      },
      {
        id: 3,
        name: "Carol Lee",
        email: "carol@example.com",
        role: "Reviewer",
        lastLogin: "2025-11-16 08:45",
        status: "Suspended",
      },
    ],
    activityLog: [
      {
        id: 1,
        user: "Alice Smith",
        action: "Approved KYC for John Doe",
        timestamp: "2025-11-16 11:00",
      },
      {
        id: 2,
        user: "Bob Johnson",
        action: "Created new company: Acme Ltd.",
        timestamp: "2025-11-16 10:45",
      },
      {
        id: 3,
        user: "Carol Lee",
        action: "Suspended user: Jane Roe",
        timestamp: "2025-11-16 09:30",
      },
    ],
  });
};
