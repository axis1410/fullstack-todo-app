import axios from "axios";
import clsx from "clsx";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (username === "" || email === "" || password === "" || fullName === "") {
      alert("Please fill all fields");
    }

    const user = { fullName, username, email, password };
    axios
      .post("/api/v1/users/register", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <h1 className="sm:text-center text-4xl font-semibold mb-4">Create new account</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className={clsx(
            `border-[1px] border-black px-2 w-full rounded my-2  h-12`,
            isLoading && "bg-gray-200 cursor-not-allowed"
          )}
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          className={clsx(
            `border-[1px] border-black px-2 w-full rounded my-2  h-12`,
            isLoading && "bg-gray-200 cursor-not-allowed"
          )}
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
