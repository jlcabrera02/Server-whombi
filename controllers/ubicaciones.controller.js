import models from "../models";

export default {
  guardarUbicacion: async (data) => {
    try {
      const { latitud, longitud, presicion, idSocket } = data;

      const personal = new models.Ubicaciones({
        latitud,
        longitud,
        presicion,
        idSocket,
      });

      const registro = await personal.save();
      console.log(registro);
      /* res.status(200).json(registro); */
    } catch (err) {
      /* res.status(500).send(err);
      console.log(err); */
      //next(e);
    }
  },

  listarUbicacion: async (req, res, next) => {
    try {
      const consultar = await models.Ubicaciones.find({});
      return consultar;
    } catch (err) {
      return {
        message: "Ocurrió un error al consultar la BD",
      };
      next(err);
    }
  },

  obtenerUbicacion: async (req, res, next) => {
    try {
      const consultarUno = await models.Ubicaciones.findById(req.params.id);
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

  eliminarUbicacion: async (id) => {
    try {
      const eliminar = await models.Ubicaciones.remove({ idSocket: id });
      /* res.status(200).json(eliminar); */
    } catch (e) {
      /* res.status(500).send({
        message: "Ocurrrio un error al eliminar en la BD",
      }); */

      next(e);
    }
  },

  actualizarUbicacion: async (req, res, next) => {
    try {
      const { latitud, longitud, presicion } = req.body;

      const Aconductor = {
        latitud,
        longitud,
        presicion,
      };

      const actualizar = await models.Ubicaciones.findByIdAndUpdate(
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
