import { User, UserDTO } from "../../models/user";
import { HttpRequest, HttpResponse } from "../common/http";

export interface IUserController {
  createOne(newUser: HttpRequest<UserDTO>): Promise<HttpResponse<UserDTO>>;
  getAll(): Promise<HttpResponse<User[]>>;
}
