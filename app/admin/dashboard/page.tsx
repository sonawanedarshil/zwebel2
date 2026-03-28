"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0,
  });

  useEffect(() => {
    fetch("/api/admin/leads")
      .then(res => res.json())
      .then(data => {
        const leads = data.data;

        setStats({
          total: leads.length,
          new: leads.filter((l: any) => l.status === "new").length,
          contacted: leads.filter((l: any) => l.status === "contacted").length,
          closed: leads.filter((l: any) => l.status === "closed").length,
        });
      });
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 bg-black">
      
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

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
      </div>
    </div>
  );
}