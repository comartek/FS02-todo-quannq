import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com",
});

export const get = async (url, options = {}) => {
  const response = await instance.get(url, options);
  return response;
};

export const post = async (url, data = {}, options = {}) => {
  const response = await instance.post(url, data, options);
  return response;
};

export const remove = async (url, options = {}) => {
  const response = await instance.delete(url, options);
  return response;
};

export const put = async (url, data = {}, options = {}) => {
  const response = await instance.post(url, data, options);
  return response;
};

export default instance;
