import React from 'react';
import './PrivacyPolicy.css';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="contenedor_privacypolicy">

            <nav className='nav_privacypolicy'>
                <ul>
                    <li><Link to="/registerform">Volver al register</Link></li>
                </ul>
            </nav>

            <h6 className='title_update'> Actualizado el 15/06/2024</h6>
            <h1 className="privacy_title">Política de Privacidad</h1>

            <div className="contenido_privacy">
                <section>
                    <h2>1. Introducción</h2>
                    <p>
                        Esta Política de Privacidad describe cómo recopilamos, usamos y compartimos su información personal cuando visita o realiza una compra en nuestro sitio web.
                    </p>
                </section>

                <section>
                    <h2>2. Información que Recopilamos</h2>
                    <p>
                        Recopilamos varios tipos de información en relación con las actividades de nuestros usuarios en nuestro sitio web, tales como:
                    </p>
                    <ul>
                        <li>Información de identificación personal (nombre, dirección de correo electrónico, dirección postal, número de teléfono, etc.).</li>
                        <li>Información de pago (número de tarjeta de crédito, dirección de facturación, etc.).</li>
                        <li>Información técnica (dirección IP, tipo de navegador, sistema operativo, etc.).</li>
                        <li>Información sobre las transacciones (detalles de las compras realizadas, etc.).</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Uso de su Información</h2>
                    <p>
                        Utilizamos la información recopilada para:
                    </p>
                    <ul>
                        <li>Procesar y completar sus pedidos.</li>
                        <li>Comunicarnos con usted.</li>
                        <li>Proporcionar soporte al cliente.</li>
                        <li>Mejorar nuestro sitio web y servicios.</li>
                        <li>Cumplir con nuestras obligaciones legales.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Compartir su Información</h2>
                    <p>
                        No vendemos, intercambiamos ni alquilamos su información personal a terceros. Sin embargo, podemos compartir su información con terceros confiables que nos asisten en operar nuestro sitio web, llevar a cabo nuestro negocio o servirle a usted, siempre que estas partes acuerden mantener esta información confidencial.
                    </p>
                </section>

                <section>
                    <h2>5. Seguridad de su Información</h2>
                    <p>
                        Implementamos diversas medidas de seguridad para mantener la seguridad de su información personal cuando realiza un pedido o ingresa, envía o accede a su información personal.
                    </p>
                </section>

                <section>
                    <h2>6. Sus Derechos</h2>
                    <p>
                        Usted tiene derecho a acceder, rectificar o eliminar su información personal. También tiene derecho a restringir u oponerse al tratamiento de sus datos personales, así como a la portabilidad de los mismos.
                    </p>
                </section>

                <section>
                    <h2>7. Cambios en Nuestra Política de Privacidad</h2>
                    <p>
                        Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos sobre cualquier cambio publicando la nueva política de privacidad en nuestro sitio web.
                    </p>
                </section>

                <section>
                    <h2>8. Contacto</h2>
                    <p>
                        Si tiene alguna pregunta sobre esta política de privacidad, puede contactarnos a través del siguiente correo electrónico: contacto@mail.com
                    </p>
                </section>
            </div>

            <footer className="footer_privacypolicy">
                <p>&copy; Todos los derechos reservados - Luis Hostos</p>
                <Link to="/">Volver al inicio</Link>
            </footer>

        </div>
    );
}

export default PrivacyPolicy;