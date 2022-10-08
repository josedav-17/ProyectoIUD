const { Router } = require('express')
const { 
    createEstado, 
    getEstados, 
    getEstadoByID,
    updateEstadoByID,
    deleteEstadoByID
} = require('../controllers/estado')

const router = Router()


router.post('/', createEstado)
router.get('/', getEstados)
router.get('/:id', getEstadoByID)
router.put('/:id', updateEstadoByID)
router.delete('/:id', deleteEstadoByID)

module.exports = router

