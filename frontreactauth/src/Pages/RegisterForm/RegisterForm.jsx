import React, { useState } from 'react';
import './RegisterForm.css';
import { FaRegUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const RegisterForm = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [country, setCountry] = useState('');


    const manejarRegistro = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            console.log('Las contraseñas no coinciden');
            return;
        }

        try {
            const respuesta = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username, email, password, firstname, lastname, country }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await respuesta.json();
            console.log(data);

            // Mostrar SweetAlert de éxito
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Redirigiendo al login...',
                showConfirmButton: false,
                timer: 3000  // Cierra automáticamente en 3 segundos
            });

            // Vaciar campos del formulario
            setUsername('');
            setEmail('');
            setPassword('');
            setRepeatPassword('');
            setFirstname('');
            setLastname('');
            setCountry('');

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
                text: 'Hubo un error durante el registro. Por favor, inténtalo de nuevo.',
            });
        }
    }

    /*RETURN FORMULARIO REGISTER*/

    return (
        <div className='contenedor_register'>
            {/* <!-- Formulario Register --> */}
            <form onSubmit={manejarRegistro}>

                <h1>Register</h1>
                <div className="formcontent">
                    <div className="div_input">
                        <input
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                        <FaRegUser className='icon' />
                    </div>

                    <div className="div_input">
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <MdOutlineEmail className='icon' />
                    </div>
                </div>

                <div className="formcontent">
                    <div className="div_input">
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <IoIosLock className='icon' />
                    </div>

                    <div className="div_input">
                        <input
                            type="password"
                            placeholder='Repeat Password'
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required />
                        <IoIosLock className='icon' />
                    </div>
                </div>

                <div className="formcontent">
                    <div className="div_input">
                        <input
                            type="text"
                            placeholder='Firstname'
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required />
                        <MdDriveFileRenameOutline className='icon' />
                    </div>
                    <div className="div_input">
                        <input
                            type="text"
                            placeholder='Lastname'
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required />
                        <MdDriveFileRenameOutline className='icon' />
                    </div>

                    <div className="div_input">
                        <input
                            type="text"
                            placeholder='Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required />
                        <BiWorld className='icon' />
                    </div>
                </div>

                <div className="div_checkbox">
                    <label><input type="checkbox" />I have read and agree to the <Link to="/privacypolicy">Privacy Policy</Link></label>
                </div>
                <div className="div_checkbox">
                    <label><input type="checkbox" />I would like to receive newsletters and promotional emails</label>
                </div>

                {/* <!-- Boton de register --> */}
                <button type='submit'>Register</button>

                <div className="div_loginlink">
                    <p>Have an account? <Link to="/loginform">Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
