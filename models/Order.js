const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let orderSchema = new Schema(
  {
    fecha: {
      type: Date,
      required: true,
    },
    hora: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    ancho: {
      type: Number,
      required: true,
    },
    alto: {
      type: Number,
      required: true,
    },
    largo: {
      type: Number,
      required: true,
    },
    peso: {
      type: Number,
      required: true,
    },
    isDelicado: {
      type: Boolean,
      required: true,
    },
    nombreRemitente: {
      type: String,
      required: true,
    },
    idRemitente: {
      type: String,
      required: true,
    },
    direccionRecogida: {
      type: String,
      required: true,
    },
    ciudadRecogida: {
      type: String,
      required: true,
    },
    nombreDestinatario: {
      type: String,
      required: true,
    },
    idDestinatario: {
      type: String,
      required: true,
    },
    direccionEnvio: {
      type: String,
      required: true,
    },
    ciudadEnvio: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId, ref: 'User'
    }
  },
  {
    collection: "orders",
  }
);

module.exports = mongoose.model("Order", orderSchema);
