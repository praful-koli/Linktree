import { axiosInstance } from "../../../app/axios";

export const getAnalytics = async (username) => {
  const res = await axiosInstance.get(`/links/${username}/analytics`);
  return res.data;
};