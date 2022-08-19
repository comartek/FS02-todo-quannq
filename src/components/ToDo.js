import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import "./ToDo.css";

const ToDo = () => {
  const [enterContent, setEnterContent] = useState("");
  const [enterDate, setEnterDate] = useState("");

  const [storeValue, setStoreValue] = useState([]);

  const enterContentHandler = (e) => {
    setEnterContent(e.target.value);
  };

  const enterDateHandler = (e) => {
    setEnterDate(e.target.value);
  };

  const storeValueHandler = () => {
    setStoreValue([
      ...storeValue,
      { ID: Date.now(), Content: enterContent, Date: enterDate },
    ]);
    setEnterContent([]);
  };

  // const deleteItem = () => {
  //   setStoreValue([...storeValue]);
  // };

  const deleteItemHandler = (itemState) => () => {
    console.log(itemState);
    const currentState = storeValue.filter((item) => item.ID !== itemState.ID);
    setStoreValue(currentState);
  };

  return (
    <div className="toDo">
      <div className="header">
        <div className="header__icon">
          <div className="header__input">
            <form>
              <label htmlFor="content">Content</label>
              <input
                type="text"
                value={enterContent}
                id="content"
                name="content"
                onChange={enterContentHandler}
              />
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={enterDate}
                onChange={enterDateHandler}
              />
            </form>
          </div>
          <button onClick={storeValueHandler}>
            <AddIcon />
          </button>
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
                    <td>{st.Content}</td>
                    <td>{st.Date}</td>
                    <td>
                      <button>
                        <CheckIcon />
                      </button>
                      <button onClick={deleteItemHandler(st)}>
                        <ClearIcon />
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
