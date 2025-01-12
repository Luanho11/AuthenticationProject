import React from 'react';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import './PrivateRoute.css';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const manejarLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');

    // Mostrar SweetAlert de éxito
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Redirigiendo a la página web sin autenticar...',
      showConfirmButton: false,
      timer: 3000 // Cierra automáticamente en 3 segundos
    });

    // Redirigir al usuario a la página de inicio
    navigate('/');
  };

  const manejarPerfil = () => {

    // Mostrar SweetAlert de éxito
    Swal.fire({
      icon: 'success',
      title: 'Bienvenido',
      text: 'Redirigiendo a tu perfil...',
      showConfirmButton: false,
      timer: 3000 // Cierra automáticamente en 3 segundos
    });

    // Redirigir al usuario a la página de perfil
    navigate('/userprofile');
  };

  const manejarCambioContraseña = () => {

    // Mostrar SweetAlert de éxito
    Swal.fire({
      icon: 'success',
      title: 'Ok',
      text: 'Redirigiendo para cambiar contraseña...',
      showConfirmButton: false,
      timer: 3000 // Cierra automáticamente en 3 segundos
    });

    // Redirigir al usuario a la página de cambio de contraseña
    navigate('/changepasswordform');
  };

  if (!token) {
    // Si no hay token, redirigir a la página de inicio de sesión
    return <Navigate to="/loginform" />;
  }

  return (
    <div className='mainpage'>
      <h1>PÁGINA PRINCIPAL (AUTENTICADA)</h1>
      <button className='btn_privatepage' onClick={manejarLogout}><h4>CERRAR SESIÓN</h4></button>
      <button className='btn_privatepage' onClick={manejarPerfil}><h4>MI PERFIL</h4></button>
      <button className='btn_privatepage' onClick={manejarCambioContraseña}><h4>CAMBIAR CONTRASEÑA</h4></button>
    </div>
  );
};

export default PrivateRoute;
