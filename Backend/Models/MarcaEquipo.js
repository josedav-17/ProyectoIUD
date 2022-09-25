const { Schema, model } = require('mongoose');

const MarcaEquipoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Nombre de la marca es requerido"]
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, "Estado de la marca es requerido"]
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});


module.exports = model ('MarcaEquipo', MarcaEquipoSchema);