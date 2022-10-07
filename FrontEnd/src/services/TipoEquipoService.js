import { axiosConfig } from "../configuration/axiosConfig"

//obtiene todos los tipos de equipo
const obtenerTiposEquipos = (estado = true) => {
    return axiosConfig.get('tipoequipos?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//crea un tipo de equipo
    const crearTipoEquipo = (data) => {
        return axiosConfig.post('tipoequipos', data, {
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
    


//actualiza un tipo de equipo
const editarTipoEquipoPorID = (tipoId, data) => {
    return axiosConfig.put('tipoequipos/'+tipoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//borra un tipo de equipo por ID
 const borrarTipoEquipoPorID = (tipoId) => {
    return axiosConfig.delete('tipoequipos/'+tipoId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//obtiene un tipo de equipo por ID
 const obtenerTipoEquipoPorID = (tipoId) => {
    return axiosConfig.get('tipoequipos/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerTiposEquipos,
    crearTipoEquipo,
    editarTipoEquipoPorID,
    borrarTipoEquipoPorID,
    obtenerTipoEquipoPorID
}