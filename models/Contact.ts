import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  subject: String,
  message: String,

  // ✅ CRM fields
  status: {
    type: String,
    enum: ["new", "contacted", "closed"],
    default: "new",
  },

  notes: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],

  // 🔥 NEW CLIENT FIELDS
  clientId: {
    type: String,
  },

  industry: {
    type: String,
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },

}, { timestamps: true });

export default mongoose.models.Contact ||
mongoose.model("Contact", ContactSchema);