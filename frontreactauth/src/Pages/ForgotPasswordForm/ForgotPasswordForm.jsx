import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './ForgotPasswordForm.css';
import { CiMail } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
    const [to, setTo] = useState('');

    const manejarForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await fetch('http://localhost:8080/auth/email/send-reset-link', {
                method: 'POST',
                body: JSON.stringify({ to }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!respuesta.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await respuesta.text();
            console.log(data);

            // Mostrar SweetAlert de éxito
            Swal.fire({
                icon: 'success',
                title: 'Email enviado correctamente',
                text: 'Revise su bandeja de entrada...',
                showConfirmButton: false,
                timer: 3000  // Cierra automáticamente en 3 segundos
            });

            // Vaciar campos del formulario
            setTo('');

            // Redirigir al usuario al login después de 3 segundos
            setTimeout(() => {
                window.location.href = '/loginform';
            }, 3000);
        } catch (error) {
            console.log(error);
            // Mostrar SweetAlert de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error durante el envio del email. Por favor, inténtalo de nuevo.',
            });
        }
    }

    return (
        <div className='contenedor_forgotpassword'>
            {/* <!-- Formulario Forgot Password --> */}
            <form onSubmit={manejarForgotPassword}>
                <h1>Forgot Password</h1>
                <div className="div_input">
                    <input
                        type="email"
                        placeholder='Email'
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        required
                    />
                    <CiMail className='icon' />
                </div>
                <button type='submit'>Send Reset Link</button>
                <div className="div_loginlink">
                    <p>Remembered your password? <Link to="/loginform">Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
