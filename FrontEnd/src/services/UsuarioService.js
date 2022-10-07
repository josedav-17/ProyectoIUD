import { axiosConfig } from "../configuration/axiosConfig"

//obtiene todos los usuarios
const obtenerUsuarios = (estado = true) => {
    return axiosConfig.get('usuarios?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//crea un usuario
const crearUsuario = (data) => {
    return axiosConfig.post('usuarios', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//actualiza un usuario
const editarUsuarioPorID = (usuarioId, data) => {
    return axiosConfig.put('usuarios/'+usuarioId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//borra un usuario por ID
    const borrarUsuarioPorID = (usuarioId) => {
    return axiosConfig.delete('usuarios/'+usuarioId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//obtiene un usuario por ID
    const obtenerUsuarioPorID = (usuarioId) => {
    return axiosConfig.get('usuarios/'+usuarioId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerUsuarios,
    crearUsuario,
    editarUsuarioPorID,
    borrarUsuarioPorID,
    obtenerUsuarioPorID
}
