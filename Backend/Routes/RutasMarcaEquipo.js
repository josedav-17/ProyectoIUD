const { Router } = require('express');
const {crearMarcaEquipo,
    obtenerMarcasEquipos,
    obtenerMarcaEquipo,
    actualizarMarcaEquipo,
    eliminarMarcaEquipo } = require('../Controllers/ControladorMarcaEquipo');

const router = Router();

router.post('/', crearMarcaEquipo);
router.get('/', obtenerMarcasEquipos);
router.get('/:id', obtenerMarcaEquipo);
router.put('/:id', actualizarMarcaEquipo);
router.delete('/:id', eliminarMarcaEquipo);

module.exports = router;
