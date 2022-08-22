import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ToDo.css";

const ToDo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [enterContent, setEnterContent] = useState("");
  const [enterDate, setEnterDate] = useState("");

  const [storeValue, setStoreValue] = useState([]);

  const [edit, setEdit] = useState([]);
  const [taskSuccess, setTaskSuccess] = useState([]);

  const getTask = () => {
    axios
      .get("https://api-nodejs-todolist.herokuapp.com/task", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setStoreValue(res.data.data);
      });
  };

  const getTaskCompleted = () => {
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
  };

  const addTaskHandler = () => {
    if (enterContent.length === 0 || enterDate.length === 0) {
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
          console.log(res);
          console.log(res.data);
          setStoreValue([...storeValue, res.data.data]);
          setEnterContent("");
          setEnterDate("");
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
        `https://api-nodejs-todolist.herokuapp.com/task/${itemState.ID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getTask();
        getTaskCompleted();
      });

    console.log(itemState);
    const currentState = storeValue.filter((item) => item.ID !== itemState.ID);
    setStoreValue(currentState);
  };

  const editItemHandler = (itemState) => () => {
    let isEmtyObj = Object.keys(edit).length === 0;
    if (isEmtyObj === false && edit.ID === itemState.ID) {
      // thay doi gia tri cua doi tuong trong mang, update lai gia tri khi an nut edit
      let storeValueCopy = [...storeValue];
      let objIndex = storeValueCopy.findIndex((obj) => obj.ID == itemState.ID);

      storeValueCopy[objIndex].Content = edit.Content;
      setStoreValue(storeValueCopy);
      setEdit({});
      return;
    }
    setEdit(itemState);
  };

  const handlerEditItemStore = (e) => {
    let editTodoCopy = { ...edit };
    editTodoCopy.Content = e.target.value;
    setEdit(editTodoCopy);
  };

  const doneItemHandler = (itemState) => () => {
    // const doneItem = storeValue.map((item) => )
    setStoreValue(
      storeValue.map((item) => {
        if (item.id === itemState.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  let isEmtyObj = Object.keys(edit).length === 0;
  console.log("emty khong", isEmtyObj);

  useEffect(() => {
    getTask();
    getTaskCompleted();
  }, []);

  return (
    <div className="toDo">
      <div className="toDo__button">
        <button onClick={userLogout}>Logout</button>
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
              <span className="form__input">
                <input
                  type="date"
                  id="date"
                  value={enterDate}
                  onChange={(e) => setEnterDate(e.target.value)}
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
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {storeValue.map((st, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    {isEmtyObj === true ? (
                      <td
                        className={`todo-item ${storeValue.completed} ? 'completed' : '' `}
                      >
                        {st.Content}
                      </td>
                    ) : (
                      <>
                        {edit.ID === st.ID ? (
                          <td>
                            <input
                              value={edit.Content}
                              onChange={(e) => handlerEditItemStore(e)}
                            />
                          </td>
                        ) : (
                          <td
                            className={`todo-item ${storeValue.completed} ? 'completed' : '' `}
                          >
                            {st.Content}
                          </td>
                        )}
                      </>
                    )}

                    <td>{st.Date}</td>
                    <td>
                      <button onClick={doneItemHandler(st)}>Done</button>
                      <button onClick={deleteItemHandler(st)}>Remove</button>
                      <button onClick={editItemHandler(st)}>
                        {isEmtyObj === false && edit.ID === st.ID
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
      </div>
    </div>
  );
};

export default ToDo;
