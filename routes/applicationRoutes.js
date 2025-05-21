import { Router } from "express";
import {
  isCandidate,
  isRecruiter,
  protect,
} from "../middlewares/authMiddleware.js";
import {
  applyToJob,
  getApplicationsForJob,
  getMyApplications,
} from "../controllers/applicationController.js";

const router = Router();

// Only candidates can apply for jobs
router.post("/:jobId", protect, isCandidate, applyToJob);

// Only candidates can view their own applications
router.get("/me", protect, isCandidate, getMyApplications);

// Only recruiters can view applicants for a job
router.get("/job/:jobId", protect, isRecruiter, getApplicationsForJob);

export default router;
