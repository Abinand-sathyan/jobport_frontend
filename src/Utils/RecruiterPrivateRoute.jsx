import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const RecruiterPrivateRoute = () => {

    const token = localStorage.getItem("recruiterToken");

return (

    token ? <Outlet/> : <Navigate to="/recruiter/login"/>
)
   

}

export default RecruiterPrivateRoute