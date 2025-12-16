import { useEffect, useState } from "react";
import API from "../api/api";
import DoctorCard from "../components/DoctorCard";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <h2 className="text-3xl font-semibold text-slate-800 mb-6 text-center md:text-left">
          Find Doctors
        </h2>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center md:justify-start">
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 bg-white border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-600 py-10">
              No doctors found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Doctors;