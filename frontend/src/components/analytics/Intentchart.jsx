import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function IntentChart({ analytics }) {
  if (!analytics) return null;

  const data = [
    {
      name: "Order Tracking",
      value: analytics.order_tracking,
    },
    {
      name: "Refund",
      value: analytics.refund_requests,
    },
    {
      name: "Payment",
      value: analytics.payment_failures,
    },
    {
      name: "Password",
      value: analytics.password_resets,
    },
  ];

  const COLORS = [
    "#06b6d4",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold text-white mb-6">
        Intent Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default IntentChart;