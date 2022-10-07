import React from 'react' 

//modal para crear, editar y eliminar un estado de acuerdo a TipoEquipo.js
export default function Modal({ tipoEquipo, setTipoEquipo, crearTipoEquipo, editarTipoEquipo, limpiarTipoEquipo }) {
    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title align-center" id="exampleModalLabel">Gestion de equipos</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
                <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                    <input type="text" className="form-control" id="nombre" value={tipoEquipo.nombre} onChange={(e) => setTipoEquipo({ ...tipoEquipo, nombre: e.target.value })} />
                </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">
                Cerrar <i className="fa-sharp fa-solid fa-xmark" /></button>
                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => editarTipoEquipo(tipoEquipo._id )}>
                Editar <i className="fa-solid fa-edit" />  </button>
                <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={() => crearTipoEquipo(tipoEquipo)}>
                Crear <i className="fa-solid fa-plus" />  </button>
            </div>
            </div>
        </div>
        </div>
    )
}