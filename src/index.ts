import express from "express";
import { AppRouter } from "./AppRouter";
import bodyParser from "body-parser";

import "./controllers/LoginController";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
