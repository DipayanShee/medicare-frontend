import React from "react";

export default function DoctorPayments() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Payments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-green-50 rounded-xl">
          <p className="text-sm text-slate-600">Total Earnings</p>
          <h2 className="text-2xl font-bold text-green-600">₹0</h2>
        </div>

        <div className="p-5 bg-blue-50 rounded-xl">
          <p className="text-sm text-slate-600">This Month</p>
          <h2 className="text-2xl font-bold text-blue-600">₹0</h2>
        </div>

        <div className="p-5 bg-yellow-50 rounded-xl">
          <p className="text-sm text-slate-600">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">₹0</h2>
        </div>
      </div>

      <p className="mt-6 text-slate-500 text-sm">
        💡 Payment integration can be added later (Razorpay / Stripe).
      </p>
    </div>
  );
}