const { Router } = require('express')

const { 
    getInventarios,
    createInventario,
    getInventarioByID,
    updateInventarioByID,
    deleteInventarioByID,
    uploadImageByID,
    getImageByID
} = require('../controllers/inventario')
const { validarjwt } = require('../middleware/validar-jwt')

const router = Router()

router.get('/', [validarjwt], getInventarios)
router.post('/', [validarjwt], createInventario)
router.get('/:id', [validarjwt], getInventarioByID)
router.put('/:id', [validarjwt], updateInventarioByID)
router.delete('/:id', [validarjwt], deleteInventarioByID)
router.post('/:id/images', [validarjwt], uploadImageByID)
router.get('/:id/images', [validarjwt], getImageByID)


module.exports = router