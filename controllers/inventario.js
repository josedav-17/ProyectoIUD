const Inventario = require('../models/inventario')
const { request, response } = require('express')
const Usuario = require('../models/usuario')
const Marca = require('../models/marca')

/**
 * Consulta todos los inventarios
 */
const getInventarios = async (req, res = response) => {
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

/**
 * Guardar un inventario
 */
const createInventario = async (req = request, 
    res = response) => {
    try{
        const data = req.body;
        const { usuario, marca } = data;
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
        // validamos si marca está activa
        const marcaBD = await Marca.findOne({
            _id: marca._id, estado: true
        })
        if(!marcaBD){
            return res.status(400).json({
                msj: 'No existe marca'
            })
        }
        const inventario = new Inventario(data)
       // console.log(inventario)
        await inventario.save()
        res.status(201).json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'})
    }
}

/**
 * Consulta inventario por ID
 */
 const getInventarioByID = async (req = request, 
    res = response) => {

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
    return res.status(500).json({msj: 'Error'})
}

}
/**
 * Actualiza inventario por ID
 */
const updateInventarioByID = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        const inventario  = await Inventario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}

/**
 * Borra inventario por ID
 */
const deleteInventarioByID = async (req = request, 
    res = response) => {

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

//subir imagen
const uploadImage = async (req = request, res = response) => {
    try{
        const { id } = req.params
        const inventario = await Inventario.findById(id)
        if(!inventario){
            return res.status(400).json({
                msj: 'No existe inventario'
            })
        }
        if(req.files === null){
            return res.status(400).json({
                msj: 'No hay imagen'
            })
        }
        const file = req.files.file
        const name = file.name.split('.')
        const extension = name[name.length - 1]
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif']
        if(!allowedExtensions.includes(extension)){
            return res.status(400).json({
                msj: 'Extensión no permitida'
            })
        }
        const fileName = `${id}.${extension}`
        const path = `./uploads/${fileName}`
        file.mv(path, (err) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    msj: 'Error al subir imagen'
                })
            }
        })
        inventario.img = fileName
        await inventario.save()
        res.json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'})
    }
}




module.exports = {
    getInventarios,
    createInventario,
    getInventarioByID,
    updateInventarioByID,
    deleteInventarioByID,
    uploadImage
}