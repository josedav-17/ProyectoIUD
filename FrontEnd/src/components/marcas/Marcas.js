import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { obtenerMarcas, editarMarcaPorID, borrarMarcaPorID, crearMarca, obtenerMarcaPorID } from '../../services/MarcaService'
import Modal from '../marcas/Modal'

export default function Marcas() {

  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [marcas, setMarcas] = useState([])
  const [marca, setMarca] = useState({})

  const listMarcas = async () => {
    setLoading(true)
    try {
      setError(false)
      const { data } = await obtenerMarcas(query)
      setMarcas(data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  //cambiar el estado de una marca
  const cambiarEstado = async (marcaId) => {
    try {
      setError(false);
      const { data } = await obtenerMarcaPorID(marcaId);
      data.estado = !data.estado;
      await editarMarcaPorID(marcaId, data);
      setQuery(!query);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //crea una marca
  const crear = async () => {
    try {
      setError(false);
      const { data } = await crearMarca(marca);
      setMarcas([...marcas, data]);
      setMarca([]);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //actualiza una marca
  const editar = async () => {
    try {
      setError(false);
      const { data } = await editarMarcaPorID(marca._id, marca);
      setMarcas(marcas.map(u => u._id === marca._id ? data : u));
      setMarca([]);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //borra una marca
  const borrar = async (marcaId) => {
    try {
      setError(false);
      await borrarMarcaPorID(marcaId);
      setMarcas(marcas.filter(u => u._id !== marcaId));
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //obtiene una marca
  const obtener = async (marcaId) => {
    try {
      setError(false);
      const { data } = await obtenerMarcaPorID(marcaId);
      setMarca(data);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }


  useEffect(() => {
    listMarcas()
  }
    , [query])

    const cambiarSwitche = () => {
      setQuery(!query)
    }

    return (
      <div className="container">
    <div className="row">
      <div class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bg-dark text-white border-bottom">
        <h1 class="h2">Marcas de Equipos <i class="fa-brands fa-apple"></i></h1>  
      </div>

      <div className="col-12">
            <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#modalMarca" onClick={() => setMarca({})}>
              Crear nueva Marca <i className="fa-solid fa-plus"></i>
            </button>
      </div>
      <span></span>

      <Modal titulo="Crear marca" marca={marca} setMarca={setMarca} crear={crear} editar={editar} />
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
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
              <tbody className='table-responsive'>
                {marcas.map(marca => (
                  <tr key={marca._id}>
                    <th scope="row">{marca.id}</th>
                    <td>{marca.nombre}</td>
                    <td>{marca.estado ? 'Activo' : 'Inactivo'}</td>
                    <td>{dayjs(marca.createdAt).format('DD/MM/YYYY')}</td>
                    <td>{dayjs(marca.updatedAt).format('DD/MM/YYYY')}</td>
                    <td>
                      <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalMarca" onClick={() => obtener(marca._id)}>
                      Editar <i class="fa-sharp fa-solid fa-pen-to-square"></i> </button>
                      <span> </span>
                      <button type="button" className="btn btn-outline-danger" onClick={() => borrar(marca._id)}>
                      Eliminar <i class="fa-sharp fa-solid fa-trash"></i> </button>
                      <span> </span>
                      <button type="button" className="btn btn-outline-warning" onClick={() => cambiarEstado(marca._id)}>
                          {marca.estado ? 'Inactivar' : 'Activar'} <i class="fa-sharp fa-solid fa-toggle-on"></i> 
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <h5>Total de marcas: {marcas.length}</h5>
          </div>
        </div>
      </div>
    )
  }


