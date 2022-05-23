import mongoose, { Schema } from "mongoose";

const Ubicacion = new Schema({
  _id: { type: String },
  latitud: { type: String },
  longitud: { type: String },
  presicion: { type: String },
  status: { type: Boolean },
  rol: { type: String },
});

const Ubicaciones = mongoose.model("ubicacion", Ubicacion);
export default Ubicaciones;
