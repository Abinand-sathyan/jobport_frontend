import React from "react";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import { message } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Aadminusertable from "./Aadminusertable";
import { userlist } from "../../../apis/adminapi";
import { userBlockCheck } from "../../../apis/adminapi";
import { userunBlockCheck } from "../../../apis/adminapi";

const AdminUser = () => {
  const [userlistdata, setUserlistdata] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem("AdminToken");

  const Navigate = useNavigate();

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await userlist(token).then((res) => {
          setUserlistdata(res.data.userlist);
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/admin/login");
    }
  }, [Navigate, refresh, token]);

  const userBlock = (userId) => {
    if (token) {
      userBlockCheck(userId, token);
      setRefresh(!refresh);
    } else {
      Navigate("/admin/login");
    }
  };

  const userunBlock = (userId) => {
    if (token) {
      userunBlockCheck(userId, token);
      setRefresh(!refresh);
    } else {
      Navigate("/admin/login");
    }
  };

  return (
    <div className="ab">
      <Navbar />
      <div className="flex">
        <SideBar />
        <Aadminusertable
          userdata={userlistdata}
          userBlock={userBlock}
          userunBlock={userunBlock}
        />
      </div>
    </div>
  );
};

export default AdminUser;
