"use client";

import { useEffect, useState } from "react";

export default function LeadDetails({ params }: any) {
  const [lead, setLead] = useState<any>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    fetch(`/api/admin/leads/${params.id}`)
      .then(res => res.json())
      .then(data => setLead(data.data));
  }, [params.id]);

  const updateStatus = async (status: string) => {
    await fetch(`/api/admin/leads/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    location.reload();
  };

  const addNote = async () => {
    if (!note) return;

    await fetch(`/api/admin/leads/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        $push: { notes: { text: note } },
      }),
    });

    setNote("");
    location.reload();
  };

  const deleteLead = async () => {
    await fetch(`/api/admin/leads/${params.id}`, {
      method: "DELETE",
    });

    window.location.href = "/admin/leads";
  };

  if (!lead) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen pt-24 px-6 bg-black">
      
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl p-6 space-y-4">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">{lead.name}</h1>
          <p className="text-gray-400 text-sm">{lead.email}</p>
        </div>

        {/* STATUS BADGE */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm ${
            lead.status === "new"
              ? "bg-blue-500"
              : lead.status === "contacted"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {lead.status}
        </span>

        {/* DETAILS */}
        <div className="text-gray-300 space-y-1">
          <p>📞 {lead.phone}</p>
          <p>🏢 {lead.company}</p>
        </div>

        <p>{lead.message}</p>

        {/* STATUS BUTTONS */}
        <div className="flex gap-2">
          <button onClick={() => updateStatus("new")} className="bg-blue-500 px-4 py-1 rounded hover:opacity-80">New</button>
          <button onClick={() => updateStatus("contacted")} className="bg-yellow-500 px-4 py-1 rounded hover:opacity-80">Contacted</button>
          <button onClick={() => updateStatus("closed")} className="bg-green-500 px-4 py-1 rounded hover:opacity-80">Closed</button>
        </div>

        {/* NOTES */}
        <div>
          <h2 className="font-semibold mb-2">Notes</h2>

          {lead.notes?.map((n: any, i: number) => (
            <p key={i} className="text-gray-300">• {n.text}</p>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note"
              className="p-2 text-black flex-1 rounded"
            />

            <button onClick={addNote} className="bg-gray-700 px-3 py-1 rounded">
              Add
            </button>
          </div>
        </div>

        {/* DELETE */}
        <button
          onClick={deleteLead}
          className="bg-red-600 px-4 py-2 rounded hover:opacity-80"
        >
          Delete Lead
        </button>

      </div>
    </div>
  );
}