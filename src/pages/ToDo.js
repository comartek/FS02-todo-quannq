import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as apiServices from "../services/apiServices";
//import PaginatedItems from "../components/PaginatedItems";

import "./ToDo.css";
import TodoComponent from "../components/TodoComponent";

const ToDo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [enterContent, setEnterContent] = useState("");
  const [storeValue, setStoreValue] = useState([]);

  const [edit, setEdit] = useState("");

  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskSuccess, setTaskSuccess] = useState([]);

  console.log(`Hien thi edit : `, edit);
  console.log(`Hien thi storevalue : `, storeValue);

  const getFullData = useCallback(async () => {
    setIsLoading(true);

    let results = await apiServices.getTask();
    setStoreValue(results.data);

    setIsLoading(false);
  }, []);

  // get task complete

  const getTaskByCompleted = useCallback(() => {
    axios
      .get("https://api-nodejs-todolist.herokuapp.com/task?completed=true", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setTaskSuccess(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  useEffect(() => {
    getFullData();
    getTaskByCompleted();
  }, [getFullData, getTaskByCompleted]);

  // add task
  const addTaskHandler = async () => {
    if (enterContent.length === 0) {
      alert("Can not add emty item");
    } else {
      let results = await apiServices.addTask(enterContent);
      setStoreValue((prev) => [results.data.data, ...prev]);
      setEnterContent("");
    }
  };

  // log out

  const userLogout = () => {
    localStorage.removeItem("user_login");
    navigate("/login");
  };

  // delete item

  const deleteItemHandler = (itemState) => () => {
    axios
      .delete(
        `https://api-nodejs-todolist.herokuapp.com/task/${itemState._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        getFullData();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(itemState);
    const currentState = storeValue.filter(
      (item) => item._id !== itemState._id
    );
    setStoreValue(currentState);
  };

  // const deleteItemHandler = async (itemState) => {
  //   let results = await apiServices.deleteTask(itemState._id);
  //   getFullData();
  //   const currentState = storeValue.filter(
  //     (item) => item._id !== itemState._id
  //   );
  //   setStoreValue(results);
  // };

  // EDIT

  const editItemHandler = (itemState) => () => {
    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/task/${itemState}`,
        {
          description: edit,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setEditing(null);
        getFullData();
      })
      .catch((err) => console.log(err));
  };

  // const editItemHandler = async (itemState) => {
  //   await apiServices.editTask(itemState, edit);
  //   setEditing(null);
  //   getFullData();
  // };

  // change status item

  const doneItemHandler = (itemState) => {
    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/task/${itemState._id}`,
        {
          completed: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getFullData();
        //setStoreValue(res.data);
        console.log(`Hien thi xem nay`, res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TodoComponent
        userLogout={userLogout}
        navigate={navigate}
        enterContent={enterContent}
        setEnterContent={setEnterContent}
        addTaskHandler={addTaskHandler}
        storeValue={storeValue}
        setEdit={setEdit}
        edit={edit}
        editItemTwo={editItemHandler}
        setEditing={setEditing}
        editing={editing}
        doneItemHandler={doneItemHandler}
        deleteItemHandler={deleteItemHandler}
        isLoading={isLoading}
      />
    </>
  );
};

export default ToDo;
