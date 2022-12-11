const { Router } = require('express')
const Usuario = require('../models/usuario')
const { request, response } = require('express')
const { validationResult, check } = require('express-validator')
const bcryptjs = require('bcryptjs')
const { comprobarJWT } = require('../helpers/jwt')

const router = Router()

router.post('/', [

    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    
], async function (req = request, res = response) {

    try { 
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const usuario = await Usuario.findOne({ email: req .body.email })
    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    }
    
    const validPassword = bcryptjs.compareSync(req.body.password, usuario.password)
    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'El password no es válido'
        })
    }
    const token = await comprobarJWT(usuario)

    res.json ({ _id : usuario._id, nombre : usuario.nombre, email : usuario.email, rol : usuario.rol,
         estado : usuario.estado, acess_token: token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({msj: error})
    }
})


module.exports = router
