import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const { title, company, location, description, skills } = req.body;

  try {
    const job = await Job.create({
      title,
      company,
      location,
      description,
      skills,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("Create Job Error: ", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getJobs = async (_, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    res.json(jobs);
  } catch (error) {
    console.log("Get All Jobs Error: ", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    console.log("Get Job Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this job",
      });
    }

    const updates = req.body;
    Object.assign(job, updates);

    const updatedJob = await job.save();
    res.json({
      success: true,
      updatedJob,
    });
  } catch (error) {
    console.log("Update Job Error: ", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this job",
      });
    }

    await job.remove();
    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log("Delete Job Error: ", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
