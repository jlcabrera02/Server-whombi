import mongoose, { Schema } from "mongoose";

const users = new Schema({
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellidoP: { type: String, required: true },
  apellidoM: { type: String, required: true },
  rol: { type: String, required: true },
  lastSession: Date,
  createdA: { type: Date, default: Date.now() },
});

const user = mongoose.model("usuarios", users);
export default user;
