import React, { useState, useEffect } from "react";
import axios from "axios";

const useEdit = () => {
  const [editContent, setEditContent] = useState("");
  const [store, setStore] = useState([]);

  useEffect(() => {
    return () => {};
  }, []);

  const handleEdit = async (id) => {
    const updateContent = { id, description: editContent };
    try {
      const response = await axios.put(
        `https://api-nodejs-todolist.herokuapp.com/task/5ddcd1566b55da0017597239`,
        updateContent
      );
      setStore(
        store.map((store) => (store.ID === id ? { ...response.data } : store))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return <div></div>;
};

export default useEdit;
