import React from "react";

//modal para crear, editar y eliminar un usuario de acuerdo a Usuarios.js
export default function Modal({ usuario, setUsuario, crear, editar }) {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" value={usuario.nombre} onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={usuario.email} onChange={(e) => setUsuario({ ...usuario, email: e.target.value })} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">
              Close <i className="fa-sharp fa-solid fa-xmark" />  </button>
            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={() => crear(usuario)}>
              Crear <i className="fa-regular fa-square-plus" />  </button>
            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => editar(usuario._id)}>
              Editar <i className="fa-sharp fa-solid fa-pen-to-square" />  </button>
            </div>
        </div>
        </div>
    </div>
    );
}

        
