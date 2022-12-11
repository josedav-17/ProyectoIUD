const Inventario = require('../models/inventario')
const { request, response } = require('express')
const Usuario = require('../models/usuario')
const Marca = require('../models/marca')
const { validarjwt } = require('../middleware/validar-jwt')

const getInventarios = async function (req, res = response) {
    [validarjwt]

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


const createInventario = async function (req = request,  res = response) {
    [validarjwt]	
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

 const getInventarioByID = async function (req = request,  res = response) {
    [validarjwt]
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


const updateInventarioByID = async function (req = request,  res = response){
    [validarjwt]
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


const deleteInventarioByID = async function (req = request,  res = response) {
    [validarjwt]
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


const uploadImageByID = async function (req = request, res = response) { 
    [validarjwt]

    const { id } = req.params;
    const invBD = await Inventario.findOne({ _id: id});
    if(!invBD){
        return res.status(400).json({
             msg: 'No existe inventario'
        });
    }
    if(!req.files || Object.keys(req.files) == 0 || !req.files.foto){
       return res.status(400).json({msj: 'Sin fotos para subir'});
    }
    const foto = req.files.foto;

    const extFileArray = foto.name.split('.');
    const extFile = extFileArray[extFileArray.length - 1];

    const extensiones = ['jpg', 'png', 'jpeg'];

    if(!extensiones.includes(extFile)){
        return res.status(400).json({msj: 'Archivo no válido'});
    }

    const nombreFileTemp = uuidv4() + "." + extFile;

    const uploadPath = path.join(__dirname, '../uploads/', nombreFileTemp);
    foto.mv(uploadPath, e => {
        if(e){
            return res.status(500).json({e});
        }
    });
    const data = {};
    data.foto = nombreFileTemp;
    // TODO: borrar la foto VIEJA
    const inv = await Inventario.findByIdAndUpdate(id, data, {new : true});
    if(!inv){
        return res.status(500).send(e);
    }
    res.json({msj: 'Subido a ' + uploadPath});
}

const getImageByID = async function (req = request, res = response) { 
    [validarjwt]
    const { id } = req.params;
    const inventarioBD = await Inventario.findOne({ _id: id});
    // TODO: VALIDAR QUE NO EXISTE
    const nombreFoto = inventarioBD.foto;
    const pathImg =  path.join(__dirname, '../uploads/', nombreFoto);
    if(fs.existsSync(pathImg))
        res.sendFile(pathImg);
}

module.exports = {
    getInventarios,
    createInventario,
    getInventarioByID,
    updateInventarioByID,
    deleteInventarioByID,
    uploadImageByID,
    getImageByID
}