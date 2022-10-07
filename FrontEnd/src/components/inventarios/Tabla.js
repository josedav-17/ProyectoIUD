import React from 'react'
import { editarInventarioPorID } from '../../services/InventarioService'

export default function Tabla({inventarios= []}) {
  return (
    <div className="table-responsive">
     {inventarios.length == 0 ? 'No hay datos' : (
    <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Modelo</th>
            <th>Descripcion</th>
            <th>Foto</th>
            <th>Color</th>
            <th>Fecha de compra</th>
            <th>Precio</th>
            <th>Usuario</th>
            <th>Marca</th>
            <th>Estado</th>
            <th>Tipo de equipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {/*se recorre el arreglo de inventarios*/}
            {inventarios.map((inventario, index) => (
                <tr key={index}>
                    <td>{inventario.serial}</td>
                    <td>{inventario.modelo}</td>
                    <td>{inventario.descripcion}</td>
                    <td>{inventario.foto}</td>
                    <td>{inventario.color}</td>
                    <td>{inventario.fechaCompra}</td>
                    <td>{inventario.precio}</td>
                    <td>{inventario.usuario}</td>
                    <td>{inventario.marca}</td>
                    <td>{inventario.estado}</td>
                    <td>{inventario.tipoEquipo}</td>
                    <td>
                    <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={() => editarInventarioPorID(inventario._id )}>
                    Editar</button>
                    <span> </span>
                    <button type="button" className="btn btn-outline-danger" onClick={() => { if (window.confirm('¿Estás seguro de eliminar el tipo de equipo?')) borrar(inventario._id)}}>
                    Eliminar
                    </button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
        )}
    </div>
    )
}

                    
