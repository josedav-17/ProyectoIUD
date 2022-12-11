const { Router } = require('express')
const { 
    createMarca, 
    getMarcas, 
    getMarcaByID,
    updateMarcaByID,
    deleteMarcaByID
}= require('../controllers/marca')
const { validarRol } = require('../middleware/validarRolAdmin')
const { validarjwt } = require('../middleware/validar-jwt')

const router = Router()

router.post('/', [validarjwt, validarRol], createMarca)
router.get('/', [validarjwt, validarRol], getMarcas)
router.get('/:id', [validarjwt, validarRol], getMarcaByID)
router.put('/:id', [validarjwt, validarRol], updateMarcaByID)
router.delete('/:id', [validarjwt, validarRol], deleteMarcaByID)

module.exports = router

