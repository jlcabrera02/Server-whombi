import Router from "express-promise-router";
import conductoresRouter from "./conductores.router";
const router = Router();

router.use("/conductor", conductoresRouter);

export default router;
