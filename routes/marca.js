const { Router } = require('express')
const { 
    createMarca, 
    getMarcas, 
    getMarcaByID,
    updateMarcaByID,
    deleteMarcaByID
}= require('../controllers/marca')

const router = Router()

router.post('/', createMarca)
router.get('/', getMarcas)
router.get('/:id', getMarcaByID)
router.put('/:id', updateMarcaByID)
router.delete('/:id', deleteMarcaByID)

module.exports = router

