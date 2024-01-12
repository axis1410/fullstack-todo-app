import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTodoPage = () => {
  const navigate = useNavigate();
  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    axios.get("/api/v1/users").catch((err) => {
      console.log(err);
      if (err.status !== "ERR_BAD_REQUEST") navigate("/login");
    });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/v1/todo", { title: todoTitle, isComplete: false })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="font-bold text-xl">Add Todo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          className="border-[1px] p-3"
          type="text"
          placeholder="Enter todo"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button className="bg-gray-800 p-3 text-white rounded-md mt-4">Add</button>
      </form>
    </div>
  );
};

export default AddTodoPage;
