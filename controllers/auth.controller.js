import models from "../models";
import token from "./token.controller";
import response from "./response.controller";

export default {
  crearUsuario: async (req, res) => {
    try {
      const {
        usuario,
        email,
        password,
        nombre,
        apellidoP,
        apellidoM,
        lastSession,
        rol,
      } = req.body;

      const agregar = new models.User({
        usuario,
        email,
        password,
        nombre,
        apellidoP,
        apellidoM,
        lastSession,
        rol,
        lastSession: new Date(Date.now()).toISOString(),
      });

      const registro = await agregar.save();
      const generadorToken = token.generar(registro);

      res.status(200).json({ ...registro["_doc"], ...generadorToken });
    } catch (err) {
      res.status(409).send(response.s409);
    }
  },

  actualizarUsuario: async (req, res) => {
    try {
      const { password, newPassword, nombre, apellidoP, apellidoM, usuario } =
        req.body;

      const userAuth = await token.buscarUsuario({ usuario, password });

      if (!userAuth.ok) throw userAuth;

      const tokenValidation = token.verificar(req.headers["authorization"]);

      if (!tokenValidation.ok) throw tokenValidation;

      const user = {
        nombre,
        apellidoP,
        apellidoM,
        password: newPassword,
        lastSession: Date.now(),
      };

      const actualizar = await models.User.findByIdAndUpdate(
        userAuth._id,
        user
      );

      res.status(200).json(actualizar);
    } catch (err) {
      res.status(401).send(err);
    }
  },

  auth: async (req, res) => {
    const { usuario, password } = req.body;
    const validation = await token.buscarUsuario({ usuario, password });

    if (validation.ok) {
      let newToken = token.generar(validation);
      res.status(200).send(newToken);
    } else {
      res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });
    }
  },
};
