import mongoose, { Schema } from "mongoose";

const Conductor = new Schema({
  nombre: { type: String },
  apellidoP: { type: String },
  apellidoM: { type: String },
  direccion: { type: String },
  numeroCombi: { type: Number },
  perfil: { type: String },
  createdA: { type: Date, default: Date.now },
});

const Conductores = mongoose.model("conductor", Conductor);
export default Conductores;
