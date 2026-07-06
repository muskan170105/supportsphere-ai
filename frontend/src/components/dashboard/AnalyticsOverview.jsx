import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { day: "Mon", conversations: 180, resolved: 165 },
  { day: "Tue", conversations: 220, resolved: 205 },
  { day: "Wed", conversations: 195, resolved: 180 },
  { day: "Thu", conversations: 260, resolved: 245 },
  { day: "Fri", conversations: 235, resolved: 220 },
  { day: "Sat", conversations: 280, resolved: 262 },
  { day: "Sun", conversations: 250, resolved: 236 },
];

function AnalyticsOverview() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Analytics Overview
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            AI conversations handled this week
          </p>

        </div>

        <div className="text-right">

          <p className="text-2xl font-bold text-emerald-600">
            +18%
          </p>

          <p className="text-xs text-slate-500">
            vs last week
          </p>

        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorConv"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#64748b" }}
            />

            <YAxis
              tick={{ fill: "#64748b" }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="conversations"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="url(#colorConv)"
            />

            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalyticsOverview;