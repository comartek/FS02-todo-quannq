import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userStore, setUserStore] = useState([]);

  //   const [nameUser, setNameUser] = useState("");
  //   const [emailUser, setEmailUser] = useState("");
  //   const [passwordUser, setPasswordUser] = useState("");
  //   const [ageUser, setAgeUser] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    fetchUser();
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
        //console.log(res);
        //console.log(res.data);
        setUserStore(res.data);
      });
  };

  const fileSelectImageHandler = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setSelectedFile(file);
    setAvatar(file);
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
        console.log(res.data);
      });
  };

  const updateProfileHandler = () => {
    axios.put(`https://api-nodejs-todolist.herokuapp.com/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="user__container">
      <div className="backtodo">
        <button onClick={() => navigate("/todo")}> BACK TODO</button>
      </div>
      <div className="user__container__main">
        <div className="user__container__main__image">
          <input type="file" onChange={fileSelectImageHandler} />
          {avatar && <img src={avatar.preview} alt="" width="90%" />}
        </div>
        <div className="user__container__main__button">
          <button onClick={fileUploadImageHandler}>Upload Image</button>
        </div>
        <div className="user__container__main__info">
          <div className="user__container__main__info__header">
            User Profile
          </div>
          <div className="user__container__main__info__user">
            <form>
              <div className="form__input__user">
                <label htmlFor="name__user">Name </label>
                <input
                  type="text"
                  value={userStore.name}
                  id="name__user"
                  //nChange={}
                />
              </div>
              <div className="form__input__user">
                <label htmlFor="name__user">Email </label>
                <input
                  type="text"
                  value={userStore.email}
                  id="name__user"
                  //nChange={}
                />
              </div>
              <div className="form__input__user">
                <label htmlFor="name__user">Pass </label>
                <input
                  type="text"
                  value={userStore.password}
                  id="name__user"
                  //nChange={}
                />
              </div>
              <div className="form__input__user">
                <label htmlFor="name__user">Age</label>
                <input
                  type="text"
                  value={userStore.age}
                  id="name__user"
                  //nChange={}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="user__container__main__button__update">
          <button>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
