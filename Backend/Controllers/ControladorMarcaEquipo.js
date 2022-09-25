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
        console.log(req.query)
        const estado = req.query.estado
        const query = { estado: estado }
        const marcas = await MarcaEquipo.find(query)
        res.status(200).json(marcas)
    }catch(e){
        return res.status(500).json({msj: "no se pudo obtener las marcas"})
    }
}

//obtiene una marca de equipo por id
const obtenerMarcaEquipo = async(req = request, res = response) => {
    try{
        const id = req.params.id
        const marcaDB = await MarcaEquipo.findById(id)
        return res.json(marcaDB)
    }catch(e){
        return res.status(500).json({msj: "no se pudo obtener la marca"})
    }
}

//actualiza una marca de equipo
const actualizarMarcaEquipo = async(req = request, res = response) => {
    try{
        const id = req.params.id
        const data = req.body
        console.log(data)
        console.log(id)
        data.fechaActualizacion = new Date()
        console.log(data)
        const marca = await MarcaEquipo.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(marca)
    }catch(e){
        return res.status(500).json({msj: "no se pudo actualizar la marca"})
    }  
}

//elimina una marca de equipo
const eliminarMarcaEquipo = async(req = request, res = response) => {
    try{
        const id = req.params.id
        const marcaBD = await MarcaEquipo.findById(id)
        if(!marcaBD){
            return res.status(404).json({msj: 'No existe marca'})
        }
        await MarcaEquipo.findByIdAndDelete(id)
        return res.status(204).json({})
    }catch(error){
        return res.status(500).json({msj: "esta marca no se puede eliminar"})
    }
}

module.exports = {
    crearMarcaEquipo,
    obtenerMarcasEquipos,
    obtenerMarcaEquipo,
    actualizarMarcaEquipo,
    eliminarMarcaEquipo
}

