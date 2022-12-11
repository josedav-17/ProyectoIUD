const express = require('express');

const app = express(); 
const cors = require('cors');

const tipoEquipo = require('./routes/tipoEquipo')
const estado = require('./routes/estado')
const marca = require('./routes/marca')
const usuario = require('./routes/usuario')
const inventario = require('./routes/inventario')
const auth = require('./routes/auth')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use('/api/tipoequipos', tipoEquipo)
app.use('/api/estados', estado) 
app.use('/api/marcas', marca) 
app.use('/api/usuarios', usuario);
app.use('/api/inventarios', inventario)
app.use('/login', auth)

app.get("*", (req, res) => {
    return res.status(404).json({
        msj: 'pagina no encontrada'
    });
});

module.exports = app;