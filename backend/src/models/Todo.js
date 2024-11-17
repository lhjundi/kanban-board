import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        ret._id = ret._id.toString();
        return ret;
      },
    },
  }
);

export const Todo = mongoose.model("Todo", todoSchema);
