

const users = [
  { name: "Alice Smith", email: "alice@example.com", joined: "2025-11-15" },
  { name: "Bob Johnson", email: "bob@example.com", joined: "2025-11-14" },
  { name: "Carol Lee", email: "carol@example.com", joined: "2025-11-13" },
];

export default function RecentUsers() {
  return (
    <section className="bg-white rounded shadow p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
      <ul className="divide-y divide-gray-100">
        {users.map((u, i) => (
          <li
            key={i}
            className="py-2 flex flex-col sm:flex-row sm:items-center gap-2"
          >
            <span className="font-medium text-gray-900">{u.name}</span>
            <span className="text-gray-500 text-sm">{u.email}</span>
            <span className="ml-auto text-xs text-gray-400">
              Joined {u.joined}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
