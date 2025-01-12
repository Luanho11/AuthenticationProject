import React, { useState } from 'react'
import Swal from 'sweetalert2';
import './ChangePasswordForm.css';
import { CiMail } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { IoIosLock } from "react-icons/io";

const ChangePasswordForm = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const manejarChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== repeatPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las nuevas contraseñas no coinciden.',
            });
            return;
        }

        try {
            // Verificar la contraseña actual antes de enviar la solicitud
            const verificarRespuesta = await fetch('http://localhost:8080/auth/verify-password', {
                method: 'POST',
                body: JSON.stringify({ email, currentPassword }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!verificarRespuesta.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Contraseña actual incorrecta',
                });
                return;
            }

            // Si la verificación es exitosa, proceder con el cambio de contraseña
            const respuesta = await fetch('http://localhost:8080/auth/change-password', {
                method: 'POST',
                body: JSON.stringify({ email, currentPassword, newPassword }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!respuesta.ok) {
                const result = await respuesta.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result,
                });
                return;
            }

            // Mostrar SweetAlert de éxito
            Swal.fire({
                icon: 'success',
                title: 'Contraseña cambiada correctamente',
                text: 'Su contraseña ha sido actualizada.',
                showConfirmButton: false,
                timer: 2000  // Cierra automáticamente en 3 segundos
            });

            // Vaciar campos del formulario
            setEmail('');
            setCurrentPassword('');
            setNewPassword('');
            setRepeatPassword('');
        } catch (error) {
            console.log(error);
            // Mostrar SweetAlert de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error durante el cambio de contraseña. Por favor, inténtalo de nuevo.',
            });
        }

    };

    return (
        <div className='contenedor_changepassword'>
            {/* <!-- Formulario Forgot Password --> */}
            <form onSubmit={manejarChangePassword}>
                <h1>Change Password</h1>
                <div className="div_input">
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <CiMail className='icon' />
                </div>
                <div className="div_input">
                    <input
                        type="password"
                        placeholder='Current password'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required />
                    <IoIosLock className='icon' />
                </div>

                <div className="div_input">
                    <input
                        type="password"
                        placeholder='New Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required />
                    <IoIosLock className='icon' />
                </div>
                <div className="div_input">
                    <input
                        type="password"
                        placeholder='Repeat New Password'
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required />
                    <IoIosLock className='icon' />
                </div>
                <button type='submit'>Change Password</button>
                <div className="div_loginlink">
                    <p><Link to="/private">Volver al dashboard</Link></p>
                </div>
            </form>
        </div>
    );
}

export default ChangePasswordForm
