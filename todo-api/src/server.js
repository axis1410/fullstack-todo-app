import dotenv from "dotenv";
import { app } from "./app.js";
import { connectToDb } from "./db/index.js";
import { ApiError } from "./utils/ApiError.js";

dotenv.config({
  path: "./.env",
});

connectToDb()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    throw new ApiError();
  });
