import { React, useEffect, useState } from "react";
import Profilepage from "../../components/UserContents/Profile/Profilepage";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/UserContents/findjob/FooterDiv/Footer";
import { resumedata } from "../../apis/userapi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userdata, setUserdata] = useState({});
  const [resumedatas, setResumedata] = useState([]);

  const token = localStorage.getItem("userToken");
  const Navigate = useNavigate();

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await resumedata(token).then((res) => {
          setResumedata(res.data.resumedata);
          setUserdata(res.data.resumedata[0].userId);
        });
      })();
    } else {
      message.error("Please Login");
      Navigate("/recruiter/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Profilepage userdata={userdata} resumedatas={resumedatas} />
      <Footer />
    </div>
  );
};

export default Profile;
