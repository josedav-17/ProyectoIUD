import { axiosConfig } from "../configuration/axiosConfig"

//obtiene todos los inventarios
const obtenerInventarios = (estado = true) => {
    return axiosConfig.get('inventarios?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//crea un inventario
const crearInventario = (data) => {
    return axiosConfig.post('inventarios', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//actualiza un inventario
const editarInventarioPorID = (inventarioId, data) => {
    return axiosConfig.put('inventarios/'+inventarioId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//borra un inventario por ID
    const borrarInventarioPorID = (inventarioId) => {
    return axiosConfig.delete('inventarios/'+inventarioId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//obtiene un inventario por ID
    const obtenerInventarioPorID = (inventarioId) => {
    return axiosConfig.get('inventarios/'+inventarioId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//obtener los datos de usuario, marca, tipo de equipo y estado
const obtenerDatos = () => {
    return axiosConfig.get('inventarios/datos', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}


export {
    obtenerInventarios,
    crearInventario,
    editarInventarioPorID,
    borrarInventarioPorID,
    obtenerInventarioPorID
}
