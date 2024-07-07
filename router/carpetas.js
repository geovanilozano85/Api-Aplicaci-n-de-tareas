import { Router } from "express";
import {
  getFolders,
  saveFolder,
  updateFolder,
  deleteFolder,
} from "../controller/carpetas.js";

const router = Router();

router.get("/get-folders/:id", getFolders);
router.post("/save-folder", saveFolder);
router.put("/update-folder", updateFolder);
router.delete("/delete-folder/:id", deleteFolder);

export default router;
