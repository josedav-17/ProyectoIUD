//clase para definir los iconos de boostrap y poder usarlos en el proyecto

import React from 'react'

export default function Iconos({ icono, color, size }) {
    return (
        //icono de basura para borrar
        <i className={`bi bi-${icono} ${color} ${size}`}></i>
    )
}

        
