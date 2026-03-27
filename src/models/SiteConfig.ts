import mongoose, { Schema, model, models } from "mongoose";

const SiteConfigSchema = new Schema(
  {
    logo: { type: String },
    phone: { type: String },
    email: { type: String },
    themeColor: { type: String, default: "#000000" },
    workingHours: { type: String },
    heroText: { type: String },
    logoSizeDesktop: { type: Number, default: 100 },
    logoSizeMobile: { type: Number, default: 50 },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development") {
   delete models.SiteConfig;
}
export const SiteConfig = models.SiteConfig || model("SiteConfig", SiteConfigSchema);
