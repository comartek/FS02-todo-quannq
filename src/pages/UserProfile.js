import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userStore, setUserStore] = useState([]);
  const [storeUserEdit, setStoreUserEdit] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [avatar, setAvatar] = useState([]);
  console.log("Xem ne", userStore);
  console.log("Edit", storeUserEdit);
  // console.log(
  //   `https://api-nodejs-todolist.herokuapp.com/user/${userStore._id}/avatar`
  // );
  useEffect(() => {
    fetchUser();
    if (userStore) {
      fetchImage();
    }
    //fileUploadImageHandler();
  }, []);

  const fetchUser = () => {
    axios
      .get("https://api-nodejs-todolist.herokuapp.com/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserStore(res.data);
      });
  };

  const fileSelectImageHandler = (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setAvatar({
      preview: preview,
    });
    setSelectedFile(file);
  };

  const fetchImage = () => {
    axios
      .get(
        `https://api-nodejs-todolist.herokuapp.com/user/${userStore._id}/avatar`
      )
      .then((res) => setAvatar(res));
  };

  const fileUploadImageHandler = () => {
    const fd = new FormData();
    fd.append("avatar", selectedFile, selectedFile.name);
    axios
      .post(
        "https://api-nodejs-todolist.herokuapp.com/user/me/avatar",

        fd,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setAvatar(res.data);
      });
  };

  const updateProfileHandler = (value) => {
    axios
      .put(
        `https://api-nodejs-todolist.herokuapp.com/user/me`,
        {
          age: value,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => console.log(res.data));

    //thay doi gia tri trong mang
    // if (storeUserEdit._id === value._id) {
    //   let storeCopyOb = [...userStore];
    //   let objIndex = storeCopyOb.findIndex((obj) => obj._id === value._id);

    //   storeCopyOb[objIndex].age = storeUserEdit.age;
    //   setUserStore(storeCopyOb);
    //   return;
    // }
    //setStoreUserEdit(value);
  };

  console.log(
    `https://api-nodejs-todolist.herokuapp.com/user/${userStore._id}/avatar`
  );

  const storeUpdateProfileHandler = (e) => {
    let storeCopy = { ...storeUserEdit };
    storeCopy.age = e.target.value;
    setStoreUserEdit(storeCopy);
  };

  const removeImageHandler = () => {
    axios
      .delete("https://api-nodejs-todolist.herokuapp.com/user/me/avatar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAvatar(res));
  };

  const removeUserHandler = () => {
    axios
      .delete("https://api-nodejs-todolist.herokuapp.com/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res))
      .then(() => setTimeout(() => navigate("/"), 2000));
  };

  return (
    <div className="user__container">
      <div className="backtodo">
        <button onClick={() => navigate("/todo")}> BACK TODO</button>
        <button onClick={removeUserHandler}> DELETE USER</button>
      </div>
      <div className="user__container__main">
        <div className="user__container__main__choosefile">
          <label htmlFor="file-upload">Chọn ảnh</label>
          <input
            type="file"
            id="file-upload"
            onChange={fileSelectImageHandler}
          />
        </div>
        <div className="user__container__main__image">
          {avatar.preview ? (
            <img src={avatar.preview} alt="" width="100%" />
          ) : (
            <img
              src={`https://api-nodejs-todolist.herokuapp.com/user/${userStore._id}/avatar`}
              alt="khong hien thi anh"
              width="100%"
            />
          )}
        </div>
        <div className="user__container__main__button">
          <button onClick={fileUploadImageHandler}>Upload Image</button>
          <button onClick={removeImageHandler}>Remove Image</button>
        </div>
        <div className="user__container__main__info">
          <div className="user__container__main__info__header">
            User Profile
          </div>
          <div className="user__container__main__info__user">
            <form>
              <div className="form__input__user">
                <label htmlFor="name__user">Name </label>
                <input type="text" value={userStore.name} id="name__user" />
              </div>
              <div className="form__input__user">
                <label htmlFor="name__user">Email </label>
                <input type="email" value={userStore.email} id="name__user" />
              </div>
              <div className="form__input__user">
                <label htmlFor="name__user">Password </label>
                <input
                  type="password"
                  value={userStore.password}
                  id="name__user"
                />
              </div>
              <div className="form__input__user">
                <label htmlFor="name__user">Age</label>
                {storeUserEdit.age === userStore.age ? (
                  <input
                    type="text"
                    value={storeUserEdit.age}
                    id="name__user"
                    onChange={storeUpdateProfileHandler}
                  />
                ) : (
                  <input type="text" value={userStore.age} id="name__user" />
                )}
                {/* <input type="text" value={userStore.age} id="name__user" /> */}
              </div>
            </form>
          </div>
        </div>
        <div className="user__container__main__button__update">
          <button onClick={updateProfileHandler(userStore.age)}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
