import { User, UserDTO } from "../../models/user";
import { HttpRequest, HttpResponse } from "../common/http";

export interface IUserController {
  updateOne(
    id: string,
    newUser: HttpRequest<UserDTO>
  ): Promise<HttpResponse<UserDTO>>;
  deleteAll(): Promise<HttpResponse<UserDTO[]>>;
  deleteOne(id: string): Promise<HttpResponse<UserDTO>>;
  createOne(newUser: HttpRequest<UserDTO>): Promise<HttpResponse<UserDTO>>;
  getAll(): Promise<HttpResponse<User[]>>;
}
