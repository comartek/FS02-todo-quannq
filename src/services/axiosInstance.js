import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com",
  headers: {
    "Content-Type": "application",
  },
});

export default instance;
