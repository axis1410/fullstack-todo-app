import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../components/ListItem";
import { useAuth } from "../hooks/useAuth";
import getTodos from "../utils/getTodos";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { userData } = useAuth();

  useEffect(() => {
    axios
      .get("/api/v1/users")
      .then(() => getTodos().then((res) => setTodos(res.data.data)))
      .catch((err) => {
        console.log(err);
        if (err.status !== "ERR_BAD_REQUEST") navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="my-20 flex flex-col justify-start items-center w-full h-full">
      <h1 className="text-3xl font-bold mb-8">Hello {userData.username}</h1>
      <div className="bg-white rounded-lg shadow-md p-6 flex-1 w-full max-w-md">
        <ListItem todos={todos} />
      </div>
    </div>
  );
};

export default HomePage;
