const { Schema, model } = require('mongoose');

//datos que se van a guardar en la base de datos
const UsuarioSchema = Schema({
    //el usuario se crea solo con el nombre y el email
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    //estado es dato opcional
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    //fecha de creacion y actualizacion
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    } 
});



//para poder usar el modelo fuera de este archivo debo exportarlo
module.exports = model ('Usuario', UsuarioSchema);
