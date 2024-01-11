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

// Securing the routes below with JWT
router.use(verifyJWT);

router.post("/", postTodoAsLoggedInUser);

router.get("/", getTodosCreatedByLoggedInUser);
router.get("/:todoId", getTodoById);

router.delete("/:todoId", deleteTodoAsLoggedInUser);

router.put("/:todoId", updateTodo);
export default router;
