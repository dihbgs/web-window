import { HttpRequest, HttpResponse } from "../common/http";
import { UserDTO } from "../../models/user";

export type UserArrayResponse = HttpResponse<UserDTO[]>;
export type UserResponse = HttpResponse<UserDTO>;
export type UserRequest = HttpRequest<UserDTO>;

export interface IUserController {
  updateOne(id: string, user: UserRequest): Promise<UserResponse>;
  createOne(user: UserRequest): Promise<UserResponse>;
  deleteOne(id: string): Promise<UserResponse>;
  deleteAll(): Promise<UserArrayResponse>;
  getAll(): Promise<UserArrayResponse>;
}
