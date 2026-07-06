import {
  UserCircle2,
  Mail,
  Phone,
  ShoppingBag,
  IndianRupee,
  Calendar,
  Crown,
} from "lucide-react";

function CustomerProfile({ customer }) {
  if (!customer) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

        <div className="flex flex-col items-center justify-center py-10">

          <UserCircle2
            size={52}
            className="text-slate-300"
          />

          <h2 className="mt-4 text-lg font-semibold text-slate-700">
            No Customer Selected
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Select a conversation to view customer details.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">

            <span className="text-2xl font-bold">
              {customer.name[0]}
            </span>

          </div>

          <div>

            <h2 className="text-xl font-bold">
              {customer.name}
            </h2>

            <div className="flex items-center gap-2 mt-2">

              <Crown size={16} />

              <span className="text-sm">
                {customer.tier} Customer
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Details */}

      <div className="p-6 space-y-5">

        <ProfileItem
          icon={<Mail size={18} />}
          label="Email"
          value={customer.email}
        />

        <ProfileItem
          icon={<Phone size={18} />}
          label="Phone"
          value={customer.phone}
        />

        <ProfileItem
          icon={<ShoppingBag size={18} />}
          label="Orders"
          value={customer.orders}
        />

        <ProfileItem
          icon={<IndianRupee size={18} />}
          label="Total Spend"
          value={`₹${customer.spent}`}
        />

        <ProfileItem
          icon={<Calendar size={18} />}
          label="Member Since"
          value={customer.member_since}
        />

      </div>

      {/* Quick Stats */}

      <div className="border-t border-slate-200 p-6">

        <h3 className="text-sm font-semibold text-slate-600 mb-4">
          CUSTOMER INSIGHTS
        </h3>

        <div className="grid grid-cols-2 gap-3">

          <InsightCard
            title="Orders"
            value={customer.orders}
          />

          <InsightCard
            title="Tier"
            value={customer.tier}
          />

          <InsightCard
            title="Status"
            value="Active"
          />

          <InsightCard
            title="AI Score"
            value="98%"
          />

        </div>

      </div>

    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-4">

      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-cyan-600">

        {icon}

      </div>

      <div>

        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-800 mt-1">
          {value}
        </p>

      </div>

    </div>
  );
}

function InsightCard({
  title,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="text-lg font-bold text-slate-900 mt-1">
        {value}
      </p>

    </div>
  );
}

export default CustomerProfile;