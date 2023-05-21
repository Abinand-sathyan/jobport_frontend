import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const RecruiterPrivateRoute = () => {

const clientToken = JSON.parse(localStorage.getItem('recruiterToken'))

return (

    clientToken ? <Outlet/> : <Navigate to="/recruiter/login"/>
)
   

}

export default RecruiterPrivateRoute