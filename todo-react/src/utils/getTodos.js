import axios from "axios";

const getTodos = () => {
  return axios.get("/api/v1/todo");
};

export default getTodos;
