import bodyParser from "body-parser";
import { Router } from "express";
import {
  changeUserPassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(bodyParser.json(), registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/change-password").put(verifyJWT, changeUserPassword);

export default router;
