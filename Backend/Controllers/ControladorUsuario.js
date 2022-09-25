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
    try {
        console.log (req.query);
        const estado = req.query.estado;
        const query  = {estado: estado};
        const UsuarioBD = await Usuario.find(query);
        res.json({UsuarioBD});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error al obtener usuarios'});
    }
}

//obtener usuario por id
const obtenerUsuario = async(req = request, res = response) => {
    try {
        console.log (req.query);
        console.log (req.params);
        const estado = req.query.estado;
        const id = req.params.id;
        const query  = {estado: estado, _id: id};
        const UsuarioBD = await Usuario.findOne(query);
        return res.json ({UsuarioBD});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error al obtener usuario'});
    }
}

//actualizar usuario por id
const actualizarUsuario = async(req = request, res = response) => {
    try {
        console.log (req.query);
        console.log (req.params);
        const estado = req.query.estado;
        const id = req.params.id;
        const query  = {estado: estado, _id: id};
        const UsuarioBD = await Usuario.findOneAndUpdate(query, req.body, {new: true});
        return res.json ({UsuarioBD});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error al actualizar usuario'});
    }
}

//eliminar usuario por id
const eliminarUsuario = async(req = request, res = response) => {
    try {
        console.log (req.params);
        const id = req.params.id;
        const UsuarioBD = await Usuario.findById(id);
        if (!UsuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(id);
        return res.status(204).json({msg: 'Usuario eliminado', id})
    }
    catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error al eliminar usuario'});
    }
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
}

