import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { recuiterLogout } from "../../redux/recruiter";
import { AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { SiPowerpages } from "react-icons/si";
import { BsMessenger } from "react-icons/bs";
import { MdPermContactCalendar } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import Arrowright from "../../lottiefiles/Arrowright.json";
import Lottie from "lottie-react";
import { useSelector, useDispatch } from "react-redux";

function Navbar({ controllmodal }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recuiter } = useSelector((state) => state.recuiterLogin);
  const token = localStorage.getItem("recruiterToken");

  const handlelogout = () => {
    localStorage.removeItem("recruiterToken");
    dispatch(recuiterLogout());
    navigate("/recruiter/login");
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
                  {token && (
                    <Link to="/reqhome">
                      <li className="py-2 flex items-center">
                        <AiFillHome />
                        <span>&nbsp;&nbsp;</span>Home
                      </li>
                    </Link>
                  )}
                  {token && (
                    <Link to="/myjobs">
                      <li className="py-2 flex items-center">
                        <FaSearch />
                        <span>&nbsp;&nbsp;</span>My Jobs
                      </li>
                    </Link>
                  )}
                  {token && (
                    <Link to="/hirecandidates">
                      <li className="py-2 flex items-center">
                        <SiPowerpages />
                        <span>&nbsp;&nbsp;</span>Hire Candidates
                      </li>
                    </Link>
                  )}
                  {token && (
                    <Link to="/messages">
                      <li className="py-2 flex items-center">
                        <BsMessenger />
                        <span>&nbsp;&nbsp;</span>Messages
                      </li>
                    </Link>
                  )}
                  {token && (
                    <Link to="/notification">
                      <li className="py-2 flex items-center">
                        <MdPermContactCalendar />
                        <span>&nbsp;&nbsp;</span>Notification
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
              {/* {token&&<li className='mx-4 my-6 md:my-0  text-siteviolet text-base'>
            <Link to="/reqhome"><p className="hover:text-siteviolet ">Home</p></Link>
            </li>} */}
              {token && (
                <li className="mx-4 my-6 md:my-0  text-siteviolet text-base">
                  <Link to="/recruiter/myjobs">
                    <p className="hover:text-siteviolet ">My Jobs</p>
                  </Link>
                </li>
              )}
              {token && (
                <li className="mx-4 my-6 md:my-0  text-siteviolet text-base">
                  <Link to="/recruiter/hiredcandidates">
                    <p className="hover:text-siteviolet">Hired Candidates</p>
                  </Link>
                </li>
              )}
              {token && (
                <li className="mx-4 my-6 md:my-0  text-siteviolet text-base">
                  <Link to="/recruiter/messages">
                    <p className="hover:text-siteviolet ">Messages</p>
                  </Link>
                </li>
              )}
              {token && (
                <li className="mx-4 my-6 md:my-0  text-siteviolet text-base">
                  <Link to="/recruiter/profile">
                    <p className="hover:text-siteviolet ">Profile</p>
                  </Link>
                </li>
              )}

              {recuiter ? (
                <button
                  type="button"
                  className="text-purple-700 hover:text-white border-t-2 border-siteviolet hover:bg-purple-800
             focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400
              dark:text-purple-400 dark:hover:text-white  dark:focus:ring-purple-900"
                  onClick={handlelogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  className="text-purple-700 hover:text-white border-t-2 border-siteviolet hover:bg-purple-800
              focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400
               dark:text-purple-400 dark:hover:text-white  dark:focus:ring-purple-900"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              )}
            </ul>
          </div>
        </section>
        <div className="relative text-end">
          {/* <div className="w-full flex flex-row bg-slate-100 justify-end text-black">
              <div className='mr-6 flex'>
                <Lottie animationData={Arrowright} className="h-4 mt-3 md:mt-5 pr-2"/>
              <button type="button" class="focus:outline-none text-white bg-siteviolet focus:ring-4 
              rounded-xl md:text-lg text-sm md:px-10 px-5 md:py-2 font-bold   py-2 md:mr-2 md:my-2 my-1" onClick={()=>{controllmodal(true)}

              }>Add Job</button>
              
              </div>
          </div> */}
          <div className=" w-full flex justify-center bg-yellow-600 text-sm py-1 font-bold text-black">
            <p>
              As a recruiter, you can post jobs, view resumes, and connect with
              qualified candidates on our platform
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
