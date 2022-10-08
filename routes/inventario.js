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

const router = Router()

router.get('/', getInventarios);
router.post('/', createInventario)
router.get('/:id', getInventarioByID)
router.put('/:id', updateInventarioByID)
router.delete('/:id', deleteInventarioByID)
router.post('/:id/images', uploadImageByID);
router.get('/:id/images', getImageByID);


module.exports = router