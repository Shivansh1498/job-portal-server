import { Router } from "express";
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} from "../controllers/jobController.js";
import { isRecruiter, protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(getJobs).post(protect, isRecruiter, createJob);
router
  .route("/:id")
  .get(getJobById)
  .put(protect, isRecruiter, updateJob)
  .delete(protect, isRecruiter, deleteJob);

export default router;
