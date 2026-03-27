import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MANAGER", "EDITOR"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export { User };
export default User;
