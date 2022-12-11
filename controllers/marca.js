const Marca = require('../models/marca')
const { request, response } = require('express')
const validarjwt  = require('../middleware/validar-jwt');
const validarRol = require('../middleware/validarRolAdmin');

const createMarca = async function (req = request, res = response){
   //para crear una marca se necesita tener token y ser admin
    [validarjwt, validarRol]
        try{
            //console.log(req.body)
            const nombre = (req.body.nombre) 
            ? req.body.nombre.toUpperCase()
            : '';
            const marcaBD = await Marca.findOne({ nombre })
            if(marcaBD){
                return res.status(400).json({msg: 'Ya existe nombre'})
            }
            const datos = {
                nombre
            }
            const marca = new Marca(datos)
            console.log(marca)
            await marca.save()
            res.status(201).json(marca)
        }catch(e){
          console.log(e)
          return res.status(500).json({
            msg: e
          })
        }
}


const getMarcas = async function (req = request,  res = response) {
    [validarjwt, validarRol]
    try {
        const marcas = await Marca.find()
        return res.json(marcas)	
    }catch(e){
        return res.status(500).json({msj: e})
    }
}


const getMarcaByID = async function (req = request,  res = response) {
    [validarjwt, validarRol]	
    try{
        const id = req.params.id
        const marcaDB = await Marca.findById(id)
        return res.json(marcaDB)
    }catch(e){
        return res.status(500).json({msj: e})
    }
}


const updateMarcaByID = async function (req = request,  res = response) {
    [validarjwt, validarRol]

    try{
        const id = req.params.id
        const data = req.body
        console.log(data)
        console.log(id)
        data.fechaActualizacion = new Date()
        console.log(data)
        const marca = await Marca.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(marca)
    }catch(e){
        return res.status(500).json({msj: e})
    }  
}


const deleteMarcaByID = async function (req = request,  res = response) {
    [validarjwt, validarRol]

        try{
            const id = req.params.id
            const marcaBD = await Marca.findById(id)
            if(!marcaBD){
                return res.status(404).json({msj: 'No existe marca'})
            }
            await Marca.findByIdAndDelete(id)
            return res.status(204).json({})
        }catch(e){
            return res.status(500).json({msj: e})
        }
}

module.exports = { 
    createMarca, 
    getMarcas, 
    getMarcaByID,
    updateMarcaByID,
    deleteMarcaByID
}
