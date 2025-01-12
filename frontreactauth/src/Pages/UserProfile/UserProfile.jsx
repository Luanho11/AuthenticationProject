import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './UserProfile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    country: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    const buscarProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching profile');
        }

        const data = await response.json();
        setProfile(data);
        setFormData({
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          country: data.country
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo cargar el perfil del usuario. Inténtalo de nuevo más tarde.',
        });
      } finally {
        setLoading(false);
      }
    };

    buscarProfile();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const manejarGuardar = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/auth/updateprofile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error updating profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setEditMode(false);

      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado',
        text: 'Tu perfil ha sido actualizado exitosamente.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo actualizar el perfil. Inténtalo de nuevo más tarde.',
      });
    }
  };

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  if (!profile) {
    return <div>No se pudo cargar el perfil del usuario.</div>;
  }

  return (
    <div className='container_profile'>
      <h1>Perfil del Usuario</h1>
      {editMode ? (
        <div>
          <div>
            <label>Usuario:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={manejarCambio}
            />
          </div>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={manejarCambio}
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={manejarCambio}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={manejarCambio}
            />
          </div>
          <div>
            <label>País:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={manejarCambio}
            />
          </div>
          <button onClick={manejarGuardar}>Guardar</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <p><strong>Nombre de usuario:</strong> {profile.username}</p>
          <p><strong>Correo electrónico:</strong> {profile.email}</p>
          <p><strong>Nombre:</strong> {profile.firstname} {profile.lastname}</p>
          <p><strong>País:</strong> {profile.country}</p>
          <button onClick={() => setEditMode(true)}>Editar</button>
          <Link to="/private">Volver al dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
