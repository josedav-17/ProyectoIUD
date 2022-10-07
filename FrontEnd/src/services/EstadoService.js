import { axiosConfig } from "../configuration/axiosConfig"

//obtiene todos los estados
const obtenerEstados = (estado = true) => {
    return axiosConfig.get('estados?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//crea un estado
const crearEstado = (data) => {
    return axiosConfig.post('estados', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}


//actualiza un estado
const editarEstadoPorID = (estadoId, data) => {
    return axiosConfig.put('estados/'+estadoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//borra un estado por ID
const borrarEstadoPorID = (estadoId) => {
    return axiosConfig.delete('estados/'+estadoId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//obtiene un estado por ID
const obtenerEstadoPorID = (estadoId) => {
    return axiosConfig.get('estados/'+estadoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerEstados,
    crearEstado,
    editarEstadoPorID,
    borrarEstadoPorID,
    obtenerEstadoPorID
}
