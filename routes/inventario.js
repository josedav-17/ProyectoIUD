const { Router } = require('express')

const { 
    getInventarios,
    createInventario,
    getInventarioByID,
    updateInventarioByID,
    deleteInventarioByID,
    uploadImage
} = require('../controllers/inventario')

const router = Router()

router.get('/', getInventarios);
router.post('/', createInventario)
router.get('/:id', getInventarioByID)
router.put('/:id', updateInventarioByID)
router.delete('/:id', deleteInventarioByID)
router.put('/upload/:id', uploadImage)



module.exports = router