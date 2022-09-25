const Inventario = require('../Models/Inventario');
const Usuario = require('../Models/Usuario');
const MarcaEquipo = require('../Models/MarcaEquipo');
const EstadoEquipo = require('../Models/EstadoEquipo');

const { response, request } = require('express');


//crear un inventario en la base de datos 
const crearInventario = async(req = request, res = response) => {
    try{
        const data = req.body;
        const { usuario, marcaEquipo } = data;
        // validamos si usuario está activo
        const usuarioBD = await Usuario.findOne({
            _id: usuario._id, estado: true
        })
        console.log('usuario retornado', usuarioBD)
        if(!usuarioBD){
            return res.status(400).json({
                msj: 'No existe usuario'
            })
        }
        // validamos si a marca del equipo está activa
        const marcaBD = await MarcaEquipo.findOne({
            _id: marcaEquipo._id, estado: true
        })
        console.log('marca retornado', marcaBD)
        if(!marcaBD){
            return res.status(400).json({
                msj: 'No existe marca'
            })
        }
        //valida el estado del equipo
        const estadoBD = await EstadoEquipo.findOne({
            _id: data.estado._id
        })
        console.log('estado retornado', estadoBD)
        if(!estadoBD){
            return res.status(400).json({
                msj: 'No existe estado'
            })
        }
        // creamos el inventario
        const inventario = new Inventario(data)
       // console.log(inventario)
        await inventario.save()
        res.status(201).json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error al crear inventario'})
    }
}


//obtiene todos los inventarios
const obtenerInventarios = async(req = request, res = response) => {
    try{
        const inventarios = await Inventario.find()
        .populate({
            path: 'usuario',
            match: { estado: true}
        })
        .populate({
            path: 'marca',
            match: { estado: true}
        })
        .populate({
            path: 'estado'
        })
        .populate({
            path: 'tipoEquipo'
        })
        // TODO: Hacer el Join
        res.json(inventarios)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            error: 'Error: ' + e
        })
    }
}

//obtiene un inventario por id
const obtenerInventario = async(req = request, res = response) => {
    try{
        const { id } = req.params;
        const inventarioBD = await Inventario.findById(id)
        .populate({
            path: 'usuario',
            match: {estado: true}
        })
        res.json(inventarioBD)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'no se pudo obtener el inventario'})
    }
    
    }
        
//actualiza un inventario por id
const actualizarInventario = async(req = request, res = response) => {
    try{
        const { id } = req.params
        const data = req.body
        const inventario  = await Inventario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'no se pudo actualizar el inventario'})
    }

}


//elimina un inventario
const eliminarInventario = async(req = request, res = response) => {
    try{
        const { id } = req.params
        const data = req.body
        await Inventario.findByIdAndDelete(id, data, {new: true})
        return res.status(204).json({})
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}

//

module.exports = {
    crearInventario,
    obtenerInventarios,
    obtenerInventario,
    actualizarInventario,
    eliminarInventario
}
