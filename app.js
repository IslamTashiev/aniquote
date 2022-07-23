import express from "express";
import mongoose from "mongoose";

import { loginValidation, registerValidation } from "./validations.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import * as UserController from "./controllers/UserController.js";
import * as QuoteController from "./controllers/QuoteController.js";

import "dotenv/config";
import checkAuth from "./utils/checkAuth.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;
const mongodbURI = process.env.MDB_URI;

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register,
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login,
);

app.post("/quotes", checkAuth, QuoteController.create);
app.get("/quotes/random", QuoteController.getRandom);
app.get("/quotes/anime", QuoteController.getByAnimeTitle);
app.get("/quotes/character", QuoteController.getByCharacterName);

const start = () => {
  app.listen(PORT, (err) =>
    err
      ? console.log(err)
      : console.log(`Server has ben started on port ${PORT}...`),
  );
};
mongoose
  .connect(mongodbURI)
  .then(() => start())
  .catch((err) => console.log("DB error:" + err));
