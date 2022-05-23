import ubicacionesController from "../controllers/ubicaciones.controller";
import models from "../models";

function Socket(servidor) {
  //Inicializamos socketio
  const socketio = require("socket.io");

  const io = socketio(servidor, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Access-Control-Allow-Origin"],
      /* credentials: true, */
    },
  });

  //Funcionalidad de socket.io en el servidor
  io.on("connection", (socket) => {
    //Mandamos a consola alerta de nuevo usuario más el id de usuario

    ubicacionesController.guardarUbicacion({
      _id: socket.id,
      latitud: 0,
      longitud: 0,
      presicion: 0,
      status: 0,
    });

    //Obtenemos desde el cliente la ubicación
    socket.on("ubicacion", (ubicacion) => {
      console.log("Actualizacion", socket.id);
      ubicacionesController.actualizarUbicacion({
        id: socket.id,
        latitud: ubicacion.latitud,
        longitud: ubicacion.longitud,
        presicion: ubicacion.presicion,
        status: 1,
        rol: ubicacion.rol,
      });

      ubicacionesController.listarUbicacion(socket);

      socket.on("disconnect", () => {
        console.log("desconectado", socket.id);
        ubicacionesController.eliminarUbicacion({
          id: socket.id,
          status: 0,
        });
      });
    });
  });
}

export default Socket;
