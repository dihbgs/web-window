import { HttpRequest, HttpResponse } from "../common/http";
import { UserDTO } from "../../models/user";

export type UserArrayResponse = HttpResponse<UserDTO[]>;
export type UserResponse = HttpResponse<UserDTO>;
export type UserRequest = HttpRequest<UserDTO>;

export interface IUserController {
  updateOne(request: UserRequest): Promise<UserResponse>;
  createOne(request: UserRequest): Promise<UserResponse>;
  getByName(request: UserRequest): Promise<UserResponse>;
  deleteOne(request: UserRequest): Promise<UserResponse>;
  getById(request: UserRequest): Promise<UserResponse>;
  deleteAll(): Promise<UserArrayResponse>;
  getAll(): Promise<UserArrayResponse>;
}
