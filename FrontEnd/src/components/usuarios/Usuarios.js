import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { obtenerUsuarios, editarUsuarioPorID, borrarUsuarioPorID, obtenerUsuarioPorID, crearUsuario } from '../../services/UsuarioService'
import Modal from '../usuarios/Modal'

export default function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(true);
  const [error, setError] = useState(false);
  const [usuario, setUsuario] = useState([]);

  const listUsuarios = async () => {
    setLoading(true);
    try {
      setError(false);
      const { data } = await obtenerUsuarios(query);
      setUsuarios(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);
    }
  }

  //cambiar el estado de un usuario
  const cambiarEstado = async (usuarioId) => {
    try {
      setError(false);
      const { data } = await obtenerUsuarioPorID(usuarioId);
      data.estado = !data.estado;
      await editarUsuarioPorID(usuarioId, data);
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
      const { data } = await crearUsuario(usuario);
      setUsuarios([...usuarios, data]);
      setUsuario([]);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //actualiza un usuario
  const editar = async () => {
    try {
      setError(false);
      const { data } = await editarUsuarioPorID(usuario._id, usuario);
      setUsuarios(usuarios.map(u => u._id === usuario._id ? data : u));
      setUsuario([]);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //borra un usuario por ID
  const borrar = async (usuarioId) => {
    try {
      setError(false);
      await borrarUsuarioPorID(usuarioId);
      setUsuarios(usuarios.filter(u => u._id !== usuarioId));
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  //obtiene un usuario por ID
  const obtener = async (usuarioId) => {
    try {
      setError(false);
      const { data } = await obtenerUsuarioPorID(usuarioId);
      setUsuario(data);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }



  useEffect(() => {
    listUsuarios();
  }, [query]);

  const cambiarSwitche = () => {
    setQuery(!query);
  }

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bg-dark text-white border-bottom">
          <h1 class="h2">Modulo de Usuarios <i class="fa-solid fa-users"></i> </h1>
          <span> </span>
        </div>
      </div>

      <div className="col-12">
          <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUsuario({})}>
            Crear nuevo Usuario <i className="fa-solid fa-user-plus"></i>
      </button>
      </div>
      <span></span>


      <Modal usuario={usuario} setUsuario={setUsuario} crear={crear} editar={editar} />

      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={query} onChange={cambiarSwitche}/>
        <label className="form-check-label" hmtlFor="flexSwitchCheckChecked">( Inactivo / Activo )</label>
      </div>
      {
        loading &&
        (<div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>)
      }
      {
        error &&
        (<div className="alert alert-danger" role="alert">
          Error al obtener los datos
        </div>)
      }
      {
        !loading && !error &&
        (<div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Fecha de Creación</th>
                <th>Fecha de Actualización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                usuarios.map((usuario, index) => {
                  return (
                    <tr key={usuario.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                      <td>{dayjs(usuario.createdAt).format('DD/MM/YYYY')}</td>
                      <td>{dayjs(usuario.fecha_actualizacion).format('DD/MM/YYYY')}</td>
                      <td>
                        {/*editar el usuario de acuerdo a su ID*/}
                        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => obtener(usuario._id)}>
                          Editar <i className="fa-solid fa-user-edit"></i>
                        </button>
                        <span> </span>
                        <button type="button" className="btn btn-outline-danger" onClick={() => { if (window.confirm('¿Estás seguro de eliminar el tipo de equipo?')) borrar(usuario._id)}}>
                        Eliminar <i className="fa-solid fa-user-minus"></i>
                        </button>
                        {/*cambiar estado de usuario de acuerdo a su ID*/}
                        <span> </span>
                        <button type="button" className="btn btn-outline-warning" onClick={() => cambiarEstado(usuario._id)}>
                          {usuario.estado ? 'Inactivar' : 'Activar'} <i className="fa-solid fa-user-check"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
              {/*el total de usuarios ya sea activo o inactivo*/}
          <div className="d-flex justify-content-end">
            <h5>Total de Usuarios: {usuarios.length}</h5>
          </div>

        </div>)
      }
    </div>
  );
}
