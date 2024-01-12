import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import getTodos from "../utils/getTodos";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, userData } = useAuth();

  useEffect(() => {
    axios
      .get("/api/v1/users")
      .then(() => getTodos().then((res) => setTodos(res.data.data)))
      .catch((err) => {
        console.log(err);
        if (err.status !== "ERR_BAD_REQUEST") navigate("/login");
      });
  }, [isAuthenticated, navigate]);

  return (
    <div className="my-20">
      <h1>Hello {userData.username}</h1>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
