function DashboardCard({
  title,
  value,
  change,
  positive = true,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800">

      <h3 className="text-slate-400 text-sm">
        {title}
      </h3>

      <h1 className="text-3xl font-bold text-white mt-3">
        {value}
      </h1>

      <p
        className={`mt-4 text-sm ${
          positive
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {change}
      </p>

    </div>
  );
}

export default DashboardCard;