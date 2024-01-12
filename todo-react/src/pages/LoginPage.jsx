import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };

    axios
      .post("/api/v1/users/login", user)
      .then(() => {
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
