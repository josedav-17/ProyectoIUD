const EstadoEquipo = require('../Models/EstadoEquipo');
const { response, request } = require('express');

//crear un estado de equipo en la base de datos
const crearEstadoEquipo = async (req = request, res = response) => {
    try{
        const nombre = (req.body.nombre) ? req.body.nombre.toUpperCase(): '';
        const estadoEquipoBD = await EstadoEquipo.findOne({ nombre })
        if(estadoEquipoBD){
            return res.status(400).json({msg: 'Ya existe nombre'})}
        const datos = { nombre }
        const estadoEquipo = new EstadoEquipo(datos)
        console.log(estadoEquipo)
        await estadoEquipo.save()
        res.status(201).json(estadoEquipo)
    }catch(e){
      console.log(e)
      return res.status(500).json({
        msg: "Error al crear estado de equipo"
      })
    }
}

//consulta todos los estados de equipo
const consultarEstadoEquipo = async (req = request, res = response) => {
    try{
        console.log(req.query)
        const estado = req.query.estado
        const query = {estado: estado}
        const estadosEquipoDB = await EstadoEquipo.find(query)
        return res.json(estadosEquipoDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: "Error al consultar estado de equipo"})  
    }
}

//consulta un estado de equipo por id
const consultarEstadoEquipoId = async (req = request, res = response) => {
    try{
        console.log(req.query)
        console.log(req.params)
        const estado = req.query.estado
        const id = req.params.id
        const query = {estado: estado, _id: id}
        const estadoEquipoDB = await EstadoEquipo.findOne(query)
        return res.json(estadoEquipoDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: "Error al consultar estado de equipo"})
    }
}

//actualiza un estado de equipo por id
const actualizarEstadoEquipo = async (req = request, res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        const estadoEquipoDB = await EstadoEquipo.findByIdAndUpdate(id, data, {new: true})
        return res.json(estadoEquipoDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: "Error al actualizar estado de equipo"})
    }
}

//elimina un estado de equipo por id
const eliminarEstadoEquipo = async (req = request, res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const estadoEquipoDB = await EstadoEquipo.findByIdAndUpdate(id, {estado: false}, {new: true})
        return res.json(estadoEquipoDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: "Error al eliminar estado de equipo"})
    }
}

module.exports = {
    crearEstadoEquipo,
    consultarEstadoEquipo,
    consultarEstadoEquipoId,
    actualizarEstadoEquipo,
    eliminarEstadoEquipo
}
