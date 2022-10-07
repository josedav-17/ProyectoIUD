import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { obtenerTiposEquipos, crearTipoEquipo, borrarTipoEquipoPorID, editarTipoEquipoPorID, obtenerTipoEquipoPorID } from '../../services/TipoEquipoService'
import Modal from '../tiposequipos/Modal'

export default function TipoEquipos() {

  const [tipoEquipos, setTipoEquipos] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [tipoEquipo, setTipoEquipo] = useState({})

  const listTipoEquipos = async () => {
    setLoading(true)
    try {
      setError(false)
      const { data } = await obtenerTiposEquipos(query)
      setTipoEquipos(data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  //cambiar el estado de un tipo de equipo
  const cambiarEstado = async (tipoEquipoId) => {
    try {
      setError(false);
      const { data } = await obtenerTipoEquipoPorID(tipoEquipoId);
      data.estado = !data.estado;
      await editarTipoEquipoPorID(tipoEquipoId, data);
      setQuery(!query);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //crea un tipo de equipo
  const crear = async () => {
    try {
      setError(false);
      const { data } = await crearTipoEquipo(tipoEquipo);
      setTipoEquipos([...tipoEquipos, data]);
      setTipoEquipo([]);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //actualiza un tipo de equipo
  const editar = async () => {
    try {
      setError(false);
      const { data } = await editarTipoEquipoPorID(tipoEquipo._id, tipoEquipo);
      setTipoEquipos(tipoEquipos.map(u => u._id === tipoEquipo._id ? data : u));
      setTipoEquipo([]);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //borra un tipo de equipo
  const borrar = async (tipoEquipoId) => {
    try {
      setError(false);
      await borrarTipoEquipoPorID(tipoEquipoId);
      setTipoEquipos(tipoEquipos.filter(u => u._id !== tipoEquipoId));
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //obtiene un tipo de equipo
  const obtener = async (tipoEquipoId) => {
    try {
      setError(false);
      const { data } = await obtenerTipoEquipoPorID(tipoEquipoId);
      setTipoEquipo(data);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }



  useEffect(() => {
    listTipoEquipos()
  }
    , [query])

  const cambiarSwitche = () => {
      setQuery(!query)
    }

  return (
    <div className="container">
    <div className="row">
      <div class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bg-dark text-white border-bottom">
        <h1 class="h2">Tipos de Equipos  <i class="fa-brands fa-windows"></i> </h1>
      </div>

    {/* agregar los equipos */}
    <div className="col-md-12">
      <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setEstado({})}>
        Agregar nuevo tipo de equipo <i className="fa-solid fa-plus"></i>
      </button>
      
    <Modal tipoEquipo={tipoEquipo} setTipoEquipo={setTipoEquipo} crearTipoEquipo={crear} editarTipoEquipo={editar} limpiarTipoEquipo={() => setTipoEquipo({})} />
    {/* configuración del switche */}
    <div className="form-check form-switch">
      <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={query}onChange={cambiarSwitche}/>
          <label className="form-check-label" hmtlFor="flexSwitchCheckChecked">( Inactivo / Activo )</label>
        </div>
        {
          loading &&
          (<div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>)
        }
        {
          error &&
          (<div className="alert alert-danger" role="alert">
            Error al cargar los datos
          </div>)
        }
  
    {/* Tabla de datos */}
    <table className="table table-responsive">
      <thead>
        <tr className='table-dark table-responsive'>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Fecha de creación</th>
          <th scope="col">Fecha de Actualización</th>
          <th scope="col">Acciones</th>
          </tr>
      </thead>
        {/* cuerpo de la tabla */}
      <tbody>
        {tipoEquipos.map((tipoEquipo) => (
        <tr key={tipoEquipo.id}>
          <th scope="row">{tipoEquipo.id}</th>
          <td>{tipoEquipo.nombre}</td>
          <td>{dayjs(tipoEquipo.fechaActualizacion).format('DD/MM/YYYY')}</td>
          <td>{dayjs(tipoEquipo.fechaCreacion).format('DD/MM/YYYY')}</td>
          <td> 
      <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => obtener(tipoEquipo._id)}>
      Editar <i className="fa-solid fa-edit"></i> </button>
      <span> </span>
      <button type="button" className="btn btn-outline-danger" onClick={() => { if (window.confirm('¿Estás seguro de eliminar el tipo de equipo?')) borrar(tipoEquipo._id)}}>
      Eliminar <i className="fa-solid fa-trash"></i> </button>
      <span> </span>
      <button type="button" className="btn btn-outline-warning" onClick={() => cambiarEstado(tipoEquipo._id)}>
          {tipoEquipo.estado ? 'Desactivar' : 'Activar'} <i className="fa-solid fa-toggle-off"></i>
      </button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    <div className="d-flex justify-content-end">
            <h5>Total de tipos de equipos: {tipoEquipos.length}</h5>
          </div>
    </div>
    </div>
    </div>
  )
}

