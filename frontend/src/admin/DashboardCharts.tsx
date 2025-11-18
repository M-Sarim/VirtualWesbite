import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardCharts() {
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Companies Incorporated",
        data: [5, 8, 6, 7, 9, 4, 3],
        backgroundColor: "#1976d2",
      },
    ],
  };
  const doughnutData = {
    labels: ["Digital", "Print", "Privacy", "International"],
    datasets: [
      {
        label: "Packages",
        data: [12, 7, 5, 3],
        backgroundColor: ["#1976d2", "#D30B5F", "#FF7900", "#23272F"],
      },
    ],
  };
  return (
    <section className="bg-white rounded shadow p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-medium mb-2">
            Companies Incorporated (Last 7 Days)
          </h3>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Package Distribution</h3>
          <Doughnut
            data={doughnutData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>
    </section>
  );
}
