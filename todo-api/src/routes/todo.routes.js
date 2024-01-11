import { Router } from "express";
import {
  deleteTodoAsLoggedInUser,
  getTodoById,
  getTodosCreatedByLoggedInUser,
  postTodoAsLoggedInUser,
  updateTodo,
} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, postTodoAsLoggedInUser);
router.route("/").get(verifyJWT, getTodosCreatedByLoggedInUser);
router.route("/:todoId").get(verifyJWT, getTodoById);

router.route("/:todoId").delete(verifyJWT, deleteTodoAsLoggedInUser);

router.route("/:todoId").put(verifyJWT, updateTodo);

export default router;
