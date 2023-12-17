import axios from "../axios/axios";

  export const userlist = async (token) => {
    try {
      const response = await axios({
        url: "/admin/userlist",
        method: "get",
        headers: { adminToken: token },
      });
      return response;
    } catch (error) {
      return error;
    }
  };

export const recruiterlist = async (token) => {
  try {
    const response = await axios({
      url: "/admin/recuiterlist",
      method: "get",
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const userBlockCheck = async (userId, token) => {
  try {
    const response = await axios({
      url: "/admin/userblock",
      method: "patch",
      data: { userId },
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const userunBlockCheck = async (userId, token) => {
  try {
    const response = await axios({
      url: "/admin/userunblock",
      method: "patch",
      data: { userId },
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const reqBlockCheck = async (userId, token) => {
  try {
    const response = await axios({
      url: "/admin/recruiterblock",
      method: "patch",
      data: { userId },
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const requnBlockCheck = async (userId, token) => {
  try {
    const response = await axios({
      url: "/admin/recruiterunblock",
      method: "patch",
      data: { userId },
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const jobsdata = async (token) => {
  try {
    const response = await axios({
      url: "/admin/jobsdata",
      method: "get",
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const jobApprove = async (reqId, token) => {
  try {
    const response = await axios({
      url: "/admin/approvejob",
      method: "patch",
      data: { reqId },
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const jobpending = async (reqId, token) => {
  try {
    const response = await axios({
      url: "/admin/pendingjob",
      method: "patch",
      data: { reqId },
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const Addsubscription = async (token, data) => {
  try {
    const response = await axios({
      url: "/admin/addsubscription",
      method: "post",
      data: { data },
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const subscriptiondata = async (token) => {
  try {
    const response = await axios({
      url: "/admin/subscriptiondata",
      method: "get",
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getdashBoard = async (token) => {
  try {
    const response = await axios({
      url: "/admin/getdashboard",
      method: "get",
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};


export const recruiterSub=async (token) => {
  try {
    const response = await axios({
      url: "/admin/ReqSub",
      method: "get",
      headers: { adminToken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const Subcancel=async (token,data) => {
  try {
    const response = await axios({
      url: "/admin/Subcancel",
      method: "post",
      data:{data},
      headers:{adminToken: token},
    });
    return response;
  } catch (error) {
    return error;
  }
};


