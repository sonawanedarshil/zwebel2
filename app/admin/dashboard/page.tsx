"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [stats, setStats] = useState<any>({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0,
  });

  const [leads, setLeads] = useState<any[]>([]);

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
      .then(data => {
        const leadsData = data.data;

        setLeads(leadsData);

        setStats({
          total: leadsData.length,
          new: leadsData.filter((l: any) => l.status === "new").length,
          contacted: leadsData.filter((l: any) => l.status === "contacted").length,
          closed: leadsData.filter((l: any) => l.status === "closed").length,
        });
      });
  }, [isAuth]);

  // 🔒 FULL SCREEN LOGIN UI
  if (!isAuth) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 backdrop-blur-sm">
        
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700">
          
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Admin Login
          </h2>

          <p className="text-gray-400 text-center mb-6 text-sm">
            Secure access to admin panel
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

  // 🔥 FILTER TOP CLIENTS
  const topClients = leads.filter((l: any) => l.priority === "high");

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <p className="text-gray-400">Total Leads</p>
            <h2 className="text-2xl font-bold">{stats.total}</h2>
          </div>

          <div className="bg-blue-600 p-6 rounded-xl shadow-lg">
            <p>New</p>
            <h2 className="text-2xl font-bold">{stats.new}</h2>
          </div>

          <div className="bg-yellow-500 p-6 rounded-xl shadow-lg">
            <p>Contacted</p>
            <h2 className="text-2xl font-bold">{stats.contacted}</h2>
          </div>

          <div className="bg-green-600 p-6 rounded-xl shadow-lg">
            <p>Closed</p>
            <h2 className="text-2xl font-bold">{stats.closed}</h2>
          </div>

        </div>

        {/* 🔥 TOP CLIENTS */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">🔥 Top Clients</h2>

          {topClients.length === 0 ? (
            <p className="text-gray-400">No high priority clients</p>
          ) : (
            <div className="grid gap-4">
              {topClients.map((client: any) => (
                <div
                  key={client._id}
                  className="bg-red-900 border border-red-500 p-4 rounded-lg"
                >
                  <p className="font-semibold">{client.name}</p>
                  <p className="text-sm text-gray-300">{client.email}</p>
                  <p className="text-xs text-gray-400">
                    🆔 {client.clientId || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}