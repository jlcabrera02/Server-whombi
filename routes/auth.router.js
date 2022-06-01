import routerx from "express-promise-router";
import authController from "../controllers/auth.controller";

const router = routerx();

router.post("/", authController.auth);
router.post("/register", authController.crearUsuario);
router.put("/update", authController.actualizarUsuario);
router.post("/login", authController.auth);

export default router;
