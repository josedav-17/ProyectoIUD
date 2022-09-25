const { Schema, model } = require('mongoose');

const EstadoEquipoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Nombre del equipo es requerido"]
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, "Estado del equipo es requerido"]
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


module.exports = model ('EstadoEquipo', EstadoEquipoSchema);