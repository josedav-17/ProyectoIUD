const MarcaEquipo = require('../Models/MarcaEquipo');
const { response, request } = require('express');

//crear una marca de equipo en la base de datos
const crearMarcaEquipo = async(req = request, res = response) => {
    try{
        //console.log(req.body)
        const nombre = (req.body.nombre) 
        ? req.body.nombre.toUpperCase()
        : '';
        const marcaBD = await MarcaEquipo.findOne({ nombre })
        if(marcaBD){
            return res.status(400).json({msg: 'Ya existe nombre'})
        }
        const datos = {
            nombre
        }
        const marcaEquipo = new MarcaEquipo(datos)
        console.log(marcaEquipo)
        await marcaEquipo.save()
        res.status(201).json(marcaEquipo)
    }catch(e){
      console.log(e)
      return res.status(500).json({
        msg: 'Hable con el administrador - Error al crear marca de equipo'
      })
    }
}


//obtiene todas las marcas de equipo
const obtenerMarcasEquipos = async(req = request, res = response) => {
    try{
        const marcasEquipos = await MarcaEquipo.find()
        res.status(200).json(marcasEquipos)
    }catch(e){
      console.log(e)
      return res.status(500).json({
        msg: 'Hable con el administrador - Error al obtener marcas de equipo'
      })
    }
}


//obtiene una marca de equipo por id
const obtenerMarcaEquipo = async(req = request, res = response) => {
    try{
        const { id } = req.params
        const marcaEquipo = await MarcaEquipo.findById(id)  
        res.status(200).json(marcaEquipo)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: 'Hable con el administrador - Error al obtener marca de equipo por id'
        })
        }
}


//actualiza una marca de equipo
const actualizarMarcaEquipo = async(req = request, res = response) => {
    try{
        const { id } = req.params
        const { nombre } = req.body
        const datos = { nombre }
        const marcaEquipo = await MarcaEquipo.findByIdAndUpdate(id, datos, {new: true})
        res.status(200).json("Marca de equipo actualizada correctamente")
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: 'Hable con el administrador - Error al actualizar marca de equipo'
        })
        }
}


//elimina una marca de equipo
const eliminarMarcaEquipo = async(req = request, res = response) => {
    try{
        const { id } = req.params
        const marcaEquipo = await MarcaEquipo.findByIdAndDelete(id)
        res.status(200).json("Marca de equipo eliminada correctamente")
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: 'Hable con el administrador - Error al eliminar marca de equipo'
        })
        }
}


module.exports = {
    crearMarcaEquipo,
    obtenerMarcasEquipos,
    obtenerMarcaEquipo,
    actualizarMarcaEquipo,
    eliminarMarcaEquipo
}

