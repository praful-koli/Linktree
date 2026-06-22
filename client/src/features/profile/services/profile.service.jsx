import { axiosInstance } from "../../../app/axios";

export const getPublicProfile = async (username) => {
  const res = await axiosInstance.get(`/links/${username}/profile`);
  return res.data;
};