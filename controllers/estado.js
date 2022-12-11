const Estado = require('../models/estado')
const { request, response } = require('express')
const { validationResult} = require('express-validator')
const { validarjwt } = require('../middleware/validar-jwt')
const { validarRol } = require('../middleware/validarRolAdmin')


const createEstado = async function (req = request,  res = response) {
    [validarjwt, validarRol]

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    //si no es admin se le envia un mensaje de error
    if(!req.usuario.rol === 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'No tiene privilegios para crear un tipo de equipo'
        })
    }

    try{
            const nombre = (req.body.nombre) 
            ? req.body.nombre.toUpperCase()
            : '';
            const estadoBD = await Estado.findOne({ nombre })
            if(estadoBD){
                return res.status(400).json({msg: 'Ya existe nombre'})
            }
            const datos = {
                nombre
            }
            const estado = new Estado(datos)
            console.log(estado)
            await estado.save()
            res.status(201).json(estado)
        }catch(e){
          console.log(e)
          return res.status(500).json({
            msg: e
          })
        }
}


const getEstados = async function  (req = request, res = response) {
    [validarjwt, validarRol]
    try{
        const estados = await Estado.find()
        return res.json(estados)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}

const getEstadoByID = async function (req = request, res = response) {
    [validarjwt, validarRol]
    try{
        const id = req.params.id
        const estado = await Estado.findById(id)
        return res.json(estado)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})
    }
}



const updateEstadoByID = async function (req = request, res = response) {
    [validarjwt, validarRol]
        try{
            console.log(req.body)
            console.log(req.params)
            const data = req.body
            const id = req.params.id
            data.fechaActualizacion = new Date()
            const estado = await Estado.findByIdAndUpdate(id, data, {new: true})
            return res.json(estado)
        }catch(e){
            console.log(e)
            return res.status(500).json({msg: e})  
        }
}


const deleteEstadoByID = async function (req = request, res = response) {
    [validarjwt, validarRol]
    try{
        console.log(req.params)
        const id = req.params.id
        const estadoDB = await Estado.findById(id)
        if(!estadoDB){
            return res.status(404).json({msg: 'No existe el estado'})
        }
        await Estado.findByIdAndDelete(id)
        return res.status(204).json({msg: 'Borrado', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = { 
    createEstado, 
    getEstados, 
    getEstadoByID,
    updateEstadoByID,
    deleteEstadoByID
}
