const { Router } = require('express')
const { 
    createUsuario, 
    getUsuarios, 
    getUsuarioByID,
    updateUsuarioByID,
    deleteUsuarioByID
} = require('../controllers/usuario')

const router = Router()


router.post('/', createUsuario)
router.get('/', getUsuarios)
router.get('/:id', getUsuarioByID)
router.put('/:id', updateUsuarioByID)
router.delete('/:id', deleteUsuarioByID)

module.exports = router

