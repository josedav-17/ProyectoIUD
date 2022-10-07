import React from 'react'

//modal para crear, editar y eliminar un estado de acuerdo a Estado.js
export default function Modal({ estado, setEstado, editar, crear }) {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Registro de Estados</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre </label>
              <input type="text" className="form-control" id="nombre" value={estado.nombre} onChange={(e) => setEstado({ ...estado, nombre: e.target.value })} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">
              Close  <i class="fa-sharp fa-solid fa-xmark"></i></button>
            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => editar(estado._id)}>
              Editar  <i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={() => crear(estado)}>
              Crear  <i class="fa-regular fa-square-plus"></i></button>
            </div>
        </div>
        </div>
    </div>
    );
}