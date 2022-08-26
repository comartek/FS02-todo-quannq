import axios from "axios";
import instance from "../api/axiosInstance";

// Register

export const register = (name, email, password, age) => {
  try {
    const res = instance.post("/user/register", {
      name: name,
      email: email,
      password: password,
      age: age,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Login

export let login = (email, password, navigate) => {
  try {
    const res = instance.post("/user/login", {
      email: email,
      password: password,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
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

export const getTask = async () => {
  try {
    const res = await instance.get("/task", {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// add task
export const addTask = async (content) => {
  try {
    const res = await instance.post(
      "/task",
      {
        description: content,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
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

export let editTask = async (id, content) => {
  try {
    const res = await instance.put(
      `/task/${id}`,
      {
        description: content,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

// delete task

// export let deleteTask = (id, getAllTask) => {
//   const options = {
//     method: "DELETE",
//     url: `${instance.baseUrl}/task/${id}`,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   };

//   axios
//     .request(options)
//     .then((res) => {
//       console.log(res.data);
//     })
//     .then(() => {
//       getAllTask();
//     })
//     .catch((err) => console.log(err.response.data));
// };

export const deleteTask = async (id) => {
  try {
    const res = await instance.remove(`/task/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
