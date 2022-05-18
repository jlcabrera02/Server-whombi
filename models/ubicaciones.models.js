import mongoose, { Schema } from "mongoose";

const Ubicacion = new Schema({
  latitud: { type: String },
  longitud: { type: String },
  presicion: { type: String },
  idSocket: { type: String },
});

const Ubicaciones = mongoose.model("ubicacion", Ubicacion);
export default Ubicaciones;
