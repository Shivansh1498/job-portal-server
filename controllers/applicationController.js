import Application from "../models/Application.js";
import Job from "../models/Job.js";

// @desc    Apply to a job
// @route   POST /api/applications/:jobId
// @access  Private (Candidate)
export const applyToJob = async (req, res) => {
  const { coverLetter } = req.body;
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      coverLetter,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply Error: ", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get applications by current user (candidate)
// @route   GET /api/applications/my
// @access  Private
export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user._id })
      .populate("job")
      .sort({ createdAt: -1 });
    res.json({
      message: "Applications fetched successfully",
      applications: apps,
    });
  } catch (error) {
    console.error("Get My Applications Error: ", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get applications for a recruiter's jobs
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter only)
export const getApplicationsForJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const apps = await Application.find({ job: jobId }).populate(
      "applicant",
      "name email"
    );
    res.json({
      message: "Applications fetched successfully",
      applications: apps,
    });
  } catch (error) {
    console.error("Get Applications for Job Error: ", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
