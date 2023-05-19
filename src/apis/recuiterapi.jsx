import axios from "../axios/axios";

export const recuiterdata = async (token) => {
  try {
    const response = await axios({
      url: "/recruiter/recruiterdata",
      method: "get",
      headers: { recuitertoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const jobdata = async (token) => {
  try {
    const response = await axios({
      url: "/recruiter/jobdata",
      method: "get",
      headers: { recuitertoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const resumedata = async (token, userId) => {
  try {
    const response = await axios({
      url: "/recruiter/resumedata",
      method: "post",
      data: { userId },
      headers: { recuitertoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const subscriptiondata = async (token) => {
  try {
    const response = await axios({
      url: "/recruiter/subscriptiondata",
      method: "get",
      headers: { recuitertoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const singlejobdata = async (token, jobId) => {
  try {
    const response = await axios({
      url: "/recruiter/singlejobdata",
      method: "post",
      data: { jobId },
      headers: { recuitertoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const completePayment = async (token, subId) => {
  try {
    const response = await axios({
      url: "/recruiter/payment",
      method: "post",
      data: { subId },
      headers: { recuitertoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const Editrecruiter = async (token, reqdata) => {
  try {
    const response = await axios({
      url: "/recruiter/recruiteredit",
      method: "post",
      data: { reqdata },
      headers: { recuitertoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const hirecandidates = async (token, jobanduserId) => {
  try {
    const response = await axios({
      url: "/recruiter/hirecandidates",
      method: "post",
      data: { jobanduserId },
      headers: { recuitertoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const hiredcandidates = async (token) => {
  try {
    const response = await axios({
      url: "/recruiter/hiredcandidates",
      method: "get",
      headers: { recuitertoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};
