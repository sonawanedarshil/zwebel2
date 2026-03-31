"use client";

import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");

  // 🔐 LOGIN FUNCTION
  const handleLogin = () => {
    if (id === "admin" && password === "1234") {
      setIsAuth(true);
    } else {
      alert("Wrong credentials");
    }
  };

  // 🚀 FETCH ONLY AFTER LOGIN
  useEffect(() => {
    if (!isAuth) return;

    fetch("/api/admin/leads")
      .then(res => res.json())
      .then(data => setLeads(data.data));
  }, [isAuth]);

  // 🔒 LOGIN UI BLOCK
  if (!isAuth) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 backdrop-blur-sm">
        
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700">
          
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Admin Login
          </h2>

          <p className="text-gray-400 text-center mb-6 text-sm">
            Secure access to leads panel
          </p>

          <input
            placeholder="Username"
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold text-white"
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  // 🔍 FILTER LOGIC
  const filteredLeads = leads.filter((lead: any) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "all" || lead.status === status;

    const matchesPriority =
      priority === "all" || lead.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">CRM Leads</h1>

        {/* SEARCH + FILTER */}
        <div className="flex gap-4 mb-6">
          <input
            placeholder="Search by name/email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded w-full text-black"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 rounded text-black"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 rounded text-black"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* LEADS */}
        <div className="space-y-4">
          {filteredLeads.map((lead: any) => (
            <div
              key={lead._id}
              className={`p-5 rounded-xl shadow-lg hover:scale-[1.02] transition ${
                lead.priority === "high"
                  ? "bg-red-900 border border-red-500"
                  : "bg-gray-900"
              }`}
            >
              <h2 className="text-xl font-semibold">{lead.name}</h2>
              <p className="text-gray-400">{lead.email}</p>

              <div className="mt-2 text-sm text-gray-300 flex justify-between">
                <p>🆔 {lead.clientId || "N/A"}</p>
                <p>⚡ {lead.priority || "medium"}</p>
              </div>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                  lead.status === "new"
                    ? "bg-blue-500"
                    : lead.status === "contacted"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {lead.status}
              </span>

              <div className="mt-3">
                <a
                  href={`/admin/leads/${lead._id}`}
                  className="text-blue-400 underline"
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}