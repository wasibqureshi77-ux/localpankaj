import mongoose, { Schema, model, models } from "mongoose";

const CounterSchema = new Schema({
  id: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 }
});

export const Counter = models.Counter || model("Counter", CounterSchema);
