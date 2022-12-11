const { Router } = require('express')
const { createUsuario, getUsuarios, getUsuarioByID, updateUsuarioByID, deleteUsuarioByID } = require('../controllers/usuario')
const { validarRol } = require('../middleware/validarRolAdmin')
const { validarjwt } = require('../middleware/validar-jwt')

const router = Router()

router.post('/',[validarjwt, validarRol], createUsuario)
router.get('/', [validarjwt, validarRol], getUsuarios)
router.get('/:id', [validarjwt, validarRol], getUsuarioByID)
router.put('/:id', [validarjwt, validarRol ], updateUsuarioByID)
router.delete('/:id', [validarjwt, validarRol ], deleteUsuarioByID)

module.exports = router

