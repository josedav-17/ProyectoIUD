import React, { useEffect, useState } from 'react'
import { obtenerUsuarios } from '../../services/UsuarioService';
import { obtenerMarcas } from '../../services/MarcaService';
import { obtenerEstados } from '../../services/EstadoService';
import { obtenerTiposEquipos } from '../../services/TipoEquipoService';


export default function Modal({inventario, changeInventario, crearInventario}) {
    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [estados, setEstados] = useState([]);
    const [tiposEquipos, setTiposEquipos] = useState([]);

    
useEffect( () => {
    const getUsuarios = () => {obtenerUsuarios().then(r => {
    console.log(r); setUsuarios(r.data) }).catch(e => {
    console.log(e)})} 
    getUsuarios();}, []);

useEffect( () => {
    const getMarcas = () => { obtenerMarcas() .then(r => {
    console.log(r); setMarcas(r.data) }).catch(e => {
    console.log(e) }) }
    getMarcas();}, []);

useEffect( () => {
    const getEstados = () => { obtenerEstados() .then(r => {
    console.log(r); setEstados(r.data) }).catch(e => {
    console.log(e) }) } 
    getEstados(); }, []);
            
useEffect( () => {
    const getTiposEquipos = () => { obtenerTiposEquipos().then(r => {
    console.log(r); setTiposEquipos(r.data) }).catch(e => {
    console.log(e) }) }
    getTiposEquipos();}, []);


  return (
    <div className="modal fade" id="modalInventarios" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Agregar Inventario</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="serial" className="form-label">Serial</label>
                            <input type="text" className="form-control" id="serial" name="serial" value={inventario.serial} onChange={changeInventario} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="modelo" className="form-label">Modelo</label>
                            <input type="text" className="form-control" id="modelo" name="modelo" value={inventario.modelo} onChange={changeInventario} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripcion</label>
                            <input type="text" className="form-control" id="descripcion" name="descripcion" value={inventario.descripcion} onChange={changeInventario} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="foto" className="form-label">Foto</label>
                            <input type="file" className="form-control" id="foto" name="foto" value={inventario.foto} onChange={changeInventario} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="color" className="form-label">Color</label>
                            <input type="text" className="form-control" id="color" name="color" value={inventario.color} onChange={changeInventario} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fechaCompra" className="form-label">Fecha de Compra</label>
                            <input type="date" className="form-control" id="fechaCompra" name="fechaCompra" value={inventario.fechaCompra} onChange={changeInventario} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precio" className="form-label">Precio</label>
                            <input type="number" className="form-control" id="precio" name="precio" value={inventario.precio} onChange={changeInventario} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label">Usuario</label>
                            <select className="form-select" id="usuario" name="usuario" value={inventario.usuario} onChange={changeInventario}>
                                <option value="">Seleccione un usuario</option>
                                {usuarios.map(usuario => (
                                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="marca" className="form-label">Marca</label>
                            <select className="form-select" id="marca" name="marca" value={inventario.marca} onChange={changeInventario}>
                                <option value="">Seleccione una marca</option>
                                {marcas.map(marca => (
                                    <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <select className="form-select" id="estado" name="estado" value={inventario.estado} onChange={changeInventario}>
                                <option value="">Seleccione un estado</option>
                                {estados.map(estado => (
                                    <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tipoEquipo" className="form-label">Tipo de Equipo</label>
                            <select className="form-select" id="tipoEquipo" name="tipoEquipo" value={inventario.tipoEquipo} onChange={changeInventario}>
                                <option value="">Seleccione un tipo de equipo</option>
                                {tiposEquipos.map(tipoEquipo => (
                                    <option key={tipoEquipo.id} value={tipoEquipo.id}>{tipoEquipo.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <span> </span>
                    <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={() => crearInventario(Inventario)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg><span> </span>Crear</button>
                </div>
            </div>
        </div>
    </div>
    )
}