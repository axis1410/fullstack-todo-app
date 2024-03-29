import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todo", todoRouter);

export { app };
