import React from 'react'
import './UserNotFound.scss'
import { Link } from 'react-router-dom'

export default function UserNotFound(){
    return (
        <div className="user-not-found">
            <p>Usuario no encontrado</p>
            <p>Es posible que el enlace qe has seguido es incorrecto o haya sido eliminado</p>
            <Link to="/">Volver a la home</Link>
        </div>
    )
}