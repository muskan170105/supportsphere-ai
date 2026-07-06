import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ToolUsageChart({ analytics }) {
  if (!analytics) return null;

  const data = [
    {
      tool: "Tracking",
      count: analytics.order_tracking,
    },
    {
      tool: "Refund",
      count: analytics.refund_requests,
    },
    {
      tool: "Payment",
      count: analytics.payment_failures,
    },
    {
      tool: "Password",
      count: analytics.password_resets,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold text-white mb-6">
        Tool Usage
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="tool" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#06b6d4"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ToolUsageChart;