import React, { useEffect, useState } from 'react'
import Tabla from './Tabla'
import { obtenerInventarios } from '../../services/InventarioService';
import Modal from './Modal';

export default function Inventario() {

  const [inventarios, setInventarios] = useState([]);
  const [inventario, setInventario] = useState({
    serial: "",
    modelo: "",
    descripcion: "",
    foto: null,
    color: "",
    fechaCompra: "",
    precio: "",
    usuario: "",
    marca: "",
    estado: "",
    tipoEquipo: ""
  });
  

  useEffect( () => {
    const getInventarios = () => {
      obtenerInventarios()
        .then(r => {
            console.log(r);
            setInventarios(r.data)
        }).catch(e => {
            console.log(e)
        })
    }
    // se
    getInventarios();
  }, []);


  const changeInventario = e => {
    e.preventDefault();
    setInventario({
      ...inventario,
      [e.target.name]: e.target.value 
    })
  }

  return (
<div className="container">
    <div className="row">
      <div class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bg-dark text-white border-bottom">
        <h1 class="h2">Inventarios</h1>  
      </div>

    {/* agregar los equipos */}
    <div className="col-md-12">
      <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#modalInventarios" onClick={() => setEstado({})}>
        Agregar nuevo Inventario
      </button>
      
          <Tabla inventarios={inventarios}/>
          <Modal inventario={inventario} changeInventario={changeInventario} />
        </div>
      </div>
    </div>
  )
}
