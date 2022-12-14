import React from 'react';

//packages
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    //get user in localstorage
    const auth = localStorage.getItem("user");

    return auth ? (<Outlet />) : (<Navigate to='/signup' />)
};

export default PrivateRoute;
