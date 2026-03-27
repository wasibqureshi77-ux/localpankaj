import mongoose, { Schema, model, models } from "mongoose";

const TechnicianSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Technician = models.Technician || model("Technician", TechnicianSchema);
