import React from "react";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import { message } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Adminrecruitertable from "./Adminrecruitertable";
import { recruiterlist } from "../../../apis/adminapi";
import { reqBlockCheck } from "../../../apis/adminapi";
import { requnBlockCheck } from "../../../apis/adminapi";

const Adminrecruiter = () => {
  const [reqlistdata, setreqlistdata] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem("AdminToken");

  const Navigate = useNavigate();

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await recruiterlist(token).then((res) => {
          setreqlistdata(res.data.recuiterlist);
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/recruiter/login");
    }
  }, [Navigate, refresh, token]);

  const reqBlock = (reqId) => {
    if (token) {
      reqBlockCheck(reqId, token);
      setRefresh(!refresh);
    } else {
      Navigate("/admin/login");
    }
  };

  const requnBlock = (reqId) => {
    if (token) {
      requnBlockCheck(reqId, token);
      setRefresh(!refresh);
    } else {
      Navigate("/admin/login");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideBar />
        <Adminrecruitertable
          recruiterdata={reqlistdata}
          reqBlock={reqBlock}
          requnBlock={requnBlock}
        />
      </div>
    </div>
  );
};

export default Adminrecruiter;
