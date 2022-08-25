import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import PaginatedItems from "../components/PaginatedItems";
import "./ToDo.css";

const ToDo = ({ currentItems }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [enterContent, setEnterContent] = useState("");
  const [storeValue, setStoreValue] = useState([]);

  const [edit, setEdit] = useState(""); // editting Text
  //const itemsPerPage = 8;
  const [editing, setEditing] = useState(false); // todo editing

  const [taskSuccess, setTaskSuccess] = useState([]);

  console.log(`Hien thi edit : `, edit);
  console.log(`Hien thi storevalue : `, storeValue);

  const getTask = useCallback(() => {
    axios
      .get("https://api-nodejs-todolist.herokuapp.com/task", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStoreValue(res.data.data);
      });
  }, [token]);

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
      });
  }, [token]);

  useEffect(() => {
    getTask();
    getTaskByCompleted();
  }, [getTask, getTaskByCompleted]);

  const addTaskHandler = () => {
    if (enterContent.length === 0) {
      alert("Can not add emty item");
    } else {
      axios
        .post(
          `https://api-nodejs-todolist.herokuapp.com/task`,
          {
            description: enterContent,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setStoreValue((prev) => [res.data.data, ...prev]);
          setEnterContent("");
        });
    }
  };

  const userLogout = () => {
    localStorage.removeItem("user_login");
    navigate("/login");
  };

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
        getTask();
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

  // EDIT

  const editItemTwo = (itemState) => () => {
    try {
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
        .then((res) => {
          setEditing(null);
          getTask();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const doneItemHandler = (itemState) => () => {
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
        getTask();
        setStoreValue(res.data);
        console.log(res.data);
      });

    alert("Done");
  };

  let isEmtyObj = Object.keys(edit).length === 0;
  console.log(" ham input co trong khong", isEmtyObj);

  return (
    <div className="toDo">
      <div className="toDo__button">
        <button onClick={userLogout}>Logout</button>
        <button onClick={() => navigate("/profile")}>User Profile</button>
      </div>

      <div className="header">
        <div className="header__icon">
          <div className="header__input">
            <form>
              <span className="form__input">
                <input
                  type="text"
                  value={enterContent}
                  id="content"
                  onChange={(e) => setEnterContent(e.target.value)}
                  placeholder="Content"
                />
                <span></span>
              </span>
            </form>
          </div>
          <button onClick={addTaskHandler}>ADD ITEM</button>
        </div>
        <div className="header__table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Content</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {storeValue.map((st, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    {editing === st._id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={edit}
                            onChange={(e) => setEdit(e.target.value)}
                          />
                        </td>
                        <td>
                          <button onClick={editItemTwo(st._id)}>Save</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td
                          style={{
                            textDecoration: st.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {st.description}
                        </td>
                        <td>
                          <button onClick={() => setEditing(st._id)}>
                            Edit
                          </button>
                          <button onChange={doneItemHandler(st)}>Done</button>
                        </td>
                      </>
                    )}

                    <td>
                      <button onClick={deleteItemHandler(st)}>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <PaginatedItems storeValue={storeValue} itemsPerPage={itemsPerPage} /> */}
      </div>
    </div>
  );
};

export default ToDo;
