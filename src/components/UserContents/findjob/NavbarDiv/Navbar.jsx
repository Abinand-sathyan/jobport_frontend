import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.userLogin);
  const token = localStorage.getItem("userToken");
  return (
    <div className="navBar flex justify-between items-center p-[3rem]">
      <div className="logoDiv">
        <h1 className="logo  text-[25px] text-blueColor">
          <strong>job</strong>Search
        </h1>
      </div>
      <div className="menu flex gap-8">
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">jobs</li>
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">
          Companies
        </li>
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">About</li>
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">Conact</li>
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">Blogs</li>
        {user ? (
          <li className="menuList text-[#6f6f6f] hover:text-blueColor">
            logout
          </li>
        ) : (
          <li className="menuList text-[#6f6f6f] hover:text-blueColor">
            Login
          </li>
        )}
        <li className="menuList text-[#6f6f6f] hover:text-blueColor">
          Register
        </li>
      </div>
    </div>
  );
};

export default Navbar;
