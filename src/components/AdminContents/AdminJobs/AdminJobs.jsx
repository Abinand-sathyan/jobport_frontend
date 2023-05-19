import React from "react";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import { message } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jobsdata } from "../../../apis/adminapi";
import { jobApprove } from "../../../apis/adminapi";
import AdminJobstable from "./AdminJobstable";
import { jobpending } from "../../../apis/adminapi";

const AdminJobs = () => {
  const [jobdatas, setJobdatas] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem("AdminToken");

  const Navigate = useNavigate();

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await jobsdata(token).then((res) => {
          setJobdatas(res.data.jobdata);
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/recruiter/login");
    }
  }, [Navigate, refresh, token]);

  const approve = (reqId) => {
    if (token) {
      jobApprove(reqId, token);
      setRefresh(!refresh);
    }
  };

  const pending = (reqId) => {
    if (token) {
      jobpending(reqId, token);
      setRefresh(!refresh);
    }
  };

  return (
    <div className="ab">
      <Navbar />
      <div className="flex">
        <SideBar />
        <AdminJobstable
          jobsdata={jobdatas}
          approve={approve}
          pending={pending}
        />
      </div>
    </div>
  );
};

export default AdminJobs;
