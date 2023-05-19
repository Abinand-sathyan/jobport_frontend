import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../axios/axios";
import { message } from "antd";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Restpassword = () => {
  const [newpassowrd, setnewPassword] = useState("");
  const [cnpassword, setCpaasword] = useState("");
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const userId = location.state;

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setnewPassword(e.target.value);
  };

  const handleChange1 = (e) => {
    setCpaasword(e.target.value);
  };

  const validateaField = (data) => {
    let errors = {};

    if (!data.confirmpassword) {
      errors.confirmpassword = "confirm passwor is required";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.confirmpassword !== data.password) {
      errors.passwordnotmatch = "password not matched";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = {
      password: data.get("newpassword"),
      confirmpassword: data.get("conformpassword"),
    };
    if (validateaField(data)) {
      if (data.password && data.confirmpassword) {
        const response = await axios({
          url: "/Auth/changepasword",
          method: "post",
          data: {
            data,
            userId,
          },
        });
        if (response.data.status === "failed") {
          message.error(response.data.message);
        } else {
          Navigate("/login");
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-siteviolet">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-violet-900">
            Enter your new pasword to reset your password
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm  text-left font-medium text-gray-700"
                >
                  new pasword
                </label>
                <div className="mt-1">
                  <input
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter new passowrd"
                    value={newpassowrd}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && (
                  <span className="error text-red-400">{errors.password}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm  text-left font-medium text-gray-700"
                >
                  confirm password
                </label>
                <div className="mt-1">
                  <input
                    id="conformpassword"
                    name="conformpassword"
                    type="password"
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="confirm password"
                    value={cnpassword}
                    onChange={handleChange1}
                  />
                </div>
                {errors.confirmpassword && (
                  <span className="error text-red-400">
                    {errors.confirmpassword}
                  </span>
                )}
                {errors.passwordnotmatch && (
                  <span className="error text-red-400">
                    {errors.passwordnotmatch}
                  </span>
                )}
              </div>

              <div>
                <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Restpassword;
