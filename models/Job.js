import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide job title"],
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
    },
    location: {
      type: String,
      required: [true, "Please provide job location"],
    },
    description: {
      type: String,
      required: [true, "Please provide job description"],
    },
    skills: {
      type: [String],
      required: [true, "Please provide job skills"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
