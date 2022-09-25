const TipoEquipo = require('../Models/tipoEquipo');
const { response, request } = require('express');


//crea un tipo de equipo
const crearTipoEquipo = async(req = request, res = response) => {
    try {
         //console.log(req.body)
         const nombre = (req.body.nombre)? req.body.nombre.toUpperCase(): '';
         const tipoEquipoBD = await TipoEquipo.findOne({ nombre })
         if(tipoEquipoBD){
             return res.status(400).json({msg: 'Ya existe nombre'})
         }
         const datos = {
             nombre
         }
         //const datos = req.body
         const tipoEquipo = new TipoEquipo(datos)
         console.log(tipoEquipo)
         await tipoEquipo.save()
         res.status(201).json(tipoEquipo)
     }catch(e){
       console.log(e)
       return res.status(500).json({
         msg: 'Error al crear tipo de equipo'
       });
     }
}

//obtiene todos los tipos de equipo
const obtenerTipoEquipos = async(req = request, res = response) => {
    try {
        const estado = req.query.estado;
        const query  = {estado: estado};
        const tipoEquipoBD = await TipoEquipo.find(query);
        res.json({tipoEquipoBD});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error al obtener tipos de equipo'});
    }
}

//obtiene un tipo de equipo por id
const obtenerTipoEquipo = async(req = request, res = response) => {
    try {
        console.log (req.query);
        console.log (req.params);
        const estado = req.query.estado;
        const id = req.params.id;
        const query  = {estado: estado, _id: id};
        const tipoEquipoBD = await TipoEquipo.findOne(query);
        return res.json ({tipoEquipoBD});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error al obtener tipo de equipo'});
    }
}

//actualiza un tipo de equipo
const actualizarTipoEquipo = async(req = request, res = response) => {
    try {
        const id = req.params.id;
        const { estado, usuario, ...data } = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;
        const tipoEquipoBD = await TipoEquipo.findByIdAndUpdate(id, data, { new: true });
        res.json(tipoEquipoBD);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error al actualizar tipo de equipo'});
    }
}
//elimina un tipo de equipo
const eliminarTipoEquipo = async(req = request, res = response) => {
    try {
        const id = req.params.id;
        const tipoEquipoBD = await TipoEquipo.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.json(tipoEquipoBD);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error al eliminar tipo de equipo'});
    }
}

module.exports = {
    crearTipoEquipo,
    obtenerTipoEquipos,
    obtenerTipoEquipo,
    actualizarTipoEquipo,
    eliminarTipoEquipo
}
