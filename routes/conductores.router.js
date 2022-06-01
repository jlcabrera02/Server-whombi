import routerx from "express-promise-router";
import conductoresController from "../controllers/conductores.controller";

const router = routerx();

router.get("/obtener", conductoresController.listarConductores);
router.get("/obtener/:id", conductoresController.obtenerConductor);
router.post("/guardar", conductoresController.guardarConductor);
router.post("/ejemplo", conductoresController.ejemplo);
router.put("/actualizar/:id", conductoresController.actualizarConductor);
router.delete("/eliminar", conductoresController.eliminarConductor);

export default router;
