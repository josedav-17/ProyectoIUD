const Usuario = require('../models/usuario')
const { request, response } = require('express')
const { validationResult, check } = require('express-validator')
const bcryptjs = require('bcryptjs')
const { validarjwt } = require('../middleware/validar-jwt')
const { validarRol } = require('../middleware/validarRolAdmin');


const createUsuario = async function (req = request, res = response) {
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
    check('email', 'El email es obligatorio').not().isEmpty()
    check('password', 'El password es obligatorio').not().isEmpty()
    check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6})
    check('rol', 'El rol no es válido').isIn(['DOCENTE_ROLE" , "ADMIN_ROLE'])
    //validamos el token y el rol,  solo el admin puede crear usuarios
    [validarjwt, validarRol]

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const existeEmail = await Usuario.findOne ({email: req .body.email})
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }
        let usuario = new Usuario(req.body)
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        const password = bcryptjs.hashSync(req.body.password, salt)
        usuario.password = password;

        usuario.rol = req.body.rol;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date()
        usuario.fechaActualizacion = new Date()
        usuario = await usuario.save()
        return res.status(201).json({msj: 'Usuario creado', usuario})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msj: error})
    }
}

//obtener todos los usuarios se debe enviar el token en el header
const getUsuarios = async function(req = request, res = response){
    [validarjwt, validarRol]
    try {
        const usuarios = await Usuario.find()
        return res.status(200).json(usuarios)
    } catch (error) {
        return res.status(500).json({msj: error})
    }
}




const getUsuarioByID = async (req = request,  res = response) => {
    [validarjwt, validarRol]
    try{
        const id = req.params.id
        const filter = { _id: id}
        const usuarioDB = await Usuario.findOne(filter)
        return res.json(usuarioDB)
    }catch(e){
        return res.status(500).json({msj: e})
    }
}


const updateUsuarioByID = async (req = request, 
    res = response) => {
        //validamos el token y el rol, solo el admin puede actualizar usuarios
        [validarjwt, validarRol]
    try{
        const id = req.params.id
        const data = req.body
        console.log(data)
        console.log(id)
        data.fechaActualizacion = new Date()
        console.log(data)
        const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(usuario)
    }catch(e){
        return res.status(500).json({msj: e})
    }  
}


const deleteUsuarioByID = async (req = request, 
    res = response) => {
        [validarjwt, validarRol]
    try{
        const id = req.params.id
        const usuarioBD = await Usuario.findById(id)
        if(!usuarioBD){
            return res.status(404).json({msj: 'No existe usuario'})
        }
        //una vez se elimina el usuario se meustra el mensaje de que el usuario ha sido eliminado
        await Usuario.findByIdAndDelete(id)
        return res.status(200).json({msj: 'Usuario eliminado'});
    }catch(e){
        return res.status(500).json({msj: e})
    }
}

module.exports = { 
    createUsuario, 
    getUsuarios, 
    getUsuarioByID,
    updateUsuarioByID,
    deleteUsuarioByID
}
