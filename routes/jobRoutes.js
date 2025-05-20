import { Router } from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
} from "../controllers/jobController.js";
import { isRecruiter, protect } from "../middlewares/authMiddleware.js";

const router = Router();

// Public
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Private
router.post("/", protect, isRecruiter, createJob);

export default router;
