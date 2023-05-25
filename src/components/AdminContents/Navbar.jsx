import React from 'react'
import { useSelector,useDispatch} from "react-redux";
import { adminLogout } from "../../redux/admin"
import {useNavigate,Link } from 'react-router-dom'

const Navbar=()=> {

  const {admin} = useSelector((state) => state.adminLogin)

  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handlelogout=()=>{
    localStorage.removeItem("AdminToken");
    dispatch(adminLogout())
    navigate("/admin/login")
  }
  return (
    <div>
        <div className="navbar bg-slate-100">
  <div className="flex-1">
    <Link className="btn btn-ghost normal-case text-xl">Simplr</Link>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered" />
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
  <li>
   
  </li>
 
  <li><p onClick={handlelogout}>Logout</p></li>
</ul>


    </div>
  </div>
</div>
      
    </div>
  )
}

export default Navbar
