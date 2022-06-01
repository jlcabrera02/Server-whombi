import app from "../app";
import Jwt from "jsonwebtoken";
import models from "../models";

export default {
  buscarUsuario: async (data) => {
    try {
      const usuario = await models.User.findOne({
        usuario: data.usuario,
        password: data.password,
      });
      if (usuario) {
        return { ok: true, ...usuario["_doc"] };
      } else {
        return {
          ok: false,
          message: "Usuario y contraseña incorrectas",
        };
      }
    } catch (error) {
      return {
        ok: false,
        message: "Error con la peticion",
      };
    }
  },
  verificar: (header) => {
    if (!header) {
      return {
        ok: false,
        message: "Error al recibir la datos de autorización",
      };
    }

    let token = header.replace("Bearer ", ""),
      response;
    Jwt.verify(token, app.get("key"), (err, token) => {
      if (err) {
        response = {
          ok: false,
          msg: "token invalido o caduco",
        };
      } else {
        response = {
          ok: true,
          msg: "token válido",
          token,
        };
      }
    });

    return response;
  },

  generar: (user) => {
    const payload = {
      check: true,
      userId: user._id,
      userName: user.nombre,
    };
    const token = Jwt.sign(payload, app.get("key"), {
      expiresIn: 60 * 10,
    });

    return {
      message: "Autenticado",
      token,
      ...user["_doc"],
    };
  },
};
