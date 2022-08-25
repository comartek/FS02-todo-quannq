import axios from "axios";
import instance from "./axiosInstance";

// Register

export let register = (name, email, password, age) => {
  const options = {
    method: "POST",
    url: `${instance.baseUrl}/user/register`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      name: name,
      email: email,
      password: password,
      age: age,
    },
  };
  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.token);
    })
    .catch((err) => console.log(err.response.data));
};

// Login

export let login = (email, password, navigate) => {
  const options = {
    method: "POST",
    url: `${instance.baseUrl}/user/login`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      email: email,
      password: password,
    },
  };
  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
    })
    .then(() => setTimeout(() => navigate("/todo"), 2000))
    .catch((err) => console.log(err.response.data));
};

// Logout

export let logout = (navigate) => {
  const options = {
    method: "POST",
    url: `${instance.baseUrl}/user/logout`,
    headers: { Authorization: ` Bearer ${localStorage.getItem("token")}` },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
    })
    .then(() => navigate("/"))
    .catch((err) => console.log(err.response.data));
};

// Get All Task

export let getAllTask = (setTaskList) => {
  const options = {
    method: "GET",
    url: `${instance.baseUrl}/task`,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${localStorage.getItem("token")}`,
    },
  };

  axios
    .request(options)
    .then((res) => {
      setTaskList(res.data.data);
    })
    .catch((err) => console.log(err.response.data));
};

// ADD Task

export let addTask = (content) => {
  const options = {
    method: "POST",
    url: `${instance.baseUrl}/task`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      description: content,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
    })

    .catch((err) => console.log(err.response.data));
};

// update task

export let updateTask = (id, completed) => {
  let data =
    completed === true || completed === false
      ? { completed: completed }
      : { description: completed };

  console.log({ id, completed });
  const options = {
    method: "PUT",
    url: `${instance.baseUrl}/task/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err.response.data));
};

// delete task

export let deleteTask = (id, getAllTask) => {
  const options = {
    method: "DELETE",
    url: `${instance.baseUrl}/task/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
    })
    .then(() => {
      getAllTask();
    })
    .catch((err) => console.log(err.response.data));
};
