import React from "react";

const TodoComponent = ({
  userLogout,
  navigate,
  enterContent,
  setEnterContent,
  addTaskHandler,
  storeValue,
  setEdit,
  edit,
  editItemTwo,
  setEditing,
  editing,
  doneItemHandler,
  deleteItemHandler,
  isLoading,
}) => {
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
              {isLoading && <p>Loading...</p>}
              {!isLoading &&
                storeValue.map((st, index) => {
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
                            <button onClick={() => doneItemHandler(st)}>
                              Done
                            </button>
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

export default TodoComponent;
