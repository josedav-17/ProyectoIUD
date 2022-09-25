const { Router } = require('express');
const {  crearTipoEquipo,
    obtenerTipoEquipos,
    obtenerTipoEquipo,
    actualizarTipoEquipo,
    eliminarTipoEquipo
} = require('../Controllers/ControladortipoEquipo');

const router = Router();

router.post('/', crearTipoEquipo);
router.get('/', obtenerTipoEquipos);
router.get('/:id', obtenerTipoEquipo);
router.put('/:id', actualizarTipoEquipo);
router.delete('/:id', eliminarTipoEquipo);

module.exports = router;
    