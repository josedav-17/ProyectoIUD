const { Router } = require('express');

const { crearEstadoEquipo,
    consultarEstadoEquipo,
    consultarEstadoEquipoId,
    actualizarEstadoEquipo,
    eliminarEstadoEquipo
} = require('../Controllers/ControladorEstadoEquipo');

const router = Router();

router.post('/', crearEstadoEquipo);
router.get('/', consultarEstadoEquipo);
router.get('/:id', consultarEstadoEquipoId);
router.put('/:id', actualizarEstadoEquipo);
router.delete('/:id', eliminarEstadoEquipo);

module.exports = router;
