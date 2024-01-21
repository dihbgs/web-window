import { User, UserDTO } from "../../models/user";
import { HttpRequest, HttpResponse } from "../common/http";

export interface IUserController {
  create(newUser: HttpRequest<UserDTO>): Promise<HttpResponse<UserDTO>>;
  getAll(): Promise<HttpResponse<User[]>>;
}
