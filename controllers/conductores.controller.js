import models from "../models";

export default {
  guardarConductor: async (req, res, next) => {
    try {
      const { apellidoP, apellidoM, direccion, numeroCombi, perfil } = req.body;

      const personal = new models.Conductores({
        nombre: req.body.nombre,
        apellidoP,
        apellidoM,
        direccion,
        numeroCombi,
        perfil,
      });

      const registro = await personal.save();
      console.log(registro);
      res.status(200).json(registro);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
      //next(e);
    }
  },

  listarConductores: async (req, res, next) => {
    try {
      const consultar = await models.Conductores.find();
      res.json(consultar);
    } catch (err) {
      res.status(500),
        send({
          message: "Ocurrió un error al consultar la BD",
        });
      next(err);
    }
  },

  obtenerConductor: async (req, res, next) => {
    try {
      const consultarUno = await models.Conductores.findById(req.params.id);
      if (!consultarUno) {
        res.status(404).send({
          message: "El registro en la BD no existe",
        });
      } else {
        res.status(200).json(consultarUno);
      }
    } catch (e) {
      res.status(500).send({
        message: "Error en el servidor de la BD",
      });

      next(e);
    }
  },

  eliminarConductor: async (req, res, next) => {
    try {
      const eliminar = await models.Conductores.findByIdAndDelete(
        req.params.id
      );
      res.status(200).json(eliminar);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrrio un error al eliminar en la BD",
      });

      next(e);
    }
  },

  actualizarConductor: async (req, res, next) => {
    try {
      const { nombre, apellidoP, apellidoM, direccion, numeroCombi, perfil } =
        req.body;

      const Aconductor = {
        nombre,
        apellidoP,
        apellidoM,
        direccion,
        numeroCombi,
        perfil,
      };

      const actualizar = await models.Conductores.findByIdAndUpdate(
        req.params.id,
        Aconductor
      );
      res.status(200).json(actualizar);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error al actualizar información",
      });
      next(e);
    }
  },
};
