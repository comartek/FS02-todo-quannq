import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaginatedItems from "../components/PaginatedItems";
import "./ToDo.css";

const ToDo = ({ currentItems }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [enterContent, setEnterContent] = useState("");
  const [storeValue, setStoreValue] = useState([]);
  //const [editItem, setEditItem] = useState([]);
  const [edit, setEdit] = useState({});
  const itemsPerPage = 8;

  //const [editComplete, setEditComplete] = useState(false);
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
        getTaskByCompleted();
      });

    console.log(itemState);
    const currentState = storeValue.filter(
      (item) => item._id !== itemState._id
    );
    setStoreValue(currentState);
  };

  // const editItemTwo = async (id) => () => {
  //   const updateContent = { description: editItem };
  //   try {
  //     const response = axios.put(
  //       `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
  //       updateContent,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setStoreValue(
  //       storeValue.map((store) =>
  //         store.id === id ? { ...response.data } : store
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const editItemHandler = (itemState) => () => {
    let isEmtyObj = Object.keys(edit).length === 0;

    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/task/${itemState._id}`,
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
        console.log(res.data);
        getTask();
        getTaskByCompleted();
      });

    if (isEmtyObj === false && edit._id === itemState._id) {
      // thay doi gia tri cua doi tuong trong mang, update lai gia tri khi an nut edit
      let storeValueCopy = [...storeValue];
      let objIndex = storeValueCopy.findIndex(
        (obj) => obj._id === itemState._id
      );

      storeValueCopy[objIndex].description = edit.description;
      setStoreValue(storeValueCopy);
      setEdit({});
      return;
    }
    setEdit(itemState);
  };

  const handlerEditItemStore = (e) => {
    let editTodoCopy = { ...edit };
    editTodoCopy.description = e.target.value;
    setEdit(editTodoCopy);
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
        getTaskByCompleted();
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

                    {isEmtyObj === true ? (
                      <td>{st.description}</td>
                    ) : (
                      <>
                        {edit._id === st._id ? (
                          <td>
                            <input
                              value={edit.description}
                              onChange={(e) => handlerEditItemStore(e)}
                            />
                          </td>
                        ) : (
                          <td>{st.description}</td>
                        )}
                      </>
                    )}

                    {/* {editItem && (
                      <td>
                        <input
                          type="text"
                          value={editItem}
                          onChange={(e) => setEditItem(e.target.value)}
                        />
                      </td>
                    )}
                    {!editItem && <td>{st.description}</td>} */}

                    <td>
                      <button onClick={doneItemHandler(st)}>Done</button>
                      <button onClick={deleteItemHandler(st)}>Remove</button>
                      <button onClick={editItemHandler(st)}>
                        {isEmtyObj === false && edit._id === st._id
                          ? "Save"
                          : "Edit"}
                      </button>
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
