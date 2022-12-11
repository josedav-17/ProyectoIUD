const jtw = require('jsonwebtoken');

const comprobarJWT = (usuario) => {
    const payload = { _id : usuario._id, nombre : usuario.nombre, email : usuario.email, rol : usuario.rol, estado : usuario.estado };
    const token = jtw.sign(payload, "123456", { expiresIn: '6h' });
    return token
}

module.exports = {
    comprobarJWT
}


