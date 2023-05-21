import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const UserPrivateRoute = () => {

    const token = localStorage.getItem("userToken");

return (

    token ? <Outlet/> : <Navigate to="/login"/>
)
   

}

export default UserPrivateRoute