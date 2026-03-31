"use client";

import { useEffect, useState } from "react";

export default function LeadDetails({ params }: any) {
  const [lead, setLead] = useState<any>(null);
  const [note, setNote] = useState("");

  const [industryInput, setIndustryInput] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  useEffect(() => {
  fetch(`/api/admin/leads/${params.id}`)
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data); // 👈 ADD THIS

      if (!data || !data.data) {
        console.error("No lead data found");
        return;
      }

      const l = data.data;

      setLead(l);
      setIndustryInput(l.industry || "");
      setTotalAmount(l.totalAmount || 0);
      setPaidAmount(l.paidAmount || 0);
    })
    .catch(err => console.error("Fetch error:", err));
}, [params.id]);

  const updateLead = async (data: any) => {
    await fetch(`/api/admin/leads/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    location.reload();
  };

  const updateStatus = (status: string) => {
    updateLead({ status });
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

  if (!lead) return <p className="p-6 text-white">Loading...</p>;

  // 🔥 AUTO CALCULATIONS
  const pendingAmount = totalAmount - paidAmount;

  let paymentStatus = "pending";
  if (paidAmount > 0 && paidAmount < totalAmount) paymentStatus = "partial";
  if (paidAmount >= totalAmount && totalAmount > 0) paymentStatus = "completed";

  return (
    <div className="min-h-screen pt-24 px-6 bg-black">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl p-6 space-y-4">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-white">{lead.name}</h1>
          <p className="text-gray-400 text-sm">{lead.email}</p>
        </div>

        {/* STATUS */}
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

        {/* CLIENT INFO */}
        <div className="mt-4 space-y-1 text-gray-300">
          <p>🆔 Client ID: {lead.clientId || "N/A"}</p>
          <p>🏢 Industry: {lead.industry || "Not set"}</p>
          <p>⚡ Priority: {lead.priority || "medium"}</p>
        </div>

        {/* UPDATE CLIENT INFO */}
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-white">Update Client Info</h3>

          <input
            value={industryInput}
            onChange={(e) => setIndustryInput(e.target.value)}
            onBlur={() => updateLead({ industry: industryInput })}
            placeholder="Industry"
            className="p-2 text-black w-full rounded"
          />

          <select
            value={lead.priority || "medium"} // ✅ FIXED
            onChange={(e) =>
              updateLead({ priority: e.target.value })
            }
            className="p-2 text-black w-full rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* 🔧 DEVELOPMENT */}
        <div className="mt-4">
          <h3 className="font-semibold text-white mb-2">Development</h3>

          <button
            onClick={() =>
              updateLead({ developmentStarted: !lead.developmentStarted })
            }
            className={`px-4 py-2 rounded ${
              lead.developmentStarted ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            {lead.developmentStarted ? "Started" : "Not Started"}
          </button>
        </div>

        {/* 💸 PAYMENT */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-white">Payment</h3>

          <input
            type="number"
            placeholder="Total Amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            onBlur={() => updateLead({ totalAmount })}
            className="p-2 text-black w-full rounded"
          />

          <input
            type="number"
            placeholder="Paid Amount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(Number(e.target.value))}
            onBlur={() => updateLead({ paidAmount })}
            className="p-2 text-black w-full rounded"
          />

          <select
            value={lead.paymentMethod || "upi"}
            onChange={(e) =>
              updateLead({ paymentMethod: e.target.value })
            }
            className="p-2 text-black w-full rounded"
          >
            <option value="upi">UPI</option>
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
          </select>

          {/* LIVE DATA */}
          <div className="text-gray-300 space-y-1">
            <p>💰 Total: ₹{totalAmount}</p>
            <p>✅ Paid: ₹{paidAmount}</p>
            <p>⏳ Pending: ₹{pendingAmount}</p>
            <p>📊 Status: {paymentStatus}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="text-gray-300 space-y-1">
          <p>📞 {lead.phone}</p>
          <p>🏢 {lead.company}</p>
        </div>

        <p className="text-gray-300">{lead.message}</p>

        {/* STATUS BUTTONS */}
        <div className="flex gap-2">
          <button onClick={() => updateStatus("new")} className="bg-blue-500 px-4 py-1 rounded">New</button>
          <button onClick={() => updateStatus("contacted")} className="bg-yellow-500 px-4 py-1 rounded">Contacted</button>
          <button onClick={() => updateStatus("closed")} className="bg-green-500 px-4 py-1 rounded">Closed</button>
        </div>

        {/* NOTES */}
        <div>
          <h2 className="font-semibold text-white mb-2">Notes</h2>

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