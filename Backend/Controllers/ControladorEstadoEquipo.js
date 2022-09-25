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
        const estadoEquipo = await EstadoEquipo.find()
        res.status(200).json(estadoEquipo)
    }catch(e){
      console.log(e)
      return res.status(500).json({
        msg: "Error al consultar estado de equipo"
      })
    }
}

//consulta un estado de equipo por id
const consultarEstadoEquipoId = async (req = request, res = response) => {
    try{
        const { id } = req.params
        const estadoEquipo = await EstadoEquipo.findById(id)
        res.status(200).json(estadoEquipo)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: "Error al consultar estado de equipo por id"
        })
        }
}

//actualiza un estado de equipo por id
const actualizarEstadoEquipo = async (req = request, res = response) => {
    try{
        const { id } = req.params
        const { nombre } = req.body
        const datos = { nombre }
        const estadoEquipo = await EstadoEquipo.findByIdAndUpdate(id, datos, {new: true})
        res.status(200).json(estadoEquipo)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: "Error al actualizar estado de equipo"
        })
        }
}

//elimina un estado de equipo por id
const eliminarEstadoEquipo = async (req = request, res = response) => {
    try{
        const { id } = req.params
        const estadoEquipo = await EstadoEquipo.findByIdAndDelete(id)
        res.status(200).json(estadoEquipo)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: "Error al eliminar estado de equipo"
        })
        }
}

module.exports = {
    crearEstadoEquipo,
    consultarEstadoEquipo,
    consultarEstadoEquipoId,
    actualizarEstadoEquipo,
    eliminarEstadoEquipo
}
