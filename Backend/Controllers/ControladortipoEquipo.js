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
    try{
        const tipoEquipos = await TipoEquipo.find()
        res.status(200).json(tipoEquipos)
    }catch(e){
      console.log(e)
      return res.status(500).json({
        msg: 'Error al obtener tipos de equipo'
      });
    }
}

//obtiene un tipo de equipo por id
const obtenerTipoEquipo = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipoEquipoBD = await TipoEquipo.findById(id);
        res.json({tipoEquipoBD});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error al obtener tipo de equipo por id'});
    }
}

//actualiza un tipo de equipo
const actualizarTipoEquipo = async(req = request, res = response) => {
    try {
        const id = req.params.id;
        const {nombre} = req.body;
        const tipoEquipoBD = await TipoEquipo.findByIdAndUpdate(id, {nombre}, {new: true});
        res.json({tipoEquipoBD});
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
        const tipoEquipoBD = await TipoEquipo.findByIdAndDelete(id);
        res.json({tipoEquipoBD});
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
