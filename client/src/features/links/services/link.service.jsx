import { axiosInstance } from "../../../app/axios.jsx";

export const createLink = async (data) => {
  const res = await axiosInstance.post("/links", data);
  return res.data;
};

export const getLinks = async () => {
  const res = await axiosInstance.get("/links");
  return res.data;
};

export const updateLink = async (id, data) => {
  const res = await axiosInstance.patch(`/links/${id}`, data);
  return res.data;
};

export const deleteLink = async (id) => {
  const res = await axiosInstance.delete(`/links/${id}`);
  return res.data;
};