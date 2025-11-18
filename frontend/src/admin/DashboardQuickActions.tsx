const actions = [
  { label: "Create Company", color: "bg-[#D30B5F]" },
  { label: "Upload KYC", color: "bg-[#1976d2]" },
  { label: "Issue Refund", color: "bg-[#FF7900]" },
  { label: "Assign Virtual Address", color: "bg-[#23272F]" },
];

export default function DashboardQuickActions() {
  return (
    <section className="flex flex-wrap gap-4 mb-8">
      {actions.map((action) => (
        <button
          key={action.label}
          className={`px-5 py-3 rounded font-semibold text-white shadow transition ${action.color} hover:opacity-90`}
        >
          {action.label}
        </button>
      ))}
    </section>
  );
}
