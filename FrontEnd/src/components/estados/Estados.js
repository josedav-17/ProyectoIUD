import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { obtenerEstados , crearEstado , editarEstadoPorID, borrarEstadoPorID, obtenerEstadoPorID} from '../../services/EstadoService'
import Modal from '../estados/Modal'

export default function Estados() {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [estados, setEstados] = useState([])
  const [estado, setEstado] = useState({})

  const listEstados = async () => {
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerEstados(query)
      setEstados(data)
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  //cambiar el estado de un usuario
  const cambiarEstado = async (estadoId) => {
    try {
      setError(false);
      const { data } = await obtenerEstadoPorID(estadoId);
      data.estado = !data.estado;
      await editarEstadoPorID(estadoId, data);
      setQuery(!query);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }


  //crea un usuario
  const crear = async () => {
    try {
      setError(false);
      const { data } = await crearEstado(estado);
      setEstados([...estados, data]);
      setEstado([]);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //actualiza un usuario
  const editar = async () => {
    try {
      setError(false);
      const { data } = await editarEstadoPorID(estado._id, estado);
      setEstados(estados.map(u => u._id === estado._id ? data : u));
      setEstado([]);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //borra un usuario
  const borrar = async (estadoId) => {
    try {
      setError(false);
      await borrarEstadoPorID(estadoId);
      setEstados(estados.filter(u => u._id !== estadoId));
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //obtiene un usuario
  const obtener = async (estadoId) => {
    try {
      setError(false);
      const { data } = await obtenerEstadoPorID(estadoId);
      setEstado(data);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }
  


  useEffect(() => {
    listEstados()
  }
  , [query])

  const cambiarSwitche = () => {
    setQuery(!query)
  }

  return (
    <div className="container">
    <div className="row">
      <div class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bg-dark text-white border-bottom">
        <h1 class="h2">Estados de Equipos <i class="fa-solid fa-desktop"></i></h1>  
      </div>
    
      <div className="col-12">
          <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setEstado({})}>
            Crear nuevo estado <i class="fa-regular fa-square-plus"></i>
          </button>
          <span></span>

          <Modal estado={estado} setEstado={setEstado} crear={crear} editar={editar} />
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
          
          <table className="table table-striped table-responsive ">
            <thead>
              <tr className='table-dark table-responsive'>
                {/*id con icono de id*/}
                <th scope="col">ID</th>
                {/*nombre con icono de nombre*/}
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody className='table-responsive'>
              {estados.map((estado) => (
                <tr key={estado.id}>
                  <th scope="row">{estado._id}</th>
                  <td>{estado.nombre}</td>
                  <td>{estado.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>{dayjs(estado.createdAt).format('DD/MM/YYYY')}</td>
                  <td>{dayjs(estado.updatedAt).format('DD/MM/YYYY')}</td>
                  <td>
                    {/*editar el usuario de acuerdo a su ID*/}
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => obtener(estado._id)}>
                          Editar <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                    </button>
                    <span> </span>
                    <button type="button" className="btn btn-outline-danger" onClick={() => { if (window.confirm('¿Estás seguro de eliminar el tipo de equipo?')) borrar(estado._id)}}>
                        Eliminar <i class="fa-sharp fa-solid fa-trash"></i>
                    </button>
                        {/*cambiar estado de usuario de acuerdo a su ID*/}
                    <span> </span>
                    <button type="button" className="btn btn-outline-warning" onClick={() => cambiarEstado(estado._id)}>
                          {estado.estado ? 'Inactivar' : 'Activar'} <i class="fa-sharp fa-solid fa-toggle-on"></i> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <h5>Total de Estados: {estados.length}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

