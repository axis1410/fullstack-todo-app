/* eslint-disable react/prop-types */
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListItem = ({ todos }) => {
  const [editMode, setEditMode] = useState({});
  const [editedTodos, setEditedTodos] = useState({});
  const navigate = useNavigate();

  const toggleEditMode = (todo) => {
    setEditMode((prev) => ({
      ...prev,
      [todo._id]: !prev[todo._id],
    }));

    setEditedTodos((prev) => ({
      ...prev,
      [todo._id]: { ...todo },
    }));
  };

  const handleEditName = (e, todo) => {
    setEditedTodos((prev) => ({
      ...prev,
      [todo._id]: {
        ...prev[todo._id],
        title: e.target.value,
      },
    }));
  };

  const handleSubmitEdit = async (todo) => {
    try {
      await axios.put(`/api/v1/todo/${todo._id}`, {
        title: editedTodos[todo._id].title,
        isComplete: editedTodos[todo._id].isComplete,
      });

      toggleEditMode(todo);
      navigate(0);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDelete = async (todo) => {
    try {
      await axios.delete(`/api/v1/todo/${todo._id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 my-2 rounded-md transition duration-300 ease-in-out"
        >
          <div className={clsx("flex-grow", editMode[todo._id] ? "hidden" : "block", "md:w-1/2")}>
            <h1 className="text-lg font-bold">{todo.title}</h1>
          </div>
          <div className={clsx("flex-grow", editMode[todo._id] ? "block" : "hidden", "md:w-1/2")}>
            <input
              type="text"
              value={editedTodos[todo._id]?.title || ""}
              onChange={(e) => handleEditName(e, todo)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex-shrink-0 md:ml-4 mt-4 md:mt-0">
            <input
              type="checkbox"
              checked={editedTodos[todo._id]?.isComplete || false}
              className="mr-2"
            />
            <button
              onClick={() => toggleEditMode(todo)}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md mr-2 transition duration-300 ease-in-out"
            >
              {editMode[todo._id] ? "Cancel" : "Edit"}
            </button>
            {editMode[todo._id] && (
              <button
                onClick={() => handleSubmitEdit(todo)}
                className="px-2 py-1 text-sm bg-green-500 text-white rounded-md transition duration-300 ease-in-out"
              >
                Submit
              </button>
            )}
            <button
              onClick={() => handleDelete(todo)}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded-md transition duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListItem;
