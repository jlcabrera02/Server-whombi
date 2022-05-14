import Router from "express-promise-router";

const router = Router();

router.get("/auth", (req, res) => {
  res.send("<h1>Inicio de secion</h1>");
});

export default router;
