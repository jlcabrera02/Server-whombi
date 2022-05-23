import models from "../models";

export default {
  guardarUbicacion: async (data) => {
    try {
      const { _id, latitud, longitud, presicion, idSocket, status } = data;

      const personal = new models.Ubicaciones({
        _id,
        latitud,
        longitud,
        presicion,
        idSocket,
        status,
      });

      const registro = await personal.save();
      //console.log("Nuevo resgistro", registro);
    } catch (err) {
      //console.log("Mal resgistro", err);
    }
  },

  listarUbicacion: async (socket) => {
    try {
      const consultar = await models.Ubicaciones.find({
        status: true,
        rol: "conductor",
      });
      socket.broadcast.emit("sendUbicacion", consultar);
      //socket.broadcast.emit("sendUbicacion", consultar);
    } catch (err) {
      return {
        message: "Ocurrió un error al consultar la BD",
      };
    }
  },

  eliminarUbicacion: async ({ id }) => {
    try {
      const eliminar = await models.Ubicaciones.findByIdAndDelete(id);
      console.log("eliminacion", eliminar);
    } catch (e) {
      console.log("error al eliminar la base de datos");
    }
  },

  actualizarUbicacion: async (data) => {
    try {
      const { latitud, longitud, presicion, status, rol } = data;

      const Aubicacion = {
        latitud,
        longitud,
        presicion,
        status,
        rol,
      };

      const actualizar = await models.Ubicaciones.findByIdAndUpdate(
        data.id,
        Aubicacion
      );
      console.log("todo bien", actualizar);
    } catch (err) {
      console.log("error", err);
    }
  },

  actualizarStatus: async (data) => {
    try {
      const { status } = data;

      const Aubicacion = {
        status,
      };

      const actualizar = await models.Ubicaciones.findByIdAndUpdate(
        data.id,
        Aubicacion
      );
      console.log("todo bien en el status", actualizar);
    } catch (err) {
      console.log("error", err);
    }
  },
};
