import Router from "express-promise-router";
import conductoresRouter from "./conductores.router";
import authRouter from "./auth.router";
const router = Router();

router.use("/conductor", conductoresRouter);
router.use("/auth", authRouter);

export default router;
