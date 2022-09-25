const { Schema, model } = require('mongoose');

//datos que se van a guardar en la base de datos
const TipoEquipoSchema = new Schema({
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

//para poder usar el modelo fuera de este archivo debo exportarlo
module.exports = model ('TipoEquipo', TipoEquipoSchema);