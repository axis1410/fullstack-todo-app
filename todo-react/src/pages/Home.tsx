import axios from "axios";
import { useEffect, useState } from "react";
import { Todo } from "../../types";
import TodoList from "../components/TodoList";

const Home = () => {
  const username = localStorage.getItem("username");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/todo").then((res) => {
      console.log(res);
      setTodos(res.data.data);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="">Hello {username}</div>
      <TodoList todos={todos} />
    </div>
  );
};

export default Home;
