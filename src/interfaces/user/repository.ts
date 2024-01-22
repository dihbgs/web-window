import { User, UserDTO } from "../../models/user";

export type ResponseDTOArray = Promise<UserDTO[]>;
export type ResponseDTO = Promise<UserDTO>;
export type UserDB = Omit<User, "id">;

export interface IUserRepository {
  updateOne(id: string, user: UserDTO): ResponseDTO;
  createOne(user: UserDTO): ResponseDTO;
  getId(username: string): ResponseDTO;
  deleteOne(id: string): ResponseDTO;
  deleteAll(): ResponseDTOArray;
  getAll(): ResponseDTOArray;
}
