import mongoose, { Schema } from "mongoose;";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    todo: {
      type: [Schema.Types.ObjectId],
      ref: "Todo",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
