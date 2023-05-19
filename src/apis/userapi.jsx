import axios from "../axios/axios";

export const jobdata = async (token) => {
  try {
    const response = await axios({
      url: "/jobdata",
      method: "get",
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const jobapply = async (jobId, token) => {
  try {
    const response = await axios({
      url: "/jobapply",
      method: "patch",
      data: { jobId },
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const SearchResult = async (token, SearchText) => {
  try {
    const response = await axios({
      url: "/searchresult",
      method: "post",
      data: { SearchText },
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const resumebuild = async (token, resumedata) => {
  try {
    const response = await axios({
      url: "/resumebuild",
      method: "post",
      data: { resumedata },
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const Editresume = async (token, resumedata) => {
  try {
    const response = await axios({
      url: "/resumeedit",
      method: "post",
      data: { resumedata },
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const resumedata = async (token) => {
  try {
    const response = await axios({
      url: "/resumedata",
      method: "get",
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const appliedjobs = async (token) => {
  try {
    const response = await axios({
      url: "/appliedjobs",
      method: "get",
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const SearchResultjob = async (token, termjob) => {
  try {
    const response = await axios({
      url: "/searchjobterm",
      method: "post",
      data: { termjob },
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const SearchResultcompany = async (token, termcompany) => {
  try {
    const response = await axios({
      url: "/searchcompanyterm",
      method: "post",
      data: { termcompany },
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const SearchResultlocation = async (token, termlocation) => {
  try {
    const response = await axios({
      url: "/searchlocationterm",
      method: "post",
      data: { termlocation },
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const Recruiter = async (token) => {
  try {
    const response = await axios({
      url: "/recruiterdata",
      method: "get",
      headers: { accesstoken: token },
    });
    return response;
  } catch (error) {
    return error;
  }
};
