import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const postTodoAsLoggedInUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { title } = req.body;

    const newTodo = await Todo.create({ title, createdBy: userId });

    await newTodo.save();

    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "User not found");

    user.todo.push(newTodo._id);

    await user.save();

    return res.status(201).json(new ApiResponse(201, newTodo, "Todo created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to create todo");
  }
});

export const getTodosCreatedByLoggedInUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const userWithTodos = await User.findById(userId).populate("todo");

    if (!userWithTodos) throw new ApiError(404, "User not found");

    const todos = userWithTodos.todo;

    res.status(200).json(new ApiResponse(200, todos, "Todos fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to get todos");
  }
});

export const getTodoById = asyncHandler(async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findById(todoId);

    if (!todo) throw new ApiError(404, "Todo not found");

    return res.status(200).json(new ApiResponse(200, todo, "Todo fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to get todo by id");
  }
});

export const deleteTodoAsLoggedInUser = asyncHandler(async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.user._id;

    const todo = await Todo.findById(todoId);

    if (!todo) throw new ApiError(404, "Todo not found");

    // Check if the todo was created by the logged in user
    if (userId.toString() !== todo.createdBy.toString()) throw new ApiError(401, "Unauthorized");

    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "User not found");

    user.todo.pull(todoId);

    await user.save();
    await Todo.findByIdAndDelete(todoId);

    return res
      .status(200)
      .json(new ApiResponse(200, { deletedTodo: todo }, "Todo deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to delete todo");
  }
});

export const updateTodo = asyncHandler(async (req, res) => {
  const todoId = req.params.todoId;
  const userId = req.user._id;

  const { title, isComplete } = req.body;

  const todo = await Todo.findById(todoId);

  if (!todo) throw new ApiError(404, "Todo not found");

  if (userId.toString() !== todo.createdBy.toString()) throw new ApiError(401, "Unauthorized");

  if (title !== undefined) todo.title = title;
  if (isComplete !== undefined) todo.isComplete = isComplete;

  await todo.save();

  return res.status(200).json(new ApiResponse(200, todo, "Todo updated successfully"));
});
