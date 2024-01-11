import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [navigate, isAuthenticated]);

  return (
    <div className="">
      <h1 className="">Add Todo</h1>
    </div>
  );
};

export default AddTodo;
