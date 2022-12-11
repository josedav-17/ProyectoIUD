const jwt = require('jsonwebtoken');

const validarRol = (req, res, next) => {
    if (!req.payload) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    const { rol } = req.payload;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegios para realizar esta accion'
        });
    }
    next();
}


module.exports = {
    validarRol
};

