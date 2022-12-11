const { Router } = require('express')
const { 
    createTipoEquipo, 
    getTiposEquipo, 
    getTipoEquipoByID,
    updateTipoEquipoByID,
    deleteTipoEquipoByID
} = require('../controllers/tipoEquipo')
const { validarjwt } = require('../middleware/validar-jwt')
const { validarRol } = require('../middleware/validarRolAdmin')

const router = Router()

router.post('/', [validarjwt, validarRol], createTipoEquipo)
router.get('/', [validarjwt, validarRol], getTiposEquipo)
router.get('/:id', [validarjwt, validarRol], getTipoEquipoByID)
router.put('/:id', [validarjwt, validarRol], updateTipoEquipoByID)
router.delete('/:id', [validarjwt, validarRol], deleteTipoEquipoByID)

module.exports = router

