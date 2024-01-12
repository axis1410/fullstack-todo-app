import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [todo, setTodo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/users")
      .then((res) => {
        setTodo(res.data.data.todo);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "ERR_BAD_REQUEST") navigate("/login");
      });
  }, []);

  return <div className="my-20">HomePage</div>;
};

export default HomePage;
