import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    link: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    clickedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Click", clickSchema);