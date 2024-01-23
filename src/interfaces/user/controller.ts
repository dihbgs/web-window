import { HttpRequest, HttpResponse } from "../common/http";
import { UserDTO } from "../../models/user";

export type UserUpdateRequest = HttpRequest<{ oldUsername: string } & UserDTO>;
export type UserArrayResponse = HttpResponse<UserDTO[]>;
export type UserResponse = HttpResponse<UserDTO>;
export type UserRequest = HttpRequest<UserDTO>;

export interface IUserController {
  updateOne(request: UserUpdateRequest): Promise<UserResponse>;
  createOne(request: UserRequest): Promise<UserResponse>;
  getOne(request: UserRequest): Promise<UserResponse>;
  deleteOne(request: UserRequest): Promise<UserResponse>;
  deleteAll(): Promise<UserArrayResponse>;
  getAll(): Promise<UserArrayResponse>;
}
