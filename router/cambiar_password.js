import { Router } from "express";
import { sendEmail } from "../controller/cambiar_password.js";

const router = Router();

router.post("/send-email", sendEmail);

export default router;
