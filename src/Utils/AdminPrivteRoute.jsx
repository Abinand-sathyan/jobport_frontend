import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const AdminPrivteRoute = () => {

const adminToken = JSON.parse(localStorage.getItem('AdminToken'))

return (

    adminToken ? <Outlet/> : <Navigate to="/admin/login"/>
)
   

}

export default AdminPrivteRoute