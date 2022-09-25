const {Router} = require('express');

const {crearInventario,
    obtenerInventarios,
    obtenerInventario,
    actualizarInventario,
    eliminarInventario,
} = require('../Controllers/ControladorInventario');


const router = Router();

router.get('/', obtenerInventarios);
router.get('/:id', obtenerInventario);
router.post('/', crearInventario);
router.put('/:id', actualizarInventario);
router.delete('/:id', eliminarInventario);





module.exports = router;


