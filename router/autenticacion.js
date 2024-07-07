import { Router } from "express";
import { login } from "../controller/autenticacion.js";
const router = Router();

router.post("/register", login);

export default router;
