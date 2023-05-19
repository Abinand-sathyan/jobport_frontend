/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../redux/user";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { SiPowerpages } from "react-icons/si";
import { BsMessenger } from "react-icons/bs";
import { MdPermContactCalendar } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.clientLogin);

  const dispatch = useDispatch();

  const handlelogout = () => {
    localStorage.removeItem("userToken");
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <div>
      {open ? (
        <div className=" bg-slate-50 w-72 md:w-31rem  top-16 absolute right-0 z-50 md:hidden">
          <card className="relative top-2">
            <div className="block max-w-sm p-6 bg-siteviolet border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className=" flex justify-between items-center">
                <CgProfile className="text-4xl text-white rounded-full" />
                <p className="text-slate-50 font-semibold relative ">
                  Hello & Welcome
                </p>
              </div>
              <hr className="mx-auto bg-white mt-5"></hr>
              <div>
                <ul className="mt-8 text-slate-50 text-left">
                  <Link to="/home">
                    <li className="py-2 flex items-center">
                      <AiFillHome />
                      <span>&nbsp;&nbsp;</span>Home
                    </li>
                  </Link>
                  <Link to="/browsejob">
                    <li className="py-2 flex items-center">
                      <FaSearch />
                      <span>&nbsp;&nbsp;</span>Browse job
                    </li>
                  </Link>
                  <Link to="/pages">
                    <li className="py-2 flex items-center">
                      <SiPowerpages />
                      <span>&nbsp;&nbsp;</span>Pages
                    </li>
                  </Link>
                  <Link to="/mesages">
                    <li className="py-2 flex items-center">
                      <BsMessenger />
                      <span>&nbsp;&nbsp;</span>Messages
                    </li>
                  </Link>
                  {/* <Link to="/contact"><li className='py-2 flex items-center'><MdPermContactCalendar/><span>&nbsp;&nbsp;</span>Contact</li></Link> */}
                  {user ? (
                    <li className="py-2 flex items-center">
                      <RiLoginBoxFill />
                      <span>&nbsp;&nbsp;</span>{" "}
                      <a href="#" onClick={handlelogout}>
                        Logout
                      </a>
                    </li>
                  ) : (
                    <Link to="/login">
                      <li className="py-2 flex items-center">
                        <RiLoginBoxFill />
                        <span>&nbsp;&nbsp;</span>Login
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </card>
        </div>
      ) : (
        <div></div>
      )}
      <header className="bg-light-white text-black sticky top-0 z-10 dark:text-white">
        <section className="mx-auto px-8 flex justify-between items-center text-left">
          <Link to="/">
            <img
              className="w-32 "
              src="../../../Images/6298b706a7ec9113144ed393.png"
              alt=""
            />
          </Link>

          <span
            className="text-4xl cursor-pointer  flex md:hidden block
        "
            value="menu"
          >
            {open ? (
              <RxCross1
                onClick={() => {
                  setOpen(false);
                }}
              />
            ) : (
              <AiOutlineMenu
                onClick={() => {
                  setOpen(true);
                }}
              />
            )}
          </span>
          <div
            className="hidden md:block space-x-8 text-sm font-sans text-gray-700 ml-2"
            aria-label="main"
          >
            <ul
              className="md:flex items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7
           md:opacity-100 opacity-0 top-[-400] transition-all ease-in"
            >
              {user && (
                <li className="mx-4 my-6 md:my-0  text-siteviolet text-base">
                  <Link to="/home">
                    <p className="hover:text-siteviolet ">Home</p>
                  </Link>
                </li>
              )}
              {user && (
                <li className="mx-4 my-6 md:my-0  text-siteviolet text-base">
                  <Link to="/findjobs">
                    <p className="hover:text-siteviolet ">Browse Job</p>
                  </Link>
                </li>
              )}
              {user && (
                <li className="mx-4 my-6 md:my-0  text-siteviolet text-base">
                  <Link to="/jobapplied">
                    <p className="hover:text-siteviolet ">Applied jobs</p>
                  </Link>
                </li>
              )}
              {user && (
                <li className="mx-4 my-6 md:my-0  text-siteviolet text-base">
                  <Link to="/messages">
                    <p className="hover:text-siteviolet ">Messages</p>
                  </Link>
                </li>
              )}
              {/* {user&&<li className='mx-4 my-6 md:my-0  text-siteviolet text-base'>
            <Link to="/contact"><p className="hover:text-siteviolet ">Contact</p></Link>
            </li>} */}
              {user ? (
                <div className="dropdown dropdown-end z-50">
                  <label tabIndex={0} className="btn m-1">
                    Pages
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow  z-50 bg-base-100 rounded-box w-52"
                  >
                    <Link to="/profile">
                      {" "}
                      <li>
                        <a>Profile</a>
                      </li>
                    </Link>
                    <li>
                      <a onClick={handlelogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <button
                  type="button"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-full text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  login
                </button>
              )}
            </ul>
          </div>
        </section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center bg-yellow-600 text-sm py-1 font-bold text-black">
          <p className="font-bold">
            As a job seeker, you can browse job openings, apply for positions,
            and manage your applications on our platform.
          </p>
        </div>
        <div className="relative text-end">
          <div className="w-full flex flex-row bg-slate-100 justify-end text-black">
            <div className="mr-6 flex">
              <h1 className=" py-3 pr-3">ForEmployer</h1>
              <button
                type="button"
                onClick={() => navigate("/recruiter/login")}
                className="text-purple-800 border border-purple-800 hover:purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full h-6  my-auto text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
