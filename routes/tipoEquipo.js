const { Router } = require('express')
const { 
    createTipoEquipo, 
    getTiposEquipo, 
    getTipoEquipoByID,
    updateTipoEquipoByID,
    deleteTipoEquipoByID
} = require('../controllers/tipoEquipo')

const router = Router()


router.post('/', createTipoEquipo)
router.get('/', getTiposEquipo)
router.get('/:id', getTipoEquipoByID)
router.put('/:id', updateTipoEquipoByID)
router.delete('/:id', deleteTipoEquipoByID)

module.exports = router

