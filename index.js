//Servidor con express
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const servidor = http.createServer(app);

//Inicializamos socketio
const socketio = require("socket.io");

const io = socketio(servidor, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    /* credentials: true, */
  },
});

//Funcionalidad de socket.io en el servidor
io.on("connection", (socket) => {
  console.log("usuario conectado");
  console.log(socket.id);

  socket.on("ubicacion", (ubicacion) => {
    console.log(ubicacion);

    socket.emit("sendUbicacion", ubicacion);
    socket.broadcast.emit("sendUbicacion", ubicacion);
  });

  /*   let nombre;

  socket.on("conectado", (nomb) => {
    nombre = nomb;
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: `${nombre} ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (nombre, mensaje) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} ha abandonado la sala`,
    });
  }); */
});

servidor.listen(4000, () => console.log("servidor inicializado"));
