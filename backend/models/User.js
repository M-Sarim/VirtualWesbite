// Simple in-memory user store for mock/demo

const users = [
  {
    id: 1,
    username: "admin@site.com",
    password: "admin1234", // In production, use hashed passwords!
    role: "admin",
    email: "admin@site.com",
  },
];

module.exports = users;
