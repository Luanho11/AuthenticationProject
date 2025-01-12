import Swal from 'sweetalert2';
import { useEffect } from 'react';
import React, { useState } from 'react';
import './LoginForm.css';
import { CiUser } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const savedUsername = localStorage.getItem('username') || '';
    const [rememberMe, setRememberMe] = useState(savedUsername !== '');

    useEffect(() => {
        if (rememberMe) {
            setUsername(savedUsername);
        } else {
            setUsername('');
        }
    }, [rememberMe, savedUsername]);

    const manejarLogin = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await respuesta.json();
            console.log(data);

            if (respuesta.ok) {
                if (rememberMe) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', username);
                } else {
                    localStorage.setItem('token', data.token);
                    localStorage.removeItem('username');
                }

                // Mostrar SweetAlert de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Login exitoso',
                    text: 'Redirigiendo a la página web autenticada...',
                    showConfirmButton: false,
                    timer: 3000  // Cierra automáticamente en 3 segundos
                });

                // Vaciar campos del formulario
                setUsername('');
                setPassword('');

                // Redirigir al usuario al private después de 3 segundos
                setTimeout(() => {
                    window.location.href = '/private';
                }, 3000);

            } else {
                // Mostrar SweetAlert de error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Credenciales inválidas. Por favor, inténtalo de nuevo.',
                });
            }

        } catch (error) {
            console.log(error);
            // Mostrar SweetAlert de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error durante el login. Por favor, inténtalo de nuevo.',
            });
        }
    }

    return (
        <div className='contenedor_login'>
            {/* <!-- Formulario Login --> */}

            <form onSubmit={manejarLogin}>
                <h1>Login</h1>

                <div className="div_input">
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                    <CiUser className='icon' />
                </div>

                <div className="div_input">
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <IoLockClosedOutline className='icon' />
                </div>

                <div className="div_remember_forgot">
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                    </label>
                    <Link to="/forgotpasswordform">Forgot Password</Link>
                </div>

                {/* <!-- Boton de login --> */}
                <button type='submit'>Login</button>

                <div className="div_registerlink">
                    <p>Don't you have an account? <Link to="/registerform">Register</Link></p>
                </div>

            </form>
        </div>
    )
}

export default LoginForm
