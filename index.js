//Servidor con express
import express from "express";
import fs from "fs";
import https from "https";
import mongoose from "mongoose";
import Socket from "./middlewares/sockets";
import path from "path";
import router from "./routes";

//Conexion a la base de datos mongoDb
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/whombi";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.log(err));

const options = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
};
const app = express();
const servidor = https.createServer(options, app);
//estableciendo puerto del servidor globalmente
app.set("port", process.env.PORT || 4000);
//Uso de express.json para poder resibir desde el navegador datos json
app.use(express.json());
app.use(express.static("public"));
app.use("/api", router);

//Servidor de websockets
Socket(servidor);

servidor.listen(app.get("port"), () => {
  console.log("servidor inicializado");
});
