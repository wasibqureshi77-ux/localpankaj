import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // Cloudinary URL
    serviceId: { 
      type: Schema.Types.ObjectId, 
      ref: "Service", 
      required: true 
    },
    subCategory: { 
      type: String, 
      enum: ["SERVICE", "REPAIR", "INSTALLATION"], 
      required: true 
    },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
