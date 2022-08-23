import axios from "axios";

const baseUrl = "https://api-nodejs-todolist.herokuapp.com";

// Register

export let register = (name, email, password, age, navigate) => {
  const options = {
    method: "POST",
    url: `${baseUrl}/user/register`,
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
    url: `${baseUrl}/user/login`,
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
    url: `${baseUrl}/user/logout`,
    headers: { Authorization: `${localStorage.getItem("token")}` },
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
    url: `${baseUrl}/task`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
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

export let addTask = (
  content
  //dispatchSetTodos,
  //updateCount,
  //count,
  //dispatchCurPage
) => {
  const options = {
    method: "POST",
    url: `${baseUrl}/task`,
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
      // getTaskByPagination(10, count * 10 - 10, dispatchSetTodos);
      //updateCount();
      //dispatchCurPage(count);
    })
    .then(() => {
      //console.log(count);
    })
    .catch((err) => console.log(err.response.data));
};

// delete task

export let deleteTask = (id, setTask, count, dispatchCurPage) => {
  const options = {
    method: "DELETE",
    url: `${baseUrl}/task/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
      //getTaskByPagination(10, count * 10 - 10, setTask);
    })
    .then(() => {
      getAllTask();
      //dispatchCurPage(count);
      //console.log(count);
    })
    .catch((err) => console.log(err.response.data));
};

// update task

export let updateTask = (id, completed, curPage, setTask) => {
  let data =
    completed === true || completed === false
      ? { completed: completed }
      : { description: completed };

  console.log({ id, completed });
  const options = {
    method: "PUT",
    url: `${baseUrl}/task/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  };

  axios
    .request(options)
    .then((res) => {
      // setTask(res.data.data);
      //getTaskByPagination(10, curPage * 10 - 10, setTask);
      console.log(res.data);
    })
    .catch((err) => console.log(err.response.data));
};
