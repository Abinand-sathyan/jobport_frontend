import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";

const Conversation = ({ conversation, currentuserdata }) => {
  const [recruiter, setRecruter] = useState(null);

  useEffect(() => {
    const recruiterId = conversation?.members?.find(
      (m) => m !== currentuserdata
    );

    const getRecruiter = async () => {
      try {
        const res = await axios(
          `/conversation/recruiters?recruiterId=${recruiterId}`
        );

        setRecruter(res.data);
      } catch (err) {
       
      }
    };
    getRecruiter();
  }, [currentuserdata, conversation]);

  return (
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
        {recruiter?.recruiter[0].concern_name.charAt(0)}
      </div>
      <div className="ml-2 text-sm font-semibold">
        {recruiter?.recruiter[0].concern_name}
      </div>
    </button>
  );
};

export default Conversation;
