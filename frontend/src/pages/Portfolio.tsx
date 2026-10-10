export function Portfolio() {
  return (
    <div className="space-y-5 max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-bold">Portfolio</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ["Invested", "₹2,45,000"],
          ["Current value", "₹2,58,430"],
          ["Day P&L", "+₹2,180"],
          ["Total P&L", "+₹13,430"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-xl font-semibold mt-2">{value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-gray-500">
        Portfolio positions will be connected to your Spring Boot API here.
      </div>
    </div>
  );
}