import React from 'react' 

//modal para crear, editar y eliminar una marca de acuerdo a Marcas.js
export default function Modal({ titulo, marca, setMarca, crear, editar }) {
  return (
    <div className="modal fade" id="modalMarca" tabIndex="-1" role="dialog" aria-labelledby="modalMarcaLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalMarcaLabel">Registro de Marcas</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" className="form-control" id="nombre" value={marca.nombre} onChange={(e) => setMarca({ ...marca, nombre: e.target.value })} />
            </div>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">
              Close <i class="fa-sharp fa-solid fa-xmark"></i></button>
            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={() => crear(marca)}>
              Crear <i class="fa-regular fa-square-plus"></i></button>
            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => editar(marca._id)}>
              Editar <i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
            </div>
        </div>
    </div>
</div>
  )
}
