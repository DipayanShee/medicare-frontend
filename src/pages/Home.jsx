import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-blue-50 to-blue-100 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Book Doctor Appointments Online
        </h1>

        <p className="max-w-2xl text-slate-600 text-sm md:text-base">
          MediCare+ helps you quickly book appointments with specialist doctors,
          without standing in long hospital queues.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap items-center justify-center">
          <Link to="/doctors">
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Find Doctors
            </button>
          </Link>

          <Link to="/login">
            <button className="px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Login as Patient
            </button>
          </Link>
        </div>
      </section>

      {/* WHY THIS PROJECT */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            Why this project?
          </h2>

          <p className="text-slate-600 text-sm md:text-base mb-4">
            This system is built for college mini-projects / major-projects to
            demonstrate how MERN can be used in real healthcare applications:
            registration, doctor search, and appointment booking.
          </p>

          <ul className="text-left mx-auto text-slate-600 text-sm md:text-base space-y-2 max-w-md">
            <li>✔ Patient registration & login</li>
            <li>✔ Doctor listing & profile</li>
            <li>✔ Appointment booking interface</li>
            <li>✔ My Appointments dashboard</li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Home;