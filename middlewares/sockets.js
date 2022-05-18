import ubicacionesController from "../controllers/ubicaciones.controller";

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
    console.log("usuario conectado");
    console.log(socket.id);

    //Obtenemos desde el cliente la ubicación
    socket.on("ubicacion", (ubicacion) => {
      ubicacionesController.guardarUbicacion({
        idSocket: socket.id,
        latitud: ubicacion.latitud,
        longitud: ubicacion.longitud,
        presicion: ubicacion.presicion,
      });
      /* console.log(ubicacion); */

      /* socket.emit("sendUbicacion", ubicacion); */
      //Mandamos a todos los usuarios la ubicación exepto al que la envía
      socket.broadcast.emit("sendUbicacion", ubicacion);

      socket.on("disconnect", () => {
        console.log(`El usuario con el id ${socket.id} se a desconectado`);
      });
    });
  });
}

export default Socket;
