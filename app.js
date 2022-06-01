import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import config from "./configs/config";

//Guardamos en la variable app la instacia de express
const app = express();
//estableciendo puerto del servidor globalmente
app.set("port", process.env.PORT || 4000);
//Eestableciendo llave de token jwt
app.set("key", config.key);

//Uso de bodyParse.json y bodyParse.urlencode para poder recibir desde el navegador datos json y poder utilizar el req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Creamos un lugar para esteblecer recursos estaticos que sirvan en nuestro servidor
app.use(express.static("public"));
//primer parametro para comenzar a proporcionar datos a nuestros clientes
app.use("/api", router);

export default app;
