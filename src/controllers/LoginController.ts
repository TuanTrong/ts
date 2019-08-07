import { Request, Response } from "express";
import { get, post, controller, required } from "./decorators";

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send("<h1>Hi there!</h1>");
  }

  @post("/login")
  @required("username", "password")
  postLogin(req: Request, res: Response): void {}
}
