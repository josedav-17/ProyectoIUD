const Usuario = require('../Models/Usuario');
const { response, request } = require('express');

//crear usuario
const crearUsuario = async(req = request, res = response) => {
    try{
        const data = req.body
             const email = data.email
             console.log(data)
             const usuarioBD = await Usuario.findOne({ email })
             if(usuarioBD){
                 return res.status(400).json({msg: 'Ya existe usuario'})
             }
             const usuario = new Usuario(data)
             console.log(usuario)
             await usuario.save()
             return res.status(201).json(usuario)
         }catch(e){
             console.log(e)
             return res.status(500).json({e})
         }
     }
     

//obtener usuarios
const obtenerUsuarios = async(req = request, res = response) => {
    try{
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: "Error al consultar usuarios"
        })
    }
}

//obtener usuario por id
const obtenerUsuario = async(req = request, res = response) => {
    try{
        const { id } = req.params
        const usuario = await Usuario.findById(id)
        res.status(200).json(usuario)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: "Error al consultar usuario por id"
        })
    }
}

//actualizar usuario por id
const actualizarUsuario = async(req = request, res = response) => {
    try{
        const { id } = req.params
        const data = req.body
        const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json("Usuario actualizado")
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: "Error al actualizar usuario por id"
        })
    }
}

//eliminar usuario por id
const eliminarUsuario = async(req = request, res = response) => {
    try{
        const { id } = req.params
        const usuario = await Usuario.findByIdAndDelete(id)
        res.status(200).json("Usuario eliminado")
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: "Error al eliminar usuario por id"
        })
    }
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
}

