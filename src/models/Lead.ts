import mongoose, { Schema, model, models } from "mongoose";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    location: { type: String },
    status: {
      type: String,
      enum: ["UNASSIGNED", "FOLLOWING", "CONVERTED"],
      default: "UNASSIGNED",
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Lead = models.Lead || model("Lead", LeadSchema);
