import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { isAuthenticated, handleLogout } = useAuth();

  const Links = [
    { name: "HOME", link: "/" },
    { name: "ADD ITEM", link: "/add-todo" },
  ];

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-40 bg-gray-200">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        {/* Logo */}
        <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
          <h1 className="text-3xl text-french-gray-800 mr-1 pt-1">NT</h1>
        </div>

        {/* Mobile Menu Icon */}
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-gray-800"
        >
          {open ? <IoMdClose /> : <IoMenu />}
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static
            left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-200 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                to={link.link}
                className="text-french-gray-700 hover:text-slate-gray-700 duration-100"
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Logout Button (if authenticated) */}
          {isAuthenticated && (
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <button
                onClick={handleLogout}
                className="text-french-gray-700 hover:text-slate-gray-700 duration-100"
              >
                LOGOUT
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
