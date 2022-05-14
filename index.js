//Servidor con express
import express from "express";
import http from "http";
import Socket from "./middlewares/sockets";
import router from "./routes";

const app = express();
const servidor = http.createServer(app);
//estableciendo puerto del servidor globalmente
app.set("port", process.env.PORT || 4000);

app.use("/api", router);

//Servidor de websockets
Socket(servidor);

servidor.listen(app.get("port"), () => console.log("servidor inicializado"));
