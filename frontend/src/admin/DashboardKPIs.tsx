

export default function DashboardKPIs() {
  // Mock data
  const kpis = [
    { label: "New Companies Today", value: 5 },
    { label: "Pending KYC", value: 8 },
    { label: "Completed Formations", value: 21 },
    { label: "Revenue (MTD)", value: "£12,400" },
    { label: "SLA Breaches", value: 1 },
  ];
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white rounded shadow p-6 text-center"
        >
          <div className="text-2xl font-bold text-[#D30B5F]">{kpi.value}</div>
          <div className="text-gray-600 mt-2 text-sm">{kpi.label}</div>
        </div>
      ))}
    </section>
  );
}
