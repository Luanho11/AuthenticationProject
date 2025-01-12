import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css';

const HomePage = () => {
  return (
    <div className='mainpage'>
      <h1>PÁGINA PRINCIPAL (SIN AUTENTICACIÓN)</h1>
      <Link to="/loginform"><h4>INICIAR SESIÓN</h4></Link>
      <Link to="/registerform"><h4>REGISTRARSE</h4></Link>
    </div>
  )
}

export default HomePage
