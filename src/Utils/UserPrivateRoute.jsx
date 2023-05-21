import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const UserPrivateRoute = () => {

const clientToken = JSON.parse(localStorage.getItem('userToken'))

return (

    clientToken ? <Outlet/> : <Navigate to="/login"/>
)
   

}

export default UserPrivateRoute