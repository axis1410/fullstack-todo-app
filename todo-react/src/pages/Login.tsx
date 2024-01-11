import axios from "axios";
import clsx from "clsx";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../context/UserAuthContext";

const Login = () => {
  const navigate = useNavigate();

  // @ts-expect-error UserAuthContext is not undefined
  const { setIsAuthenticated } = useContext(UserAuthContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (username === "" || password === "") alert("Please fill all the fields");

    const user = { username, password };
    axios
      .post("/api/v1/users/login", user, { withCredentials: true })
      .then((res) => {
        console.log(res.data.data.accessToken);
        localStorage.setItem("accessToken", JSON.stringify(res.data.data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(res.data.data.refreshToken));
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <h1 className="sm:text-center text-4xl font-semibold mb-4">Login to NT</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className={clsx(
            `border-[1px] border-black px-2 w-full rounded my-2  h-12`,
            isLoading && "bg-gray-200 cursor-not-allowed"
          )}
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className={clsx(
            `border-[1px] border-black px-2 w-full rounded my-2  h-12`,
            isLoading && "bg-gray-200 cursor-not-allowed"
          )}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={isLoading}
          className={clsx(
            `border-[1px] border-black px-2 rounded w-full my-2 h-12 hover:text-white hover:bg-black transition duration-100`,
            isLoading && "bg-gray-400 cursor-not-allowed"
          )}
        >
          Login
        </button>
      </form>
      <Link className="text-blue-600 text-lg" to="/register">
        New user? Create an account.
      </Link>
    </div>
  );
};

export default Login;
