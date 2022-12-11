const { Router } = require('express')
const { 
    createEstado, 
    getEstados, 
    getEstadoByID,
    updateEstadoByID,
    deleteEstadoByID
} = require('../controllers/estado')
const { validarjwt } = require('../middleware/validar-jwt')
const { validarRol } = require('../middleware/validarRolAdmin')

const router = Router()


router.post('/', [validarjwt, validarRol], createEstado)
router.get('/', [validarjwt, validarRol], getEstados)
router.get('/:id', [validarjwt, validarRol], getEstadoByID)
router.put('/:id', [validarjwt, validarRol], updateEstadoByID)
router.delete('/:id', [validarjwt, validarRol], deleteEstadoByID)

module.exports = router

