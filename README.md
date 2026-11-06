# AuthenticationProject

Aplicación de demostración de autenticación full stack con una API en Spring Boot y una interfaz en React. El backend reúne Spring Security, JPA, MySQL y JWT; el frontend consume la API y ofrece las pantallas de autenticación.

## Componentes

- `authentication/`: backend Java 21 y Spring Boot 3.3.
- `frontreactauth/`: frontend React 18 con React Router y Axios.

## Requisitos

- JDK 21.
- Maven.
- Node.js y npm.
- MySQL configurado para el backend.

## Ejecución

Configura primero la conexión a MySQL en el backend. Después ejecuta el servicio Spring Boot desde `authentication/` y, en otra terminal, inicia el frontend:

```bash
cd frontreactauth
npm install
npm start
```

Las rutas, entidades y reglas de seguridad se pueden revisar en el código de cada componente. No uses credenciales reales al compartir configuraciones.
