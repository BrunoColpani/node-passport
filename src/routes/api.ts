import { Router } from "express";

/* controllers */
import * as ApiController from "../controllers/apiController";

/* Middleware */
import { privateRoute } from "../config/passport";

const router = Router();

router.post("/register", ApiController.register);
//router.post("/login", ApiController.login);
router.post("/login", privateRoute, ApiController.login); // Logging in with Header Information

router.get("/list", privateRoute, ApiController.list);

export default router;
