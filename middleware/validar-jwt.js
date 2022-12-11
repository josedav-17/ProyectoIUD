const jwt = require('jsonwebtoken')

const validarjwt = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const payload = jwt.verify(token , "123456");
        req.payload = payload;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token no valido verifique el token' });
    }
}

module.exports = {
    validarjwt
}

    


    





