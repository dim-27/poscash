import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const axiosClient = axios.create({ baseURL: baseUrl });

export const getAPI = async (params) => {
  const res = await axiosClient.get(`${baseUrl}/${params}`);
  return res.data;
};

export const postAPI = async (params, data) => {
  const res = await axiosClient.post(`${baseUrl}/${params}`, data);
  return res.data;
};

export const postAPIFormData = async (params, data, token) => {
  const res = await axiosClient.put(`${baseUrl}/${params}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const putAPI = async (params, data, token) => {
  const res = await axiosClient.put(`/${params}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteAPI = async (params, token) => {
  const res = await axios.delete(`${baseUrl}/${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
