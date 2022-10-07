import { axiosConfig } from "../configuration/axiosConfig"

//obtiene todas las marcas
const obtenerMarcas = (estado = true) => {
    return axiosConfig.get('marcas?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//crea una marca
const crearMarca = (data) => {
    return axiosConfig.post('marcas', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//actualiza una marca
const editarMarcaPorID = (marcaId, data) => {
    return axiosConfig.put('marcas/'+marcaId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//borra una marca por ID
    const borrarMarcaPorID = (marcaId) => {
    return axiosConfig.delete('marcas/'+marcaId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//obtiene una marca por ID
    const obtenerMarcaPorID = (marcaId) => {
    return axiosConfig.get('marcas/'+marcaId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerMarcas,
    crearMarca,
    editarMarcaPorID,
    borrarMarcaPorID,
    obtenerMarcaPorID
}
