//Servidor con express
import app from "./app";
import fs from "fs";
import https from "https";
import mongoose from "mongoose";
import Socket from "./middlewares/sockets";

//Conexion a la base de datos mongoDb
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/whombi";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.log(err));

//Opciones con los certificados autofimados para la solicitud https
const options = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
};

//Creamos el sevidor atravez de https
const servidor = https.createServer(options, app);

//Servidor de websockets pasadole el servidor
Socket(servidor);

//Levantamos el servidor
servidor.listen(app.get("port"), () => {
  console.log("servidor inicializado");
});
