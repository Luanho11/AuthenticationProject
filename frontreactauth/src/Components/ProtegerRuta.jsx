import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtegerRuta = ({isAllowed, children, redirectTo="/loginform"}) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? children : <Outlet />;
}

export default ProtegerRuta;