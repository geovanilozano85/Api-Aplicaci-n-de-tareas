import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/tareas.js";

const router = Router();

router.get("/consult-tasks/:id", getTasks);
router.post("/save-task", createTask);
router.put("/update-task", updateTask);
router.delete("/delete-task/:id", deleteTask);

export default router;
